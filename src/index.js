import './styles.css';
import './modules/involvement.js';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import { getPokemons } from './modules/api.js';
import { postLikes, postComment, getLikes, getComment } from './modules/involvement.js';

const pokemonsContainer = document.getElementById('pokemons-container');
const commentPopUp = document.querySelector('.popup');

const displayPokemons = (pokemon) => {
  const li = document.createElement('li');
  li.classList.add('pokemon-list');
  const html = `
    <div>
      <img class="pokemon-img" src=${pokemon.image} alt=${pokemon.name} />
      <p>${pokemon.name} - ${pokemon.type}</p>
      
      <p>
        <i class="fa-regular fa-heart"></i> Likes ${5}
      </p>
      <p>
        <i class="fa-regular fa-comment"></i>
        <button id=${pokemon.id} class='btn'>Comments</button>
      </p>
    </div>
  `;

  li.innerHTML = html;
  pokemonsContainer.appendChild(li);
};

const displayCommentsPopup = (item_id) => {
  commentPopUp.innerHTML = `
  <div class="popup-window">
  <span id="close">X</span>
  <div class="comments">
    <h4>Comments <span>9</span></h4>
    <p><span>03/11/2021</span> I'd love to buy it!</p>
  </div>
  <form id=${item_id}>
    <h4>Add a comment</h4>
    <div class="form-control">
      <input type="text" placeholder="Your name" id="name" class="name" />
    </div>
    <div class="form-control">
      <textarea name="comment" id="comment" cols="30" rows="10">Your Insights</textarea>
    </div>
    <input type="submit" value="Comment" id="submit" class="btn"/>
  </form>
</div>
  `
}

(async () => {
  const pokemons = await getPokemons();
  pokemonsContainer.innerHTML = '';
  pokemons.forEach((pokemon) => displayPokemons(pokemon));
})();

const postComments = async (item_id, username, comment) => {
  const comments = await postComment({"item_id": item_id, "username" : username, "comment": comment});
  return comments;
}

const getComments = async (itemId) => {
  const comments = await getComment(itemId);
  comments.forEach((comment) => {
    console.log(comment.comment);
  })
  return comments;
}

pokemonsContainer.addEventListener('click', (e) => {
  if(e.target.className === 'btn'){
    commentPopUp.classList.add('open');
    displayCommentsPopup(e.target.id);
    getComments(e.target.id);
  }
})

commentPopUp.addEventListener('click', (e) => {
  if(e.target.id === 'close') {
    commentPopUp.classList.remove('open');
  }
})

// Form submission
commentPopUp.addEventListener('click', (e) => {
  const userName = document.querySelector('#name');
  const userComment = document.querySelector('#comment');
  if(e.target.id === 'submit') {
    postComments(e.target.parentElement.id, userName.value, userComment.value);
    e.preventDefault();
  }
})





