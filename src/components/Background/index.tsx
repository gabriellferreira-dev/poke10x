import { Box } from '@chakra-ui/react';
import usePoke from '../../hooks/usePoke';
import { Result } from '../../types/pokes';

type Props = {
  pokemon: Result;
};

export const Background = ({ pokemon }: Props) => {
  const { data } = usePoke(pokemon.name, pokemon.url);

  return (
    <Box
      backgroundImage={`url(${
        data?.sprites?.other['official-artwork']?.front_default ||
        data?.sprites.other.home.front_default ||
        data?.sprites.front_default ||
        data?.sprites.front_shiny ||
        `https://res.cloudinary.com/dqau9rdok/image/upload/v1651081043/gifs_pokemons/${pokemon.name}.gif`
      })`}
      position="fixed"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="200%"
      zIndex="-1"
      filter="auto"
      blur="400px"
      width="500%"
      height="100%"
      userSelect="none"
    />
  );
};
