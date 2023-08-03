<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\Ad;
use Illuminate\Support\Facades\Http;

class AdController extends Controller
{
    /**
     * Summary of index
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index()
    {
        $ads = Auth::user()->ads; // Fetch all ads from the database
        return view('ads.index', ['ads' => $ads]);
    }

    /**
     * Summary of create
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        return view('ads.create');
    }

    /**
     * Summary of store
     * @param \Illuminate\Http\Request $request
     * @return RedirectResponse
     */
    public function store(Request $request)
    {
        // Validate the form data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Create the ad and associate it with the authenticated user
        $ad = new Ad($validatedData);
        Auth::user()->ads()->save($ad);

        // Redirect back to the ads index page or display success/failure messages
        return redirect()->route('ads.index')->with('success', 'Ad created successfully!');
    }



    public function edit(Ad $ad)
    {
        // Check if the ad belongs to the authenticated user
        if ($ad->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return view('ads.edit', ['ad' => $ad]);
    }

    public function update(Request $request, Ad $ad)
    {
        // Check if the ad belongs to the authenticated user
        if ($ad->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        // Validate the data from the form submission
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
        ]);

        // Update the ad with the validated data
        $ad->update([
            'title' => $request->title,
            'description' => $request->description,
            // Add other fields if necessary
        ]);

        // Redirect back to the ads.index page with a success message
        return redirect()->route('ads.index')->with('success', 'Ad updated successfully.');
    }

    public function destroy(Ad $ad)
    {
        // Check if the ad belongs to the authenticated user
        if ($ad->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        // Delete the ad
        $ad->delete();

        // Redirect back to the ads.index page with a success message
        return redirect()->route('ads.index')->with('success', 'Ad deleted successfully.');
    }
    public function getOlxAds(Ad $ad)
    {
        $response = Http::get('http://localhost:8080/api/ads');

        if ($response->successful()) {
            $ads = $response->json();
        } else {
            $ads = [];
        }

        return view('ads.olxAds', ['ads' => $ads]);

    }
}