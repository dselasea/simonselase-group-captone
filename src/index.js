import './styles.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import { getPokemons } from './modules/api.js';
import { getLikes, postLikes } from './modules/involvement.js';

const pokemonsContainer = document.getElementById('pokemons-container');

const addNewLike = async (id) => {
  // console.log('id', id);
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
  info.setAttribute('id', `like-${pokemon.id}`);
  info.innerText = `Likes ${pokemon.likes > 0 ? pokemon.likes : ''}`;
  likeEl.appendChild(hearIcon);
  likeEl.appendChild(info);
  likeEl.addEventListener('click', () => {
    const el = document.getElementById(`like-${pokemon.id}`);
    console.log('el', el);
    addNewLike(pokemon.id);
  });

  const commentEl = document.createElement('span');
  const commentIcon = document.createElement('i');
  commentIcon.classList.add('fa-regular', 'fa-comment');
  const commentBtn = document.createElement('button');
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

(async () => {
  const pokemons = await getPokemons();
  const likes = await getLikes();

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
