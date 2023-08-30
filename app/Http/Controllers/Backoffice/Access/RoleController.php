<?php

namespace App\Http\Controllers\Backoffice\Access;

use App\Helpers\AlertHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Access\RoleStoreRequest;
use App\Http\Requests\Backoffice\Access\RoleUpdateRequest;
use App\Http\Resources\Backoffice\Access\RoleEditResource;
use App\Http\Resources\Backoffice\Access\RoleIndexResource;
use App\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        return inertia('Backoffice/Access/Role/Index', [
            'roles' => RoleIndexResource::collection(Role::with('permissions')
                ->latest()
                ->paginate(request()->size ?? 10))
        ]);
    }

    public function create()
    {
        return inertia('Backoffice/Access/Role/Create', [
            'permissions' => Permission::get(['id', 'name'])
        ]);
    }

    public function store(RoleStoreRequest $request)
    {
        try {
            DB::beginTransaction();
            $role = new Role;
            $role->name = $request->name;
            $role->guard_name = Role::GUARD_CMS;
            $role->save();

            $role->givePermissionTo($request->permissions);
            DB::commit();

            return redirect()->route('cms.access.role.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_create', ['type' => "Role $role->name"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function edit(Role $role)
    {
        if ($role->name === Role::SUPER_ADMIN) return back()->with('alert', ['type' => AlertHelper::ALERT_ERROR, 'message' => trans('failed.prohibited.crud_edit', ['type' => "Role $role->name"])]);

        return inertia('Backoffice/Access/Role/Edit', [
            'role' => new RoleEditResource($role->load('permissions')),
            'permissions' => Permission::get(['id', 'name'])
        ]);
    }

    public function update(Role $role, RoleUpdateRequest $request)
    {
        if ($role->name === Role::SUPER_ADMIN) return back()->with('alert', ['type' => AlertHelper::ALERT_ERROR, 'message' => trans('failed.prohibited.crud_update', ['type' => "Role $role->name"])]);

        try {
            DB::beginTransaction();
            $role->name = $request->name;
            $role->save();

            $role->syncPermissions($request->permissions);
            DB::commit();

            return redirect()->route('cms.access.role.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_update', ['type' => "Role $role->name"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function destroy(Role $role)
    {
        if ($role->name === Role::SUPER_ADMIN) return back()->with('alert', ['type' => AlertHelper::ALERT_ERROR, 'message' => trans('failed.prohibited.crud_delete', ['type' => "Role $role->name"])]);

        try {
            DB::beginTransaction();
            $role->delete();
            DB::commit();

            return redirect()->route('cms.access.role.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_delete', ['type' => "Role $role->name"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
