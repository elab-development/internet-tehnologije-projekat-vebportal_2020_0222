import fetchWithAuth from "./authService";

const apiUrl = "http://localhost:8000/api/comments";

export async function getCommentsByArticleId(articleId){

    const response = await fetch(apiUrl+"/"+ "byArticleId/"+ articleId);

    if(!response.ok){

        throw new Error("Nije uspelo dohvatanje komentara");        
    }

    const data = response.json();

    return data;
}

export async function addPositiveVotes(id) {

    const response = await fetchWithAuth(apiUrl+"/positiveVotes/"+id, {
      method: "PATCH",
    });
    
    if (!response.ok) {
      throw new Error("Neuspesno dodavanje plusa");
    }

    const data = await response.json();
  
    return data;
  }


  export async function addNegativeVotes(id) {
    const response = await fetch(apiUrl + "/negativeVotes/" + id, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error("Neuspesno dodavanje minusa");
    }

    const data = await response.json();
  
    return data;
  }

  export async function store(comment) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      throw new Error("Neuspesno cuvanje komentara");
    }
    const data = await response.json();
  
    return data;
  }

  export async function getCommentsWithMostPositiveVotes(articleId){

    const response = await fetch(apiUrl+"/"+ "mostPositive/"+ articleId);

    if(!response.ok){

        throw new Error("Nije uspelo dohvatanje komentara");        
    }

    const data = response.json();

    return data;
}

export async function getCommentsWithMostNegativeVotes(articleId){

    const response = await fetch(apiUrl+"/"+ "mostNegative/"+ articleId);

    if(!response.ok){

        throw new Error("Nije uspelo dohvatanje komentara");        
    }

    const data = response.json();

    return data;
}

export async function getCommentsByUserId(userId){

  const response = await fetchWithAuth(apiUrl + "/byUserId/" + userId);

  if(!response.ok){

    throw new Error(response.json().poruka);
  }

  const data = await response.json();

  return data;

}