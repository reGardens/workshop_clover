<?php

use App\Http\Controllers\Backoffice\Access\PermissionController;
use App\Http\Controllers\Backoffice\Access\RoleController;
use App\Http\Controllers\Backoffice\Access\UserController;
use App\Http\Controllers\Backoffice\Auth\AuthenticateSessionController;
use App\Http\Controllers\Backoffice\Dashboard\DashboardController;
use App\Http\Controllers\Backoffice\Profile\ChangePasswordController;
use App\Http\Controllers\Backoffice\Profile\ProfileController;
use App\Http\Controllers\Backoffice\Sewing\MakeNewsController;
use Illuminate\Support\Facades\Route;

if (config("cms.enable") && config("cms.path")) {
  Route::group(['prefix' => config("cms.path"), 'as' => 'cms.'], function () {
    // dashboard cms
    Route::middleware(['auth:cms'])->group(function () {
      /**
       * cms logout
       * route: CMS_PATH/logout
       * name: cms.logout.process
       * middleware: [auth:cms]
       */
      Route::post('/logout', [AuthenticateSessionController::class, 'destroy'])->name('logout');
      /**
       * cms dashboard
       * route: CMS_PATH/dashboard
       * name: cms.dashboard
       * middleware: [auth:cms]
       */
      Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

      Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {
        /**
         * cms change password user
         * route: CMS_PATH/change-password
         * name: cms.profile.password.edit
         * middleware: [auth:cms]
         */
        Route::get('/password', [ChangePasswordController::class, 'edit'])->name('password.edit');
        /**
         * cms change password user handler
         * route: CMS_PATH/change-password
         * name: cms.profile.password.update
         * middleware: [auth:cms]
         */
        Route::put('/password', [ChangePasswordController::class, 'update'])->name('password.update');

        /**
         * cms change profile user
         * route: CMS_PATH/change-profile
         * name: cms.profile.edit
         * middleware: [auth:cms]
         */
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        /**
         * cms change profile user handler
         * route: CMS_PATH/change-profile
         * name: cms.profile.update
         * middleware: [auth:cms]
         */
        Route::put('/', [ProfileController::class, 'update'])->name('update');
      });

      Route::group(['as' => 'access.', 'prefix' => 'access',], function () {
        Route::group(['as' => 'user.', 'prefix' => 'user', 'middleware' => ['role_or_permission:Super Admin|user management',]], function () {
          /**
           * user index
           * route: CMS_PATH/access/user
           * name: cms.access.user.index
           * middleware: [auth:cms, role_or_permission:Super Admin|user management]
           */
          Route::get('/', [UserController::class, 'index'])->name('index');
          /**
           * user index
           * route: CMS_PATH/access/user/create
           * name: cms.access.user.create
           * middleware: [auth:cms, role_or_permission:Super Admin|user management]
           */
          Route::get('/create', [UserController::class, 'create'])->name('create');
          /**
           * user store
           * route: CMS_PATH/access/user
           * name: cms.access.user.store
           * middleware: [auth:cms, role_or_permission:Super Admin|user management]
           */
          Route::post('/', [UserController::class, 'store'])->name('store');
          /**
           * user edit
           * route: CMS_PATH/access/user/edit/{user}
           * name: cms.access.user.edit
           * middleware: [auth:cms, role_or_permission:Super Admin|user management]
           */
          Route::get('/edit/{user}', [UserController::class, 'edit'])->name('edit');
          /**
           * user update
           * route: CMS_PATH/access/user/edit/{user}
           * name: cms.access.user.update
           * middleware: [auth:cms, role_or_permission:Super Admin|user management]
           */
          Route::put('/edit/{user}', [UserController::class, 'update'])->name('update');
          /**
           * user delete
           * route: CMS_PATH/access/user/{user}
           * name: cms.access.user.delete
           * middleware: [auth:cms, role_or_permission:Super Admin|user management]
           */
          Route::delete('/{user}', [UserController::class, 'destroy'])->name('delete');
        });

        Route::group(['as' => 'role.', 'prefix' => 'role', 'middleware' => ['role_or_permission:Super Admin|role management',]], function () {
          /**
           * role index
           * route: CMS_PATH/access/role
           * name: cms.access.role.index
           * middleware: [auth:cms, role_or_permission:Super Admin|role management]
           */
          Route::get('/', [RoleController::class, 'index'])->name('index');
          /**
           * role index
           * route: CMS_PATH/access/role/create
           * name: cms.access.role.create
           * middleware: [auth:cms, role_or_permission:Super Admin|role management]
           */
          Route::get('/create', [RoleController::class, 'create'])->name('create');
          /**
           * role store
           * route: CMS_PATH/access/role
           * name: cms.access.role.store
           * middleware: [auth:cms, role_or_permission:Super Admin|role management]
           */
          Route::post('/', [RoleController::class, 'store'])->name('store');
          /**
           * role edit
           * route: CMS_PATH/access/role/edit/{role}
           * name: cms.access.role.edit
           * middleware: [auth:cms, role_or_permission:Super Admin|role management]
           */
          Route::get('/edit/{role}', [RoleController::class, 'edit'])->name('edit');
          /**
           * role update
           * route: CMS_PATH/access/role/edit/{role}
           * name: cms.access.role.update
           * middleware: [auth:cms, role_or_permission:Super Admin|role management]
           */
          Route::put('/edit/{role}', [RoleController::class, 'update'])->name('update');
          /**
           * role delete
           * route: CMS_PATH/access/role/{role}
           * name: cms.access.role.delete
           * middleware: [auth:cms, role_or_permission:Super Admin|role management]
           */
          Route::delete('/{role}', [RoleController::class, 'destroy'])->name('delete');
        });

        /**
         * permission index
         * route: CMS_PATH/access/permission
         * name: cms.access.permission.index
         * middleware: [auth:cms, role_or_permission:Super Admin|permission management]
         */
        Route::get('/permission', [PermissionController::class, 'index'])->name('permission.index')->middleware(['role_or_permission:Super Admin|permission management',]);
      });

      Route::group(['as' => 'sewing.', 'prefix' => 'sewing'], function () {
        Route::group(['as' => 'post.', 'prefix' => 'post', 'middleware' => ['role_or_permission:Super Admin|post management',]], function () {
          /**
           * post index
           * route: CMS_PATH/sewing/post
           * name: cms.sewing.post.index
           * middleware: [auth:cms, role_or_permission:Super Admin|role management]
           */
          Route::get('/', [MakeNewsController::class, 'index'])->name('index');
          /**
           * index create
           * route: CMS_PATH/sewing/create
           * name: cms.sewing.post.create
           * middleware: [auth:cms, role_or_permission:Super Admin|role management]
           */
          Route::get('/create', [MakeNewsController::class, 'create'])->name('create');
        });
      });
    });

    // auth cms
    Route::middleware(['guest:cms'])->group(function () {
      /**
       * cms login
       * route: CMS_PATH/login
       * name: cms.login
       * middleware: [RedirectIfAuthenticatedCms]
       */
      Route::get('/login', [AuthenticateSessionController::class, 'index'])->name('login');
      /**
       * cms login
       * route: CMS_PATH/login
       * name: cms.login.process
       * middleware: [RedirectIfAuthenticatedCms]
       */
      Route::post('/login', [AuthenticateSessionController::class, 'store'])->name('login.process');
    });
  });
}
