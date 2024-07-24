const apiUrl = "http://localhost:8000/api/articles";

export async function index() {
  const response = await fetch(apiUrl, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

export async function store(article) {
  const response = await fetch(apiUrl, {
    method: "POST",
    body: article,
  });
  console.log("Usao 2!");
  if (!response.ok) {
    throw new Error("Neuspesno cuvanje artikla");
  }
  console.log("Usao 3!");
  const data = await response.json();

  return data;
}

export async function show(id) {
  const response = await fetch(apiUrl + "/" + id, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  return data;
}

export async function update(article, id) {
  const response = await fetch(apiUrl + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error("Neuspesno updatovanje artikla");
  }

  const data = await response.json();
}

export async function getAllArticlePagination() {
  const response = await fetch(apiUrl + "/paginate", {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

export async function getLatestArticle() {
  const response = await fetch(apiUrl + "/latest", {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

export async function getArticlesByCategory(id) {
  const response = await fetch(apiUrl + "/category/" + id, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  return data;
}

export async function searchArticles(search) {
  const response = await fetch(apiUrl + "/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(search),
  });

  if (!response.ok) {
    const odgovor = response.json();
    throw new Error(odgovor.poruka);
  }

  const data = response.json();

  return data;
}
