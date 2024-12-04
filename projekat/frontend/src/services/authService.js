const apiUrl = "http://localhost:8000/api/auth";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${url}`, {
    ...options,
    headers,
  });

  return response;
};

export default fetchWithAuth;

export async function login(user) {
  const response = await fetch(apiUrl + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Nije uspelo logovanje!");
  }

  const data = await response.json();

  return data;
}

export async function register(user) {
  const response = await fetch(apiUrl + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Nije uspela registracija!");
  }

  const data = await response.json();

  console.log("Uspeo register!");

  return data;
}

export async function logout() {
  const response = await fetchWithAuth(apiUrl+"/logout", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Nije uspelo izlogovanje");
  }

  const data = await response.json();

  localStorage.removeItem("user");
  localStorage.removeItem("token");

  return data;
}
