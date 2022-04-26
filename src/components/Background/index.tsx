import { Box, Image } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import usePoke from '../../hooks/usePoke';
import { getPokemon } from '../../services/api';
import { InitialPoke } from '../../types/pokes';

type Props = {
  pokemon: InitialPoke;
};

export const Background = ({ pokemon }: Props) => {
  console.log(pokemon);
  const { data } = usePoke(pokemon.name, pokemon.url);

  console.log(data);

  return (
    <Box
      backgroundImage={`url(${data?.sprites?.other['official-artwork']?.front_default})`}
      position="fixed"
      bgRepeat="no-repeat"
      bgPosition="center center"
      bgSize="cover"
      zIndex="-1"
      filter="auto"
      blur="400px"
      width="500%"
      height="100%"
      userSelect="none"
    />
  );
};
