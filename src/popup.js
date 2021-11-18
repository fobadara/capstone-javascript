import './style.css';

let appId = "";

const addLike = async (item_id) => {
  const response = await fetch ("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/K5LEyqREMBDZLL96ZFuw/likes", {
  method: 'POST',
  body: JSON.stringify(
    {
      "item_id": item_id
    }),
  Headers: {
    'content-type' : 'application/json; charset=UTF-8',
  },
})
response.json().then((json) => {
  console.log(json);
});
}

const getLike = (id, none) => {
  console.log(node);
  fetch("")
  .then(response => response.json())
  .then(json => {
    let bool = false;
    let idx = 0;
    let likenum = -1;
    json.forEach((item, i) => {
      if (item.item_id === id){
        bool = true;
        idx = i;
        likenum = item.likes;
      }
    })
    if(bool){
      node.textContent = `like ${likenum + 1}`;
      addLike(id);
    }else if (bool == false) {
      node.textContent = `like 1`;
      addLike(id);
    }
  });
}

const loadLike = (id, node) => {
  console.log(node);
  fetch("")
  .then(response => response.json())
  .then(json => {
    let bool = false
    let idx = 0;
    let likenum = 0;
    json.forEach((item, i) => {
      if(item.item_id ===id) {
        bool = true;
        idx = i;
        likenum = item.likes;
      }
    })
    if(bool){
      node.textContent = `like ${likenum}`;
    }else if (bool == false){
      node.textContent = `like 0`;
    }
  })
}