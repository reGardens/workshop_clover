<?php

namespace App\Http\Controllers\Backoffice\Profile;

use App\Helpers\AlertHelper;
use App\Helpers\ParseUrlHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Profile\ProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function edit()
    {
        return inertia('Backoffice/Profile/Index', []);
    }

    public function update(ProfileRequest $request)
    {
        try {
            DB::beginTransaction();
            $user = auth('cms')->user();
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->save();
            if(request()->hasFile('avatar')) {
                $avatar = $user->replaceImage($request->file('avatar'), User::AVATAR_COLLECTION_NAME);
                $user->avatar = ParseUrlHelper::ParseUrl($avatar->getUrl());
                $user->save();
            }
            DB::commit();
            return back()->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_update', ['type' => $user->name])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);
            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
