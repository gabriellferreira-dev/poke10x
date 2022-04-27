import { Box, Button, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import usePoke from '../../hooks/usePoke';
import { Result } from '../../types/pokes';
import pokemonsTypesIcons from '../../utils/pokemonsTypesIcons';

type Props = {
  pokemon: Result;
};

export const PokePreview = ({ pokemon }: Props) => {
  const { data } = usePoke(pokemon.name, pokemon.url);
  const [containerHeight, setContainerHeight] = useState(500);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (containerHeight - position >= 250) {
      setContainerHeight(containerHeight - position);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      backgroundImage={`url(${
        data?.sprites?.other['official-artwork']?.front_default ||
        data?.sprites.other.home.front_default ||
        data?.sprites.front_default ||
        data?.sprites.front_shiny ||
        `https://res.cloudinary.com/dqau9rdok/image/upload/v1651081043/gifs_pokemons/${pokemon.name}.gif`
      })`}
      bgRepeat="no-repeat"
      bgSize="300%"
      bgPosition="center"
      width="100%"
      height={containerHeight}
      transition="0.1s ease-in-out"
      position="fixed"
      zIndex={1000}
      top="0"
      overflow="hidden"
      boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
      borderRadius="0 0 20px 20px"
    >
      <HStack
        width="100%"
        padding="80px 0"
        height="100%"
        justifyContent="space-evenly"
        backdropFilter="auto"
        backdropBlur="200px"
      >
        <HStack>
          <Image
            src={
              data?.sprites?.other['official-artwork']?.front_default ||
              data?.sprites.other.home.front_default ||
              data?.sprites.front_default ||
              data?.sprites.front_shiny ||
              `https://res.cloudinary.com/dqau9rdok/image/upload/v1651081043/gifs_pokemons/${pokemon.name}.gif`
            }
            alt={pokemon.name}
            maxW={containerHeight <= 350 ? '200px' : '300px'}
            transition="0.2s ease-in-out"
          />
          <VStack>
            {data &&
              data.types.map((value, i) => (
                <Image
                  key={i}
                  src={pokemonsTypesIcons[value.type.name]}
                  alt={value.type.name}
                  width={containerHeight <= 350 ? '20px' : '40px'}
                  transition="0.2s ease-in-out"
                />
              ))}
          </VStack>
        </HStack>
        <VStack justifyContent="center">
          <Heading
            as="h1"
            size={containerHeight <= 350 ? '2xl' : '4xl'}
            transition="0.2s ease-in-out"
            fontFamily="Pokemon Solid Normal"
            letterSpacing="10px"
            marginBottom={containerHeight <= 350 ? '50px' : '100px'}
            color="rgba(124, 25, 25, 0.35)"
          >
            POKEDEX
          </Heading>
          <Heading
            as="h2"
            size={containerHeight <= 350 ? 'xl' : '2xl'}
            textTransform="uppercase"
            bg={`linear-gradient(90deg, #fafafa 0%, #121212 100%), url(${data?.sprites?.other['official-artwork']?.front_default})`}
            bgPosition="center"
            bgSize="2000%"
            filter="auto"
            bgClip="text"
            marginBottom="20px"
          >
            {data?.name}
          </Heading>
          <Link to={`/${data?.name}`}>
            <Button
              size={containerHeight <= 350 ? 'md' : 'lg'}
              colorScheme="teal"
            >
              Ver Pokemon
            </Button>
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
};
