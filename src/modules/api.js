// eslint-disable-next-line import/prefer-default-export
export const getPokemons = async () => {
  const promises = [];

  for (let i = 1; i <= 30; i += 1) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  const data = await Promise.all(promises);
  return data.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    weight: pokemon.weight,
    height: pokemon.height,
    image: pokemon.sprites.front_default,
    type: pokemon.types?.map((t) => t.type.name).join(','),
    abilities: pokemon.abilities?.map((a) => a.ability.name).join(','),
    moves: pokemon.moves?.map((m) => m.move.name).join(','),
  }));
};