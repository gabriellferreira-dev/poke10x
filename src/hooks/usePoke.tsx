import { useQuery } from 'react-query';
import { getPokemon } from '../services/api';
import { Pokemon } from '../types/pokes';

const usePoke = (name: string, url: string) => {
  return useQuery<Pokemon>(name, async () => getPokemon(url));
};

export default usePoke;
