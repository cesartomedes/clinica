<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class RoleMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_access_admin_route()
    {
        $user = User::factory()->create(['role' => 'super_admin']);
        $token = auth()->login($user);

        $resp = $this->withHeader('Authorization', "Bearer {$token}")
                     ->getJson('/api/admin/users');

        $resp->assertStatus(200);
    }

    public function test_profesor_cannot_access_super_admin_route()
    {
        $user = User::factory()->create(['role' => 'profesor']);
        $token = auth()->login($user);

        $resp = $this->withHeader('Authorization', "Bearer {$token}")
                     ->getJson('/api/admin/users');

        $resp->assertStatus(403);
    }
}
