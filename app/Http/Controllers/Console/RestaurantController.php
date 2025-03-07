<?php

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gourmet\Restaurant;
use Inertia\Inertia;
use App\Models\Gourmet\Menus;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller {

    public function getMenus($restaurantId) {
        $result = Menus::where('parent_id', $restaurantId)
            ->get()
            ->groupBy('category_id')
            ->map(function ($group) {
                return $group->map(function ($menu) {
                    return [
                        'id' => $menu['id'],
                        'parent_id' => $menu['parent_id'],
                        'category_id' => $menu['category_id'],
                        'name' => $menu['name'],
                        'price' => $menu['price'],
                        'description' => $menu['description'],
                        'extension' => $menu['extension'],
                    ];
                });
            });
        return $result;
    }

    public function decordAndSaveImage($menu, $parentId, $categoryId, $index) {
        if (preg_match('/^data:image\/(\w+);base64,/', $menu['imgDataBase64'], $matches)) {
            $base64Data = preg_replace('/^data:\w+\/[\w\-\+\.]+;base64,/', '', $menu['imgDataBase64']);

            $binaryData = base64_decode($base64Data);
            if ($binaryData === false) {
                return;
            }

            $imageInfo = getimagesizefromstring($binaryData);
            if ($imageInfo === false) {
                return;
            }

            $isJpeg = in_array($imageInfo['mime'], ['image/jpeg'], true);
            $isPng = in_array($imageInfo['mime'], ['image/png'], true);
            if (!$isJpeg && !$isPng) {
                return;
            }

            $extension = $isJpeg ? 'jpg' : 'png';

            $path = "uploaded_images/gourmet/menus/{$parentId}/{$categoryId}";
            $fileName = "{$index}.{$extension}";

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            } else {
                $files = glob($path . '/*');
                foreach ($files as $file) {
                    if (is_file($file)) {
                        unlink($file);
                    }
                }
            }

            file_put_contents("{$path}/{$fileName}", $binaryData);

            if ($isJpeg) {
                return 1;
            }
            if ($isPng) {
                return 2;
            }
            return 0;
        }
    }

    private function convertToJpg($binaryData) {
        $image = imagecreatefromstring($binaryData);
        if ($image === false) {
            return false;
        }
        ob_start();
        imagejpeg($image, null, 100);
        $result = ob_get_clean();
        imagedestroy($image);
        return $result;
    }

    public function showRestaurantEditor() {
        $user_id = Auth::id();
        $restaurant = Restaurant::where('user_id', $user_id)->first();

        return Inertia::render('restaurant/edit', [
            'restaurant' => $restaurant,
        ]);
    }

    public function showMenusEditor() {
        $user_id = Auth::id();
        $restaurant = Restaurant::where('user_id', $user_id)->first();

        $menus = $this->getMenus($restaurant->id);

        return Inertia::render('restaurant/edit_menus', [
            'menus' => $menus,
        ]);
    }

    public function updateMenus(Request $request) {
        $user_id = $request->user()->id;
        if ($user_id !== Auth::id()) {
            return redirect()->back();
        }
        $restaurant = Restaurant::where('user_id', $user_id)->first();
        $menus = Menus::where('parent_id', $restaurant->id)->get();

        foreach ($menus as $menu) {
            $menu->delete();
        }

        foreach ($request->props['menus'] as $categoryId => $categoryMenus) {
            foreach ($categoryMenus as $index => $menu) {
                if ($menu['imgDataBase64'] !== null) {
                    $extension = $this->decordAndSaveImage($menu, $restaurant->id, $categoryId, $index);
                } else {
                    $extension = 0;
                }
                $newMenu = new Menus();
                $newMenu->parent_id = $restaurant->id;
                $newMenu->category_id = $categoryId;
                $newMenu->index = $index;
                $newMenu->name = $menu['name'];
                $newMenu->price = $menu['price'];
                $newMenu->description = $menu['description'];
                $newMenu->extension = $extension;
                $newMenu->save();
            }
        }

        return redirect()->back();
    }
}