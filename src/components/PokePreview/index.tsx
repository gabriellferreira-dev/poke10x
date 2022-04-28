import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
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

  const [isMobileView] = useMediaQuery(
    '(min-width: 320px) and (max-width: 768px)'
  );

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position >= 150) {
      setContainerHeight(350);
    } else {
      setContainerHeight(500);
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
      <Flex
        direction={isMobileView ? 'column' : 'row'}
        width="100%"
        padding="80px 0"
        height="100%"
        justifyContent="space-evenly"
        backdropFilter="auto"
        backdropBlur="200px"
      >
        <HStack justifyContent="center">
          <Skeleton
            isLoaded={!!data}
            w={
              isMobileView
                ? containerHeight <= 350
                  ? '190px'
                  : '250px'
                : containerHeight <= 350
                ? '200px'
                : '300px'
            }
            h={
              isMobileView
                ? containerHeight <= 350
                  ? '190px'
                  : '250px'
                : containerHeight <= 350
                ? '200px'
                : '300px'
            }
            startColor="#ffffff3b"
            endColor="#560b0ba0"
          >
            <Image
              src={
                data?.sprites?.other['official-artwork']?.front_default ||
                data?.sprites.other.home.front_default ||
                data?.sprites.front_default ||
                data?.sprites.front_shiny ||
                `https://res.cloudinary.com/dqau9rdok/image/upload/v1651081043/gifs_pokemons/${pokemon.name}.gif`
              }
              alt={pokemon.name}
              maxW={
                isMobileView
                  ? containerHeight <= 350
                    ? '190px'
                    : '250px'
                  : containerHeight <= 350
                  ? '200px'
                  : '300px'
              }
              transition="0.2s ease-in-out"
            />
          </Skeleton>
          <VStack>
            {!data && (
              <>
                <Skeleton
                  height="40px"
                  w="40px"
                  startColor="#ffffff3b"
                  endColor="#560b0ba0"
                />
                <Skeleton
                  height="40px"
                  w="40px"
                  startColor="#ffffff3b"
                  endColor="#560b0ba0"
                />
                <Skeleton
                  height="40px"
                  w="40px"
                  startColor="#ffffff3b"
                  endColor="#560b0ba0"
                />
              </>
            )}
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
          <Skeleton
            isLoaded={!!data}
            startColor="#ffffff3b"
            endColor="#560b0ba0"
            marginBottom={containerHeight <= 350 ? '50px' : '100px'}
            position={isMobileView ? 'absolute' : 'relative'}
            top="30px"
            display={isMobileView ? 'none' : 'block'}
          >
            <Heading
              as="h1"
              size={containerHeight <= 350 ? '2xl' : '4xl'}
              transition="0.2s ease-in-out"
              fontFamily="Pokemon Solid Normal"
              letterSpacing="10px"
              color="rgba(124, 25, 25, 0.35)"
            >
              POKE10X
            </Heading>
          </Skeleton>
          <Skeleton
            isLoaded={!!data}
            startColor="#ffffff3b"
            endColor="#560b0ba0"
            minW="300px"
            minH="40px"
            textAlign="center"
          >
            <Heading
              as="h2"
              size={containerHeight <= 350 ? 'xl' : '2xl'}
              textTransform="uppercase"
              color="#fff"
              marginBottom={isMobileView ? '10px' : '20px'}
            >
              {data?.name}
            </Heading>
          </Skeleton>
          <Skeleton
            isLoaded={!!data}
            startColor="#ffffff3b"
            endColor="#560b0ba0"
          >
            <Link to={`/${data?.name}`}>
              <Button
                size={containerHeight <= 350 ? 'md' : 'lg'}
                colorScheme="teal"
              >
                Ver Pokemon
              </Button>
            </Link>
          </Skeleton>
        </VStack>
      </Flex>
    </Box>
  );
};
