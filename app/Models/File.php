<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use SoftDeletes;

    protected $connection = 'oracle';
    protected $table = 'ipc.ipc_adv_files';
    protected $fillable = [
        'category_id', 'file_name', 'description', 'file_size', 'file_path', 'created_by', 'thumbnail_path'
    ];
    protected $primaryKey = 'file_id';
    protected $dates = ['deleted_at'];

    public function category()
    {
        return $this->hasOne('App\Category', 'category_id', 'category_id');
    }
}