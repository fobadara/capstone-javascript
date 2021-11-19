import './style.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// import './style.css';

const appId = 'WiHcHxkWWMJnktjM3rOO';

const baseUri = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';

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

const loadPopupCommentPage = async (itemId, popupNode) => {
  await fetch(`https://api.europeana.eu/record/v2/search.json&query=africa`, { mode: 'no-cors', })
    .then((response) => response.text())
    .then((json) => {
      const { items } = json;
      console.log('aaa')
      console.log(items);
      const popupHtml = `
            <div class="container">
            <i class="fas fa-times fa-2x" id="go-back"></i>
                <div id="img-comment" class="img-comment">
                <img src="${items[itemId].edmPreview[0]}" alt="meal-img">
                <h5>${items[itemId+].title[0]}</h5>
                </div>
                <div id="info-item-comment" class="item-info">
                <div class="details">
                  <p>${items[itemId].dcDescription}</p>
                </div >
                </div >
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
                </div >
  `;
      popupNode.innerHTML = popupHtml;
      loadComments(itemId);

      const commentForm = document.querySelector('#comment-form');
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentObj = {
          item_id: e.target.id,
          username: commentForm.name.value,
          comment: commentForm.comment.value,
        };
        uploadComment(commentObj);
        commentForm.name.value = '';
        commentForm.comment.value = '';
        setTimeout(() => { loadComments(itemId); }, 1000);
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
