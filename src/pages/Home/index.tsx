import { Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Background } from '../../components/Background';
import { PokePreview } from '../../components/PokePreview';
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
    <VStack width="100%">
      {pokemons && (
        <PokePreview pokemon={currentPokemon ? currentPokemon : pokemons[0]} />
      )}
      <HStack
        wrap="wrap"
        width="100%"
        // height="100%"
        justifyContent="space-between"
        bgColor="rgba(250, 250, 250, 0.1)"
        marginTop="500px !important"
        // overflowY="auto"
      >
        {pokemons?.map((pokemon, i) => (
          <PokeThumb
            key={i}
            pokemon={pokemon}
            setCurrentPokemon={setCurrentPokemon}
          />
        ))}
      </HStack>
      {pokemons && (
        <Background pokemon={currentPokemon ? currentPokemon : pokemons[0]} />
      )}
    </VStack>
  );
}
