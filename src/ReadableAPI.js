const api = "http://localhost:5001";

const headers = {
  'Accept': 'application/json',
  'Authorization': 'sunil'
}

export const getCategories = () => 
  fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)


export const getPosts = () => 
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())
    .then(data => data)