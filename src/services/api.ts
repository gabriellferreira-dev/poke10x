import axios from 'axios';
import { Ability } from '../types/abilities';
import { Specie } from '../types/species';

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

export const getAbility = async (url: string) => {
  const response = await axios.get<Ability>(url);
  return response.data;
};

export const getVarieties = async (pokemon: string) => {
  const response = await axios.get<Specie>(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`
  );
  return response.data.varieties;
};
