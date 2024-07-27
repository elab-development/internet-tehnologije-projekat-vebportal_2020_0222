const apiUrl = "http://localhost:8000/api/rapid/";

export async function getStandings(tournamentId, seasonId){

    const response = await fetch(apiUrl+tournamentId+"/"+seasonId);

    const data  = await response.json();

    return data;

}