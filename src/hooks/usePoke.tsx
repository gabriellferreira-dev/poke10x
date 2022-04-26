import { useQuery } from 'react-query';
import { getPokemon } from '../services/api';

const usePoke = (name: string, url: string) => {
  return useQuery(name, async () => getPokemon(url));
};

export default usePoke;
