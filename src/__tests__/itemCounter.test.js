/**
 * @jest-environment jsdom
 */

import itemCounter from '../modules/itemCounter.js';

describe('Pokemon counter', () => {
  test('It should returns the number of child elements in #pokemons-container', () => {
    document.body.innerHTML = `
      <ul id="pokemons-container">
        <li>Pokemon 1</li>
        <li>Pokemon 2</li>
        <li>Pokemon 3</li>
      </ul>
    `;
    const pokemonContainer = document.getElementById('pokemons-container');
    const count = itemCounter(pokemonContainer);
    expect(count).not.toBeNull();
    expect(count).not.toBeUndefined();
    expect(count).not.toBeFalsy();
    expect(count).not.toBeGreaterThan(3);
    expect(count).not.toBeLessThan(3);
    expect(count).toBe(3);
    expect(count).toEqual(3);
  });

  test('It should returns 0 element in #pokemons-container', () => {
    document.body.innerHTML = '<ul id="pokemons-container"></ul>';

    const pokemonContainer = document.getElementById('pokemons-container');
    const count = itemCounter(pokemonContainer);
    expect(count).toBe(0);
    expect(count).toEqual(0);
  });
});
