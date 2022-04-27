import axios from 'axios';

export const getPokemons = async ({
  pageParam = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10',
}) => {
  const response = await axios.get(pageParam);
  return response.data;
};

export const getPokemon = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
