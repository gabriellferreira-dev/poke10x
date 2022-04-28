import { useQuery } from 'react-query';
import { getPokemon } from '../services/api';
import { Pokemon } from '../types/pokes';

const usePoke = (name: string, url?: string) => {
  const defaultUrl = 'https://pokeapi.co/api/v2/pokemon/';
  return useQuery<Pokemon>(name, async () =>
    getPokemon(url ? url : `${defaultUrl}${name}`)
  );
};

export default usePoke;
