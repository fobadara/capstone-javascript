import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// import './style.css';

let appId = "WiHcHxkWWMJnktjM3rOO";

const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

let endPoint = 'apps/';

const loadComments = (itemId) => {
  fetch(`${baseUri}${appId}/comments?item_id=${itemId}`)
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        const itemArr = json;
        const commentsDiv = document.querySelector('#comments');
        let commentsHtml = '';
        itemArr.forEach((item) => {
          commentsHtml += `<p class="comment-item">${item.creation_date} by ${item.username} : ${item.comment}`;
        });
        commentsDiv.innerHTML = commentsHtml;
        // commentCounter();
        return 0;
      }
      return 0;
    });
};

const uploadComment = (obj) => {
  fetch(`${baseUri}${appId}/comments`, {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then(() => {

    });
};

const loadPopupCommentPage = (itemId, popupNode) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
    .then((response) => response.json())
    .then((json) => {
      const meal = json.meals[0];
      console.log(meal);
      const popupHtml = `
            <div class="container">
            <i class="fas fa-times fa-2x" id="go-back"></i>
                <div id="img-comment" class="img-comment">
                <img src="${meal.strMealThumb}" alt="meal-img">
                <h5>${meal.strMeal}</h5>
                </div>
                <div id="info-item-comment" class="item-info">
                <div class="ingredient">
                <h5>Ingredient <i class="fas fa-arrow-down"></i></h5>
                <ul>
                <li>${meal.strIngredient1}</li>
                <li>${meal.strIngredient2}</li>
                <li>${meal.strIngredient3}</li>
                <li>${meal.strIngredient4}</li>
                <li>${meal.strIngredient5}</li>
                </ul>
                </div>
                <div class="instructions"> 
                <h5>Instruction <i class="fas fa-note"></i></h5>
                 <p> ${meal.strInstructions}</p>
                 </div>
                <a href=${meal.strSource} target="_blank">See more about this meal <i class="fas fa-arrow-right"></i></a>
                </div>
                <h4 id="comments-header">Comments By previous Visitors</h4>
                <div id="comments" class="comments"></div>
                <div id="form-comment" class="form-comment">
                <form id="comment-form">
                <div class="form-group mb-3">
                <input type="text" class="form-control" id="your-name" name="name" placeholder="Your name" required>
                </div>
                <div class="form-group mb-3">
                <textarea class="form-control" id="your-comments" name="comment" placeholder="Your comment" required></textarea>
                </div>
                <button type="submit" class="btn btn-outline-secondary submit-btn">Comment</button>
                </form>
                </div>
                </div>
                `;
      popupNode.innerHTML = popupHtml;
      loadComments(meal.idMeal);

      const commentForm = document.querySelector('#comment-form');
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentObj = {
          item_id: meal.idMeal,
          username: commentForm.name.value,
          comment: commentForm.comment.value,
        };
        uploadComment(commentObj);
        commentForm.name.value = '';
        commentForm.comment.value = '';
        setTimeout(() => { loadComments(meal.idMeal); }, 1000);
      });

      const header = document.querySelector('header');
      const main = document.querySelector('.row');
      const footer = document.querySelector('footer');
      const popupComment = document.querySelector('#popup-comment');

      const goBack = document.querySelector('#go-back');
      goBack.addEventListener('click', () => {
        popupNode.innerHTML = '';
        header.style.filter = 'none';
        main.style.filter = 'none';
        footer.style.filter = 'none';
        popupComment.style.display = 'none';
      });
    });
};

export { loadPopupCommentPage, uploadComment, loadComments };
