<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function index() {
        return inertia('Front/LandingPage', [
            'posts' => Post::get(),
        ]);
    }

    public function create() {
        return inertia('Front/CreateContent');
    }

    public function store() {
    }
}
