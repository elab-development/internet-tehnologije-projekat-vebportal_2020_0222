const apiUrl = "http://localhost:8000/api/mail";

export async function sendWelcomeEmail(user){

    const response = await fetch(apiUrl,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
    });

    const data = await response.json();

    return data;

}