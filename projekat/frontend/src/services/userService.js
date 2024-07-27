const apiUrl = "http://localhost:8000/api/user/";

export async function banUser(userId){

    const response = await fetch(apiUrl+ "banUser/" + userId,{
        method: "PATCH"
    });

    console.log("Ruta: " + apiUrl+ "banUser/" + userId);

    if(!response.ok){

        
        throw new Error(response.json().poruka);

    }

    const data = await response();

    return data;

}