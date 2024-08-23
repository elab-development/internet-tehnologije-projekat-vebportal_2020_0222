import fetchWithAuth from "./authService";

const apiUrl = "http://localhost:8000/api/user/";

export async function banUser(userId) {
  const response = await fetchWithAuth(apiUrl + "banUser/" + userId, {
    method: "PATCH",
  });

  console.log("Ruta: " + apiUrl + "banUser/" + userId);

  if (!response.ok) {
    throw new Error("Nije uspelo banovanje korisnika!");
  }

  const data = await response.json();

  return data;
}
