import { Button, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPokemon } from '../../services/api';
import { Pokemon } from '../../types/pokes';
import { Variety } from '../../types/species';

type Props = {
  varieties: Variety[];
  actualPokemon: string;
};

export default function PokemonVariants({ varieties, actualPokemon }: Props) {
  const [pokemonsVariants, setPokemonsVariants] = useState<Pokemon[] | null>(
    null
  );

  const navigate = useNavigate();

  const [isMobileView] = useMediaQuery(
    '(min-width: 320px) and (max-width: 768px)'
  );

  const [greaterThan768LessThan1000] = useMediaQuery(
    '(min-width: 768px) and (max-width: 1000px)'
  );

  const getVarietiesPokemons = async () => {
    if (varieties) {
      const promise = varieties?.map(async (value) => {
        const result = await getPokemon(value.pokemon.url);
        return result;
      });

      const data = await Promise.all(promise);

      setPokemonsVariants(data);
    }
  };

  useEffect(() => {
    getVarietiesPokemons();
  }, [varieties]);

  return (
    <Flex
      flex="1"
      direction={greaterThan768LessThan1000 ? 'column' : 'row'}
      alignItems="center"
      justifyContent={greaterThan768LessThan1000 ? 'center' : 'space-evenly'}
      gap="10px"
      order={isMobileView ? -1 : 0}
      marginBottom={greaterThan768LessThan1000 ? '0' : '30px'}
    >
      {pokemonsVariants &&
        pokemonsVariants.map((pokemonVariant, i) => (
          <Button
            key={i}
            maxW={greaterThan768LessThan1000 ? '90px' : '130px'}
            height="fit-content"
            colorScheme="teal"
            bg={actualPokemon === pokemonVariant.name ? 'Highlight' : 'none'}
            variant="outline"
            onClick={() => navigate(`/${pokemonVariant.name}`)}
          >
            <Image
              src={
                pokemonVariant.sprites.other['official-artwork'].front_default
              }
            />
          </Button>
        ))}
    </Flex>
  );
}
