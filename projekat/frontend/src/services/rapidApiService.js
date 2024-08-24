const apiUrl = "http://localhost:8000/api/rapid/";

export async function getStandings(tournamentId, seasonId){

    const response = await fetch(apiUrl+tournamentId+"/"+seasonId);

    if(!response.ok){

        throw new Error("Nije uspeo zahtev");

    }

    const data  = await response.json();

    return data;

}