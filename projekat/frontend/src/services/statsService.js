import fetchWithAuth from "./authService";

const apiUrl = "http://localhost:8000/api/stats";

export async function getNumberOfArticlesPerCategory(){

    const response = await fetchWithAuth(apiUrl+"/articles",{
        method:"GET"
    });

    if(!response.ok){
        throw new Error("Greska prilikom dobijanja broja clanaka po kategoriji!");
    }

    const data = await response.json();

    return data;

}

export async function getNumberOfUsers(){

    const response = await fetchWithAuth(apiUrl+"/users",{
        method:"GET"
    });

    if(!response.ok){
        throw new Error("Greska prilikom dobijanja broja korisnika!");
    }

    const data = await response.json();

    return data;

}

export async function getNumberOfAdmins(){

    const response = await fetchWithAuth(apiUrl+"/admins",{
        method:"GET"
    });

    if(!response.ok){
        throw new Error("Greska prilikom dobijanja broja admina!");
    }

    const data = await response.json();

    return data;

}

export async function getNumberOfCommentsByCategory(){

    const response = await fetchWithAuth(apiUrl+"/comments",{
        method:"GET"
    });

    if(!response.ok){
        throw new Error("Greska prilikom dobijanja broja komentara po kategorijama!");
    }

    const data = await response.json();

    return data;

}