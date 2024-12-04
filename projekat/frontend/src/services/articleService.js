import fetchWithAuth from "./authService";

const apiUrl = "http://localhost:8000/api/articles";

export async function index(pageNumber) {

  let response;
  if(pageNumber === 0 || !pageNumber){
    response = await fetch(apiUrl, {
      method: "GET",
    });
  }
  else{
     response = await fetch(apiUrl + "?page="+pageNumber,{
      method:"GET",
    });
  }
  
  const data = await response.json();

  return data;
}

export async function store(article) {
  const response = await fetch(apiUrl, {
    method: "POST",
    body: article,
  });

  if (!response.ok) {
    throw new Error("Neuspesno cuvanje artikla");
  }

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

export async function destroy(id){

  const response = await fetchWithAuth(apiUrl+"/"+id,{
    method: "DELETE"
  });

  if(!response.ok){

    throw new Error("Nije uspelo brisanje clanka!");
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

export async function getArticlesByCategory(id,pageNumber) {

  let response;

  if(pageNumber === 0 || !pageNumber){
     response = await fetch(apiUrl + "/category/" + id, {
      method: "GET",
    });
  }

  else{
    response = await fetch(apiUrl + "/category/" + id + "?page=" + pageNumber, {
      method: "GET",
    });
  }

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
