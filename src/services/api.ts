import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const client = axios.create({
  baseURL: BASE_URL,
});

export const getPokemons = async (limit: number, offset: number) => {
  const response = await client.get(`?limit=${limit}&offset=${offset}`);
  return response.data.results;
};

export const getPokemon = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
