<?php

Route::get('/{any}', 'MainController@index')->where('any', '.*');