const likesURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/likes/';

const mealLikes = async (mealID) => {
  await fetch(likesURL, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      item_id: mealID,
    }),
  });
};

const addLikeMeal = async (mealID) => {
  let counter = 0;
  const res = await fetch(likesURL);
  const data = await res.json();
  data.forEach((val) => {
    if (val.item_id === mealID) {
      counter = val.likes;
    }
  });
  return counter;
};

export { addLikeMeal, mealLikes };