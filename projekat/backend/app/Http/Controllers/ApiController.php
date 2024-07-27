<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class ApiController extends Controller
{
    public function getStandings($tournament_id, $season_id)
    {

        $url = "https://basketapi1.p.rapidapi.com/api/basketball/tournament/{$tournament_id}/season/{$season_id}/standings/total";
        $response = Http::withHeaders([
            'x-rapidapi-host' => 'basketapi1.p.rapidapi.com',
            'x-rapidapi-key' => '6e29f9c92fmsha18e48bdafce7abp188827jsnd0768e2470a9'
        ])->get($url);

        if ($response->successful()) {
            return response()->json($response->json());
        } else {
            return response()->json(['error' => 'API request failed: ' . $response->body()], 500);
        }
    }
}
