import { Flex, useMediaQuery, VStack } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import usePoke from '../../hooks/usePoke';
import { getVarieties } from '../../services/api';
import { Variety } from '../../types/species';
import PokemonHeader from '../../components/PokemonHeader';
import PokemonStatusArea from '../../components/PokemonStatusArea';
import PokemonVariants from '../../components/PokemonVariants';
import PokemonDetailsArea from '../../components/PokemonDetailsArea';

export default function PokemonPage() {
  const { pokemon } = useParams();

  const [isMobileView] = useMediaQuery(
    '(min-width: 320px) and (max-width: 768px)'
  );

  const { data: pokemonData } = usePoke(pokemon as string);
  const { data: varieties } = useQuery<Variety[]>(
    ['varieties', pokemon],
    async () => getVarieties(pokemonData?.species.name as string),
    { enabled: !!pokemonData }
  );

  return (
    <VStack w="100%" h="100%" bg="#cacaca">
      {pokemonData && <PokemonHeader pokemonData={pokemonData} />}
      <Flex
        padding="10px"
        direction={isMobileView ? 'column' : 'row'}
        width="100%"
        justifyContent="space-between"
        paddingTop={isMobileView ? '80px' : '0'}
      >
        {pokemonData && <PokemonStatusArea pokemonData={pokemonData} />}
        {pokemon && varieties && (
          <PokemonVariants actualPokemon={pokemon} varieties={varieties} />
        )}
        {pokemonData && <PokemonDetailsArea pokemonData={pokemonData} />}
      </Flex>
    </VStack>
  );
}
