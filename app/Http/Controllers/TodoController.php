<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Validator;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::all();
    }

    public function show($id)
    {
        return Todo::findOrFail($id);
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'title' => 'required|string|min:10',
            'description' => 'nullable|string'
        ])->validate();

        $todo = new Todo;
        $todo->title       = $request->title;
        $todo->description = $request->description;
        $todo->user_id     = $request->user()->id;
        $todo->save();

        return response()->json(['message' => 'Todo has been saved.'], 201);
    }

    public function update(Request $request, $id)
    {
        Validator::make($request->all(), [
            'title' => 'required|string|min:10',
            'description' => 'nullable|string'
        ])->validate();

        $todo = Todo::findOrFail($id);
        $todo->title       = $request->title;
        $todo->description = $request->description;
        $todo->save();

        return response()->json(['message' => 'Todo has been updated.'], 201);
    }

    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();

        return response()->json(['message' => 'Successfully deleted'], 200);
    }
}
