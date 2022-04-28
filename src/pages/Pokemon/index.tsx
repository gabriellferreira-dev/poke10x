import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import getColors from 'get-image-colors';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import usePoke from '../../hooks/usePoke';
import { getPokemon, getVarieties } from '../../services/api';
import { Pokemon } from '../../types/pokes';
import { Variety } from '../../types/species';
import pokemonsTypesIcons from '../../utils/pokemonsTypesIcons';
import { ArrowBackIcon } from '@chakra-ui/icons';

const statsColors: Record<string, string> = {
  hp: 'blue',
  attack: 'facebook',
  defense: 'green',
  'special-attack': 'cyan',
  'special-defense': 'teal',
  speed: 'yellow',
};

export default function PokemonPage() {
  const { pokemon } = useParams();
  const [tabIndex, setTabIndex] = useState<number | null>(null);
  const [pokemonsVariants, setPokemonsVariants] = useState<Pokemon[] | null>(
    null
  );

  const { data: pokemonData } = usePoke(pokemon as string);
  const { data: varieties } = useQuery<Variety[]>(
    ['varieties', pokemon],
    async () => getVarieties(pokemonData?.species.name as string),
    { enabled: !!pokemonData }
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

  const navigate = useNavigate();

  useEffect(() => {
    getVarietiesPokemons();
  }, [varieties]);

  return (
    <VStack
      w="100%"
      h="100vh"
      bg="#cacaca"
      // padding="30px 300px"
    >
      <VStack
        // maxW="400px"
        w="100%"
        // flex="1"
        // h="100%"
        bg="#eee"
        // borderRadius="20px"
      >
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
            <HStack
              backdropFilter="auto"
              backdropBlur="200px"
              pos="relative"
              height="100%"
              w="100%"
              top="0"
              padding="30px"
              justifyContent="space-between"
            >
              <Button
                leftIcon={<ArrowBackIcon />}
                pos="absolute"
                top="20px"
                left="20px"
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
                      maxW="50px"
                    />
                    <Heading
                      as="h6"
                      size="md"
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
                alignSelf="flex-start"
              >
                <Heading
                  as="h3"
                  size="xl"
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
            </HStack>
            <Image
              src={pokemonData?.sprites.other['official-artwork'].front_default}
              alt={pokemonData?.name}
              pos="absolute"
              w="400px"
              minW="300px"
              top="100px"
              filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))"
              transition="0.15s ease-in-out"
            />
          </VStack>
        )}
      </VStack>
      <HStack padding="10px" width="100%" justifyContent="space-between">
        <Tabs variant="soft-rounded" colorScheme="green" flex="1">
          <TabList>
            <Tab>STATUS</Tab>
            <Tab>ABILITIES</Tab>
          </TabList>
          <TabPanels>
            {/* initially mounted */}
            <TabPanel>
              <VStack
                w="100%"
                flexWrap="wrap"
                bg="rgba(0, 0, 0, 0.1)"
                padding="10px"
                borderRadius="10px"
                gap="10px"
              >
                {pokemonData?.stats.map((data, i) => (
                  <VStack key={i} w="100%">
                    <HStack justifyContent="space-between" w="100%">
                      <Text
                        fontWeight="500"
                        fontSize="sm"
                        textTransform="uppercase"
                      >
                        {data.stat.name}
                      </Text>
                      <Text fontSize="sm" fontWeight="300">
                        {data.base_stat}
                      </Text>
                    </HStack>
                    <Progress
                      hasStripe
                      w="100%"
                      value={data.base_stat * 0.5}
                      colorScheme={statsColors[data.stat.name]}
                      transition="all 0.2"
                    />
                  </VStack>
                ))}
              </VStack>
            </TabPanel>
            {/* initially not mounted */}
            <TabPanel>
              <Accordion>
                {pokemonData?.abilities.map((value, i) => (
                  <AccordionItem key={i}>
                    <h2>
                      <AccordionButton bg="ButtonShadow" color="#FFF">
                        <Box flex="1" textAlign="left">
                          {value.is_hidden
                            ? 'Hidden Ability'
                            : i === 0
                            ? 'First Ability'
                            : 'Second Ability'}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} textTransform="capitalize">
                      {value.ability.name}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <HStack flex="1" justifyContent="space-evenly">
          {pokemonsVariants &&
            pokemonsVariants.map((pokemonVariant, i) => (
              <Button
                key={i}
                maxW="130px"
                height="fit-content"
                colorScheme="teal"
                bg={pokemon === pokemonVariant.name ? 'Highlight' : 'none'}
                variant="outline"
                onClick={() => navigate(`/${pokemonVariant.name}`)}
              >
                <Image
                  src={
                    pokemonVariant.sprites.other['official-artwork']
                      .front_default
                  }
                />
              </Button>
            ))}
        </HStack>
        <Tabs variant="soft-rounded" colorScheme="green" flex="1" height="100%">
          <TabList>
            <Tab>SPRITES</Tab>
            <Tab>DETAILS</Tab>
          </TabList>
          <TabPanels>
            {/* initially mounted */}
            <TabPanel>
              <HStack
                w="100%"
                flexWrap="wrap"
                bg="rgba(0, 0, 0, 0.1)"
                padding="10px"
                borderRadius="10px"
                gap="10px"
                justifyContent="space-evenly"
              >
                {pokemonData?.sprites.front_default && (
                  <VStack flexBasis="40%">
                    <Image src={pokemonData?.sprites.front_default} />
                    <Text>Front Default</Text>
                  </VStack>
                )}
                {pokemonData?.sprites.back_default && (
                  <VStack flexBasis="40%">
                    <Image src={pokemonData?.sprites.back_default} />
                    <Text>Back Default</Text>
                  </VStack>
                )}
                {pokemonData?.sprites.front_shiny && (
                  <VStack flexBasis="40%">
                    <Image src={pokemonData?.sprites.front_shiny} />
                    <Text>Front Shiny</Text>
                  </VStack>
                )}
                {pokemonData?.sprites.back_shiny && (
                  <VStack flexBasis="40%">
                    <Image src={pokemonData?.sprites.back_shiny} />
                    <Text>Back Shiny</Text>
                  </VStack>
                )}
              </HStack>
            </TabPanel>
            {/* initially not mounted */}
            <TabPanel>
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg="ButtonShadow" color="#FFF">
                      <Box flex="1" textAlign="left">
                        Weight
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} textTransform="capitalize">
                    {pokemonData?.weight}
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg="ButtonShadow" color="#FFF">
                      <Box flex="1" textAlign="left">
                        Height
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} textTransform="capitalize">
                    {pokemonData?.height}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </VStack>
  );
}
