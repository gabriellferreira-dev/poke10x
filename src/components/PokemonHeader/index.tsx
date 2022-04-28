import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../../types/pokes';
import pokemonsTypesIcons from '../../utils/pokemonsTypesIcons';

type Props = {
  pokemonData: Pokemon;
};

export default function PokemonHeader({ pokemonData }: Props) {
  const [isMobileView] = useMediaQuery(
    '(min-width: 320px) and (max-width: 768px)'
  );

  const navigate = useNavigate();

  return (
    <VStack w="100%" bg="#eee">
      {pokemonData && (
        <VStack
          pos="relative"
          backgroundImage={`url(${
            pokemonData?.sprites?.other['official-artwork']?.front_default ||
            pokemonData?.sprites.other.home.front_default ||
            pokemonData?.sprites.front_default ||
            pokemonData?.sprites.front_shiny ||
            `https://res.cloudinary.com/dqau9rdok/image/upload/v1651081043/gifs_pokemons/${pokemonData?.name}.gif`
          })`}
          bgRepeat="no-repeat"
          bgSize="300%"
          bgPosition="center"
          width="100%"
          height="400px"
        >
          <Flex
            backdropFilter="auto"
            backdropBlur="200px"
            pos="relative"
            height="100%"
            direction={isMobileView ? 'column' : 'row'}
            w="100%"
            top="0"
            padding="60px 25px"
            justifyContent={isMobileView ? 'start' : 'space-between'}
            alignItems={isMobileView ? 'flex-start' : 'center'}
          >
            <Button
              leftIcon={<ArrowBackIcon />}
              pos="absolute"
              top={isMobileView ? '10px' : '20px'}
              left={isMobileView ? '10px' : '20px'}
              variant="ghost"
              colorScheme="teal"
              size="lg"
              fontSize="3xl"
              onClick={() => navigate('/')}
            ></Button>
            <HStack gap="10px">
              {pokemonData?.types.map((data, i) => (
                <VStack key={i}>
                  <Image
                    src={pokemonsTypesIcons[data.type.name]}
                    alt={data.type.name}
                    maxW={isMobileView ? '30px' : '50px'}
                  />
                  <Heading
                    as="h6"
                    size={isMobileView ? 'sm' : 'md'}
                    fontWeight="400"
                    textTransform="uppercase"
                    color="#fff"
                  >
                    {data.type.name}
                  </Heading>
                </VStack>
              ))}
            </HStack>
            <HStack
              color="#fff"
              justifyContent="space-between"
              alignSelf={isMobileView ? 'center' : 'flex-start'}
              order={isMobileView ? -1 : 1}
              width={isMobileView ? '100%' : 'auto'}
              marginBottom={isMobileView ? '30px' : '0'}
            >
              <Heading
                as="h3"
                size={isMobileView ? 'lg' : 'xl'}
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
                marginRight="10px"
              >
                {pokemonData.name}
              </Heading>
              <Text fontSize="xl">#{pokemonData.order}</Text>
            </HStack>
          </Flex>
          <Image
            src={pokemonData?.sprites.other['official-artwork'].front_default}
            alt={pokemonData?.name}
            pos="absolute"
            w={isMobileView ? '300px' : '400px'}
            minW="300px"
            top={isMobileView ? '180px' : '100px'}
            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))"
            transition="0.15s ease-in-out"
          />
        </VStack>
      )}
    </VStack>
  );
}
