<?php

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gourmet\Restaurant;
use App\Models\Gourmet\RestaurantGenres;
use Inertia\Inertia;
use App\Models\Gourmet\Menus;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller {
    
    //メニュー取得処理
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

    //画像デコード&保存処理（返り値：画像拡張子）
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

    //飲食店情報編集画面表示処理
    public function showRestaurantEditor() {
        $userId = Auth::id();
        $restaurant = Restaurant::where('user_id', $userId)->first();
        $genres = RestaurantGenres::where('restaurant_id', $restaurant->id)->pluck('genre_id');

        return Inertia::render('restaurant/edit', [
            'restaurant' => $restaurant,
            'genres' => $genres,
        ]);
    }

    //飲食店情報更新処理
    public function updateRestaurant(Request $request) {
        $request->validate([
            'public' => 'required|in:0,1',
        ]);

        if ($request->public === 0) {
            $requiredOrPresent = 'nullable';
        } else {
            $requiredOrPresent = 'required';
        }

        $criteriaOfGenres = [
            'array',
            function ($attribute, $value, $fail) use ($request) {
                if (!is_array($value) || !array_reduce($value, function ($carry, $item) {
                    return $carry && is_bool($item);
                }, true)) {
                    return;
                }
                if (count(array_filter($value)) < 1 && $request->public === 1) {
                    $fail('公開する場合は1つ以上のジャンルが必要です');
                }
                if (count(array_filter($value)) > 3) {
                    $fail('ジャンルの数は3つ以下にしてください。');
                }
            },
        ];

        $request->validate([
            'name' => "{$requiredOrPresent}|string|max:32",
            'address' => "{$requiredOrPresent}|string|max:255",
            'tell' => "{$requiredOrPresent}|string|max:16",
            'genres' => $criteriaOfGenres,
            'price_max' => 'nullable|integer|min:0',
            'price_min' => 'nullable|integer|min:0',
            'capacity' => 'nullable|integer|min:0',
            'description' => 'nullable|string|max:255',
            'reservation' => 'nullable|string|max:255',
            'parking' => 'nullable|string|max:255',
            'smoking' => 'nullable|string|max:255',
        ], [
            'name.required' => '公開する場合は必須です',
            'address.required' => '公開する場合は必須です',
            'tell.required' => '公開する場合は必須です',
            'name.max' => '32文字以内で入力してください',
            'address.max' => '255文字以内で入力してください',
            'tell.max' => '16文字以内で入力してください',
            'description.max' => '255文字以内で入力してください',
            'reservation.max' => '255文字以内で入力してください',
            'parking.max' => '255文字以内で入力してください',
            'smoking.max' => '255文字以内で入力してください',
        ]);
        
        $userId = $request->user()->id;
        if ($userId !== Auth::id()) {
            return redirect()->back();
        }

        $restaurant = Restaurant::where('user_id', $userId)->first();
        $restaurant->public = $request->public;
        $restaurant->name = $request->name ?? "";
        $restaurant->address = $request->address ?? "";
        $restaurant->tell = $request->tell ?? "";
        $restaurant->price_max = $request->price_max;
        $restaurant->price_min = $request->price_min;
        $restaurant->capacity = $request->capacity;
        $restaurant->description = $request->description ?? "";
        $restaurant->reservation = $request->reservation ?? "";
        $restaurant->parking = $request->parking ?? "";
        $restaurant->smoking = $request->smoking ?? "";
        $restaurant->save();

        RestaurantGenres::where('restaurant_id', $restaurant->id)->delete();

        foreach ($request->genres as $index => $genre) {
            $restaurantGenre = new RestaurantGenres();
            if ($genre) {
                $restaurantGenre->restaurant_id = $restaurant->id;
                $restaurantGenre->genre_id = $index;
                $restaurantGenre->save();
            }
        }

        return redirect()->back();
    }

    //メニュー編集画面表示処理
    public function showMenusEditor() {
        $userId = Auth::id();
        $restaurant = Restaurant::where('user_id', $userId)->first();

        $menus = $this->getMenus($restaurant->id);

        return Inertia::render('restaurant/edit_menus', [
            'menus' => $menus,
        ]);
    }

    //メニュー更新処理
    public function updateMenus(Request $request) {
        $userId = $request->user()->id;
        if ($userId !== Auth::id()) {
            return redirect()->back();
        }
        $restaurant = Restaurant::where('user_id', $userId)->first();
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