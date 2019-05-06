<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOauthRefreshTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oauth_refresh_tokens', function (Blueprint $table) {
            // $table->string('id', 100)->primary();
            // $table->string('access_token_id', 100)->index();
            // $table->boolean('revoked');
            // $table->dateTime('expires_at')->nullable();

            $table->string('id', 100)->primary();
            $table->string('access_token_id', 100);
            $table->boolean('revoked');
            $table->dateTime('expires_at')->nullable();
            $table->index('access_token_id', 'ort_access_token_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('oauth_refresh_tokens');
    }
}
