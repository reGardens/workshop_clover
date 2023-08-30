<?php

namespace App\Http\Controllers\Backoffice\Sewing;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class MakeNewsController extends Controller
{
    // show
    public function index()
    {
        return inertia('Backoffice/Sewing/Post/Index', [
            'lists' => Post::latest('created_at')->get(),
        ]);
    }

    // create
    public function create()
    {
        return inertia('Backoffice/Sewing/Post/Create');
    }
}
