<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Thumbnail;
use App\Models\Pin;

class ConsoleController extends Controller {
    protected $extensions = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
        'image/svg+xml'=> 'svg',
    ];

    public function saveImageAndGetPath($id, $base64Data) {
        if (preg_match('/^data:(\w+\/[\w\-\+\.]+);base64,/', $base64Data, $matches)) {
            $mime = $matches[1];       
            $extension = $this->extensions[$mime];
        } else {
            //不正なプレフィックス(エラーハンドリング)
        }
        $name = 'thumbnail_'.$id.'.'.$extension;
        $img = base64_decode(preg_replace('/^data:\w+\/[\w\-\+\.]+;base64,/', '', $base64Data));
        $path = public_path('images/'.$name);
        file_put_contents($path, $img);
        return $path;
    }

    public function updateThumbnailLayouts(Request $request) {
        $thumbnails = $request->input('dataList');
        $thumbnailCollection = collect($thumbnails);
        Thumbnail::truncate();
        Pin::truncate();
        $thumbnailCollection->map(function ($thumbnail) {
            $id = $thumbnail['propaties']['id'];
            $base64Data = $thumbnail['base64Data'];
            $path = $this->saveImageAndGetPath($id, $base64Data);
            Thumbnail::create([
                'id' => $id,
                'name' => $thumbnail['propaties']['name'],
                'x' => $thumbnail['propaties']['position']['x'],
                'y' => $thumbnail['propaties']['position']['y'],
                'z' => $thumbnail['propaties']['position']['z'],
                'width' => $thumbnail['propaties']['size']['width'],
                'height' => $thumbnail['propaties']['size']['height'],
                'rot' => $thumbnail['propaties']['rot'],
                'path' => $path,
                'url' => $thumbnail['propaties']['url'],
            ]);
            Pin::create([
                'id' => $id,
                'left_x' => $thumbnail['propaties']['pin']['left']['x'],
                'left_y' => $thumbnail['propaties']['pin']['left']['y'],
                'left_path' => $thumbnail['propaties']['pin']['left']['path'],
                'right_x' => $thumbnail['propaties']['pin']['right']['x'],
                'right_y' => $thumbnail['propaties']['pin']['right']['y'],
                'right_path' => $thumbnail['propaties']['pin']['right']['path'],

            ]);
        });
    }

    public function getThumbnailLayouts(Request $request) {
        $thumbnails = Thumbnail::orderBy('id', 'asc')->get();
        $pins = Pin::orderBy('id', 'asc')->get()->keyBy('id');

        $result = $thumbnails->map(function ($thumbnails) use ($pins) {
            $pin = $pins->get($thumbnails->id);
            $propaties = (object) [
                'id' => $thumbnails->id,
                'name' => $thumbnails->name,
                'src' => '',
                'url' => $thumbnails->url,
                'position' => (object) ['x' => $thumbnails->x, 'y' => $thumbnails->y, 'z' => $thumbnails->z],
                'size' => (object) ['width' => $thumbnails->width, 'height' => $thumbnails->height],
                'rot' => $thumbnails->rot,
                'pin' => (object) [
                    'left' => (object) [
                        'x' => $pin->left_x, 
                        'y' => $pin->left_y,
                        'path' => $pin->left_path],
                    'right' => (object) [
                        'x' => $pin->right_x,
                        'y' => $pin->right_y,
                        'path' => $pin->right_path]
                ]
            ];

            $path = $thumbnails->path;
            if (!file_exists($path)) {
                return response()->json(['error' => 'Image not found'], 404);
            }
            $base64Data = base64_encode(file_get_contents($path));

            return (object) [
                'propaties' => $propaties,
                'base64Data' => $base64Data,
            ];
        });

        return response()->json($result);
    }
}