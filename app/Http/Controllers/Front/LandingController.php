<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use App\Helpers\ParseUrlHelper;
use Illuminate\Support\Facades\Log;

class LandingController extends Controller
{
    // read
    public function index()
    {
        return inertia('Front/LandingPage', [
            'posts' => Post::latest('created_at')->get(),
        ]);
    }

    // detail
    public function detail(Post $post)
    {
        try {
            return inertia('Front/DetailPage', [
                'post' => $post
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            //throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    // create
    public function create()
    {
        return inertia('Front/CreateContent');
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required',
                'banner' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
                'narasumber' => 'required',
                'date' => 'required',
                'description' => 'required',
                'short_description' => 'required',
            ]);

            $post = Post::create([
                'title' => $request->title,
                'slug' => (new Post())->uniqueSlug($request->title),
                'banner' => $request->banner,
                'narasumber' => $request->narasumber,
                'date' => $request->date,
                'description' => $request->description,
                'short_description' => $request->short_description,
            ]);

            // image
            if ($request->hasFile('banner')) {
                $banner = $post->addMediaFromRequest('banner')->toMediaCollection('banner');
                $banner->banner = ParseUrlHelper::ParseUrl($banner->getUrl());
                $banner->save();
            }

            if ($post) {
                return Redirect::route('landing')->with("Saved", 'is Saved');
            } else {
                return ('gagal');
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    // update
    public function edit(Post $post)
    {
        // return Post::where('id',$post)->firstOrFail();
        return inertia("Front/CardEdit", [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        try {
            $request->validate([
                'title' => 'required',
                'banner' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
                'narasumber' => 'required',
                'date' => 'required',
                'description' => 'required',
                'short_description' => 'required',
            ]);

            DB::beginTransaction();

            $post->update([
                'title' => $request->title,
                'slug' => (new Post())->uniqueSlug($request->title),
                'narasumber' => $request->narasumber,
                'date' => $request->date,
                'description' => $request->description,
                'short_description' => $request->short_description,
                $post->save()
            ]);

            DB::commit();

            return Redirect::route('landing')->with("Saved", 'is Saved');

            // if (request()->hasFile('banner')) {
            //     $banner = $post->replaceImage($request->file('banner'), Post::ImageBanner);
            //     // $post->icon = ParseUrlHelper::ParseUrl($banner->getUrl());
            //     $post->banner = ParseUrlHelper::ParseUrl($banner->getUrl());
            // }

        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);
            return back()->withErrors([trans('server.500')], 500);
        }
    }

    // delete
    public function destroy(Post $post)
    {
        try {
            // return($post);
            DB::beginTransaction();
            $post->delete();
            DB::commit();

            return Redirect::route('landing')->with("Destroy", 'Success Destroy');
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
