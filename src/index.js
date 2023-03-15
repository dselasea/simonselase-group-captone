import './styles.css';
import './modules/involvement.js';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import { getPokemons } from './modules/api.js';

const pokemonsContainer = document.getElementById('pokemons-container');

const displayPokemons = (pokemon) => {
  const li = document.createElement('li');
  li.classList.add('pokemon-list');
  const html = `
    <div>
      <img class="pokemon-img" src=${pokemon.image} alt=${pokemon.name} />
      <p>${pokemon.name} - ${pokemon.type}</p>
<<<<<<< HEAD
      
=======
      <p>
        <i class="fa-regular fa-heart"></i> Likes ${5}
      </p>
      <p>
        <i class="fa-regular fa-comment"></i>
        <button>Comments</button>
      </p>


>>>>>>> ff5c9f82e280febfe2470061507622d26aeff681
    </div>
  `;

  li.innerHTML = html;
  pokemonsContainer.appendChild(li);
};

(async () => {
  const pokemons = await getPokemons();
  pokemonsContainer.innerHTML = '';
  pokemons.forEach((pokemon) => displayPokemons(pokemon));
})();
