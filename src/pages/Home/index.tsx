import { HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Background } from '../../components/Background';
import PokeThumb from '../../components/PokeThumb';
import { getPokemons } from '../../services/api';
import { InitialPoke } from '../../types/pokes';

export default function Home() {
  const [pokeLimit, setPokeLimit] = useState<number>(10);
  const [currentPokemon, setCurrentPokemon] = useState<InitialPoke | null>(
    null
  );

  const { data: pokemons, refetch } = useQuery<InitialPoke[]>(
    'pokemons',
    async () => getPokemons(pokeLimit, 0)
  );

  return (
    <VStack spacing="10px" width="100%" height="100vh">
      {pokemons && (
        <Background pokemon={currentPokemon ? currentPokemon : pokemons[0]} />
      )}
      <HStack
        wrap="wrap"
        width="100%"
        justifyContent="space-between"
        bgColor="rgba(250, 250, 250, 0.3)"
      >
        {pokemons?.map((pokemon, i) => (
          <PokeThumb
            key={i}
            pokemon={pokemon}
            setCurrentPokemon={setCurrentPokemon}
          />
        ))}
      </HStack>
    </VStack>
  );
}
