<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Word::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'english' => 'required|string|max:255',
            'finnish' => 'required|string|max:100',
            'example' => 'required|string|max:255',
        ]);

        $word = Word::create($validated);
        return response()->json(['message' => 'Word created successfully!', 'data' => $word], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Word::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $word = Word::findOrFail($id);
        $validated = $request->validate([
            'english' => 'required|string|max:255',
            'finnish' => 'required|string|max:100',
            'example' => 'required|string|max:255',
        ]);
        $word->update($validated);
        return response()->json($word);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $word = Word::findOrFail($id);
        $word->delete();
        return response()->json(null, 204);
    }
}
