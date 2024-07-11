const apiUrl = "http://localhost:8000/api/auth";

export async function login(user) {
  const response = await fetch(apiUrl + '/login', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

  if(!response.ok){
    throw new Error("Nije uspelo logovanje!");
  }

  const data = await response.json();

  return data;
}


export async function register(user) {
    const response = await fetch(apiUrl + '/register', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if(!response.ok){
        throw new Error("Nije uspela registracija!");
      }
  
    const data = await response.json();
  
    return data;
  }