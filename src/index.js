import './styles.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import { getPokemons } from './modules/api.js';
import {
  postComment, getComment, getLikes, postLikes,
} from './modules/involvement.js';

const pokemonsContainer = document.getElementById('pokemons-container');
const commentPopUp = document.querySelector('.popup');

const addNewLike = async (id) => {
  await postLikes({ item_id: id });
};

const displayPokemons = (pokemon) => {
  const li = document.createElement('li');
  li.classList.add('pokemon-list');

  const img = document.createElement('img');
  img.src = pokemon.image;
  img.alt = pokemon.name;

  const p = document.createElement('p');
  p.innerText = `${pokemon.name}-${pokemon.type}`;

  const actionWrapper = document.createElement('div');
  const likeEl = document.createElement('span');
  const hearIcon = document.createElement('span');
  hearIcon.innerHTML = '<i class="fa-regular fa-heart"></i>';
  const info = document.createElement('span');
  info.innerText = `Likes ${pokemon.likes > 0 ? pokemon.likes : ''}`;
  likeEl.appendChild(hearIcon);
  likeEl.appendChild(info);
  likeEl.addEventListener('click', () => {
    addNewLike(pokemon.id);
  });

  const commentEl = document.createElement('span');
  const commentIcon = document.createElement('i');
  commentIcon.classList.add('fa-regular', 'fa-comment');
  const commentBtn = document.createElement('button');
  commentBtn.className = 'btn';
  commentBtn.id = pokemon.id;
  commentBtn.innerText = 'Comments';
  commentEl.appendChild(commentIcon);
  commentEl.appendChild(commentBtn);

  actionWrapper.appendChild(likeEl);
  actionWrapper.appendChild(commentEl);

  li.appendChild(img);
  li.appendChild(p);
  li.appendChild(actionWrapper);
  pokemonsContainer.appendChild(li);
};

const displayCommentsPopup = (itemId) => {
  commentPopUp.innerHTML = `
  <div class="popup-window">
  <span id="close">X</span>
  <div class="comments">
  <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${itemId}.png'>
  </div>
  <h4>Comments <span id="comment-count"></span></h4>
  <ul id="comment-list">
  </ul>
  <form id=${itemId}>
    <h4>Add a comment</h4>
    <div class="form-control">
      <input type="text" placeholder="Your name" id="name" class="name" />
    </div>
    <div class="form-control">
      <textarea name="comment" id="comment" cols="30" rows="10">Your Insights</textarea>
    </div>
    <input type="submit" value="Comment" id="postcomment" class="btn"/>
  </form>
</div>
  `;
};

(async () => {
  const pokemons = await getPokemons();
  const likes = JSON.parse(await getLikes() ? await getLikes() : '[]');

  pokemons.forEach((pokemon) => {
    likes.forEach((like) => {
      if (pokemon.id === parseInt(like.item_id, 10)) {
        pokemon.likes = like.likes;
      }
    });
  });

  pokemonsContainer.innerHTML = '';
  pokemons.forEach((pokemon) => displayPokemons(pokemon));
})();

const postComments = async (itemId, username, comment) => {
  const comments = await postComment({ item_id: itemId, username, comment });
  return comments;
};

const getComments = async (itemId) => {
  const commentCount = document.querySelector('#comment-count');
  const comments = await getComment(itemId) || [];
  const commentList = document.querySelector('#comment-list');
  let htmlList = '';
  commentCount.innerHTML = comments.length || 0;
  comments.forEach((comment) => {
    htmlList += `<li>${comment.creation_date} ${comment.username} ${comment.comment}</li>`;
  });

  commentList.innerHTML = htmlList;
  return comments;
};

pokemonsContainer.addEventListener('click', (e) => {
  if (e.target.className === 'btn') {
    commentPopUp.classList.add('open');
    displayCommentsPopup(e.target.id);
    getComments(e.target.id);
  }
});

commentPopUp.addEventListener('click', (e) => {
  if (e.target.id === 'close') {
    commentPopUp.classList.remove('open');
  }
});

// Form submission
commentPopUp.addEventListener('click', (e) => {
  const userName = document.querySelector('#name');
  const userComment = document.querySelector('#comment');
  if (e.target.id === 'postcomment') {
    postComments(e.target.parentElement.id, userName.value, userComment.value);
    getComments(e.target.parentElement.id);
    e.preventDefault();
    userName.value = '';
    userComment.value = '';
  }
});

commentPopUp.addEventListener('click', (e) => {
  if (e.target.id === 'postcomment') {
    getComments(e.target.parentElement.id);
  }
});
