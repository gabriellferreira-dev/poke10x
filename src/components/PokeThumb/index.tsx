import { Box, Image } from '@chakra-ui/react';
import { Result } from '../../types/pokes';

type Props = {
  pokemon: Result;
  setCurrentPokemon: (value: Result) => void;
};

const PokeThumb = ({ pokemon, setCurrentPokemon }: Props) => {
  return (
    <Box
      onClick={() => setCurrentPokemon(pokemon)}
      flex="1 0 31%"
      justifyContent="center"
      padding="25px 0"
      display="flex"
      _hover={{
        bg: 'rgba(250, 250, 250, 0.3)',
      }}
    >
      <Image
        src={`https://res.cloudinary.com/dqau9rdok/image/upload/v1651081043/gifs_pokemons/${pokemon.name}.gif`}
        alt={pokemon.name}
        maxW="100px"
      />
    </Box>
  );
};

export default PokeThumb;
