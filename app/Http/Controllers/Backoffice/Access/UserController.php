<?php

namespace App\Http\Controllers\Backoffice\Access;

use App\Helpers\AlertHelper;
use App\Helpers\ParseUrlHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Access\UserStoreRequest;
use App\Http\Requests\Backoffice\Access\UserUpdateRequest;
use App\Http\Resources\Backoffice\Access\UserEditResource;
use App\Http\Resources\Backoffice\Access\UserIndexResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        return inertia('Backoffice/Access/User/Index', [
            'users' => UserIndexResource::collection(User::with('roles')
                ->latest()
                ->paginate(request()->size ?? 10))
        ]);
    }

    public function create()
    {
        return inertia('Backoffice/Access/User/Create', [
            'roles' => Role::get(['id', 'name'])
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        try {
            DB::beginTransaction();
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = $request->username ? $request->username : (new User())->uniqueUsername($request->name);
            $user->password = bcrypt($request->password);
            $user->save();
            
            // return('sampaiaiaiai');
            $user->assignRole($request->roles);
            
            if (request()->hasFile('avatar')) {
                $avatar = $user->replaceImage($request->file('avatar'), User::AVATAR_COLLECTION_NAME);
                $user->avatar = ParseUrlHelper::ParseUrl($avatar->getUrl());
                $user->save();
            }
            DB::commit();
            
            return redirect()->route('cms.access.user.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_create', ['type' => "Admin $user->name"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function edit(User $user)
    {
        if ($user->username === User::SUPER_ADMIN_USERNAME) return back()->with('alert', ['type' => AlertHelper::ALERT_ERROR, 'message' => trans('failed.prohibited.crud_edit', ['type' => "User $user->name"])]);

        return inertia('Backoffice/Access/User/Edit', [
            'user' => new UserEditResource($user->load('roles')),
            'roles' => Role::get(['id', 'name'])
        ]);
    }

    public function update(User $user, UserUpdateRequest $request)
    {
        if ($user->username === User::SUPER_ADMIN_USERNAME) return back()->with('alert', ['type' => AlertHelper::ALERT_ERROR, 'message' => trans('failed.prohibited.crud_update', ['type' => "User $user->name"])]);

        try {
            DB::beginTransaction();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = $request->username ? $request->username : (new User())->uniqueUsername($request->name);
            $user->password = bcrypt($request->password);
            $user->save();

            $user->syncRoles($request->roles);

            if (request()->hasFile('avatar')) {
                $avatar = $user->replaceImage($request->file('avatar'), User::AVATAR_COLLECTION_NAME);
                $user->avatar = ParseUrlHelper::ParseUrl($avatar->getUrl());
                $user->save();
            }
            DB::commit();
            $current_user_session = auth('cms')->user();
            if (($current_user_session->email === $user->email) && !$user->hasRole(['Super Admin'])) return redirect()->route('cms.dashboard')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_update', ['type' => "User $user->name"])]);

            return redirect()->route('cms.access.user.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_update', ['type' => "User $user->name"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function destroy(User $user)
    {
        if ($user->username === User::SUPER_ADMIN_USERNAME) return back()->with('alert', ['type' => AlertHelper::ALERT_ERROR, 'message' => trans('failed.prohibited.crud_delete', ['type' => "User $user->name"])]);

        try {
            DB::beginTransaction();
            $user->delete();
            DB::commit();

            return redirect()->route('cms.access.user.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_delete', ['type' => "User $user->name"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
