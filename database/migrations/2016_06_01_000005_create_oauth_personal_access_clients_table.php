<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOauthPersonalAccessClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('oauth_personal_access_clients', function (Blueprint $table) {
            // $table->increments('id');
            // $table->unsignedInteger('client_id')->index();
            // $table->timestamps();
            
            $table->increments('id');
            $table->integer('client_id');
            $table->timestamps();

            $table->index('client_id', 'opa_client_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('oauth_personal_access_clients');
    }
}
