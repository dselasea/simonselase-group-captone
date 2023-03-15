import { getPokemons } from './modules/api.js';
import './styles.css';

const pokemonsContainer = document.getElementById('pokemons-container');
console.log(pokemonsContainer);
const displayPokemons = (pokemon) => {
  const li = document.createElement('li');
  li.classList.add('pokemon-list');
  const html = `
    <div>
      <img class="pokemon-img" src=${pokemon.image} alt=${pokemon.name} />
      <p>${pokemon.name} - ${pokemon.type}</p>
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
