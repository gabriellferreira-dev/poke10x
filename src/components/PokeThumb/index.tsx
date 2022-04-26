import { Box, HStack, Image } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { InitialPoke } from '../../types/pokes';

type Props = {
  pokemon: InitialPoke;
  setCurrentPokemon: (value: InitialPoke) => void;
};

const PokeThumb = ({ pokemon, setCurrentPokemon }: Props) => {
  return (
    <Box
      onClick={() => setCurrentPokemon(pokemon)}
      flex="1 0 21%"
      justifyContent="center"
      padding="25px 0"
      display="flex"
      _hover={{
        bg: 'rgba(250, 250, 250, 0.1)',
      }}
    >
      <Image
        src={`https://res.cloudinary.com/dqau9rdok/image/upload/v1650927255/pokes/${pokemon.name}.gif`}
        alt={pokemon.name}
      />
    </Box>
  );
};

export default PokeThumb;
