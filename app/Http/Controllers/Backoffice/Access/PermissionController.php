<?php

namespace App\Http\Controllers\Backoffice\Access;

use App\Http\Controllers\Controller;
use App\Http\Resources\Backoffice\Access\PermissionIndexResource;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return inertia('Backoffice/Access/Permission/Index', [
            'permissions' => PermissionIndexResource::collection(Permission::latest()
                ->paginate(request()->size ?? 10))
        ]);
    }
}
