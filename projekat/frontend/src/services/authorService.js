import fetchWithAuth from "./authService";

const apiUrl = "http://localhost:8000/api/authors";

export async function show(id) {

    const response = await fetchWithAuth(apiUrl+"/"+id,{
        method:"GET"
    });

    if(!response.ok){
        throw new Error("Autor sa zadatim ID ne postoji!");
    }

    const data = await response.json();
    
    return data;
}