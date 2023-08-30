<?php

namespace App\Http\Controllers\Backoffice\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Spatie\Permission\Models\Permission;

class DashboardController extends Controller
{
    public function index()
    {
        $csrfToken = Session::token();
        if (request()->get('p') === $csrfToken) {
            return response()->json([
                'data' => [
                    'users_count' => User::count(),
                    'roles_count' => Role::count(),
                    'permissions_count' => Permission::count(),
                ],
                'status' => 'OK'
            ]);
        }

        return inertia('Backoffice/Dashboard/Index', [
            'pol' => $csrfToken,
            'users_count' => User::count(),
            'roles_count' => Role::count(),
            'permissions_count' => Permission::count(),
        ]);
    }
}
