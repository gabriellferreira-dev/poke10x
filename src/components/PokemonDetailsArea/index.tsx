import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Image,
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

export default function PokemonDetailsArea({ pokemonData }: Props) {
  return (
    <Tabs variant="soft-rounded" colorScheme="green" flex="1" height="100%">
      <TabList>
        <Tab>SPRITES</Tab>
        <Tab>DETAILS</Tab>
      </TabList>
      <TabPanels>
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
  );
}
