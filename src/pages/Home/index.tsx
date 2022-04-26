import { HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getPokemons } from '../../services/api';

export default function Home() {
  const [pokeLimit, setPokeLimit] = useState<number>(10);

  const { data, refetch } = useQuery('pokemons', async () =>
    getPokemons(pokeLimit, 0)
  );

  console.log(data);

  return (
    <HStack spacing="10px" bg="#121212" width="100%" height="100vh"></HStack>
  );
}
