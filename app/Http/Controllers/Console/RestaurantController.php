<?php

namespace App\Http\Controllers\Console;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gourmet\Restaurant;
use Inertia\Inertia;
use App\Models\Gourmet\Menus;
use Illuminate\Support\Facades\Auth;

class RestaurantController extends Controller {

    public function getMenus($restaurantId) {
        $result = Menus::where('parent_id', $restaurantId)
            ->get()
            ->groupBy('category_id')
            ->map(function ($group) {
                return $group->map(function ($menu) {
                    return [
                        'id' => $menu['id'],
                        'name' => $menu['name'],
                        'price' => $menu['price'],
                        'description' => $menu['description'],
                        'has_image' => $menu['has_image'],
                    ];
                });
            });
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
        dd( $request->all());
       
        $user_id = $request->user()->id;
        if ($user_id !== Auth::id()) {
            return redirect()->back();
        }
        $restaurant = Restaurant::where('user_id', $user_id)->first();
        $menus = Menus::where('parent_id', $restaurant->id)->get();

        foreach ($menus as $menu) {
            $menu->delete();
        }

        foreach ($request->menus as $categoryId => $categoryMenus) {
            foreach ($categoryMenus as $menu) {
                $newMenu = new Menus();
                
                $newMenu->parent_id = $restaurant->id;
                $newMenu->category_id = $categoryId;
                $newMenu->name = $menu['name'];
                $newMenu->price = $menu['price'];
                $newMenu->description = $menu['description'];
                $newMenu->has_image = 0;
               
                $newMenu->save();
            }
        }

        return redirect()->back();
    }

    public function updateMenusImages(Request $request) {
       
        dd($request->all());
    }
}