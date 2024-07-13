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
    const response = await fetch(apiUrl + "/positiveVotes/" + id, {
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