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