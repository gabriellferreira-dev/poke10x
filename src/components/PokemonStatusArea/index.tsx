import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Pokemon } from '../../types/pokes';

type Props = {
  pokemonData: Pokemon;
};

const statsColors: Record<string, string> = {
  hp: 'blue',
  attack: 'facebook',
  defense: 'green',
  'special-attack': 'cyan',
  'special-defense': 'teal',
  speed: 'yellow',
};

export default function PokemonStatusArea({ pokemonData }: Props) {
  return (
    <Tabs variant="soft-rounded" colorScheme="green" flex="1">
      <TabList>
        <Tab>STATUS</Tab>
        <Tab>ABILITIES</Tab>
      </TabList>
      <TabPanels>
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
  );
}
