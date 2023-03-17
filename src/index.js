import './styles.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import { getPokemons, getSinglePokemon } from './modules/api.js';
import {
  postComment, getComment, getLikes, postLikes,
} from './modules/involvement.js';
import itemCounter from './modules/itemCounter.js';
import commentCounter from './modules/commentCounter.js';
import displayAboutPopup from './modules/about.js';

const pokemonsContainer = document.getElementById('pokemons-container');
const pokemonTitle = document.getElementById('pokemon-title');
const pokemonLink = document.getElementById('pokemon-link');
const commentPopUp = document.querySelector('.popup');
const aboutLink = document.querySelector('.about');

const addNewLike = async (id) => {
  await postLikes({ item_id: id });
};

const displayPokemons = (pokemon) => {
  let likesCount = pokemon.likes;
  const li = document.createElement('li');
  li.classList.add('pokemon-list');

  const img = document.createElement('img');
  img.src = pokemon.image;
  img.alt = pokemon.name;

  const p = document.createElement('p');
  p.classList.add('pokemon-card-title');
  p.innerText = `${pokemon.name}-${pokemon.type}`;

  const actionWrapper = document.createElement('div');
  actionWrapper.className = 'btn-container';
  const likeEl = document.createElement('span');
  const hearIcon = document.createElement('span');
  hearIcon.innerHTML = '<i class="fa-regular fa-heart"></i>';
  const info = document.createElement('span');
  info.setAttribute('id', `like-${pokemon.id}`);
  info.innerText = `Likes ${likesCount > 0 ? likesCount : ''}`;
  likeEl.appendChild(hearIcon);
  likeEl.appendChild(info);
  likeEl.addEventListener('click', () => {
    likesCount += 1;
    const el = document.getElementById(`like-${pokemon.id}`);
    el.innerText = `Likes ${likesCount}`;
    addNewLike(pokemon.id);
  });

  const commentEl = document.createElement('span');
  const commentIcon = document.createElement('i');
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

const displayCommentsPopup = (pokemon) => {
  commentPopUp.innerHTML = `
  <div class="popup-window">
  <span class="close">x</span>
  <div class="comments">
  <img src=${pokemon.image}>
  </div>
  <div>
    <h1 class="popup-card-title">${pokemon.name} - ${pokemon.type}</h1>
    <p class="pokemon-moves">Potential moves: ${pokemon.moves.slice(0, 150)}</p>
    <ul class="card-info">
      <li>Pokemon height: ${pokemon.height}</li>
      <li>Pokemon weight: ${pokemon.weight}</li>
      <li>Pokemon abilities: ${pokemon.abilities}</li>
    </ul>
  </div>
  <h4>Comments <span id="comment-count"></span></h4>
  <h5 class="error"></h5>
  <ul id="comment-list">
  </ul>
  <form id=${pokemon.id}>
    <h4>Add a comment</h4>
    <div class="form-control">
      <input type="text" placeholder="Your name" id="name" class="name" />
    </div>
    <div class="form-control">
      <textarea name="comment" id="comment" cols="30" rows="10" placeholder="Your Insights"></textarea>
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
  const itemCounts = itemCounter(pokemonsContainer);
  pokemonTitle.innerText = `Pokemons (${itemCounts})`;
  pokemonLink.innerText = `Pokemons(${itemCounts})`;
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
  comments.forEach((comment) => {
    htmlList += `<li>${comment.creation_date} ${comment.username} ${comment.comment}</li>`;
  });

  commentList.innerHTML = htmlList;
  commentCount.innerHTML = commentCounter(commentList) || 0;
  return comments;
};

aboutLink.addEventListener('click', () => {
  commentPopUp.classList.add('open');
  displayAboutPopup();
});

pokemonsContainer.addEventListener('click', async (e) => {
  if (e.target.className === 'btn') {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.margin = `0px ${scrollBarWidth}px 0px 0px`;
    document.body.style.overflow = 'hidden';
    const pokemon = await getSinglePokemon(e.target.id);
    commentPopUp.classList.add('open');
    displayCommentsPopup(pokemon);
    getComments(pokemon.id);
  }
});

commentPopUp.addEventListener('click', (e) => {
  if (e.target.parentElement.className === 'close' || e.target.className === 'close') {
    commentPopUp.classList.remove('open');
    document.body.style.margin = '';
    document.body.style.overflow = '';
  }
});

// Form submission
commentPopUp.addEventListener('click', (e) => {
  const userName = document.querySelector('#name');
  const userComment = document.querySelector('#comment');
  const errorDisplay = document.querySelector('.error');
  if (e.target.id === 'postcomment') {
    if (userName.value === '' && userComment.value === '') {
      errorDisplay.textContent = 'Please provide a username and comment!';
      setTimeout(() => {
        errorDisplay.remove();
      }, 3000);
      e.preventDefault();
    } else {
      postComments(e.target.parentElement.id, userName.value, userComment.value);
      e.preventDefault();
      userName.value = '';
      userComment.value = '';
    }
  }
});

commentPopUp.addEventListener('click', (e) => {
  if (e.target.id === 'postcomment') {
    setTimeout(() => {
      getComments(e.target.parentElement.id);
    }, 1000);
  }
});
