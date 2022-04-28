import { Button, HStack, VStack } from '@chakra-ui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Background } from '../../components/Background';
import { PokePreview } from '../../components/PokePreview';
import PokeThumb from '../../components/PokeThumb';
import { getPokemons } from '../../services/api';
import { PokemonsResponse, Result } from '../../types/pokes';

export default function Home() {
  const [currentPokemon, setCurrentPokemon] = useState<Result | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PokemonsResponse>(['pokemons'], getPokemons, {
      getNextPageParam: (lastPage) => lastPage.next,
    });

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      })
    );
    const el = loadMoreButtonRef && loadMoreButtonRef.current;
    if (!el) {
      return;
    }
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [loadMoreButtonRef.current, hasNextPage]);

  return (
    <VStack width="100%">
      {data && (
        <PokePreview
          pokemon={currentPokemon ? currentPokemon : data.pages[0].results[0]}
        />
      )}
      <HStack
        wrap="wrap"
        width="100%"
        justifyContent="space-between"
        bgColor="rgba(250, 250, 250, 0.1)"
        marginTop="500px !important"
      >
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.results.map((pokemon, i) => (
              <PokeThumb
                key={i}
                pokemon={pokemon}
                setCurrentPokemon={setCurrentPokemon}
              />
            ))}
          </Fragment>
        ))}
      </HStack>
      <Button
        ref={loadMoreButtonRef}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Carregando mais...'
          : hasNextPage
          ? 'Carregar mais'
          : 'Não há mais pokemons para carregar!'}
      </Button>
      {data && (
        <Background
          pokemon={currentPokemon ? currentPokemon : data.pages[0].results[0]}
        />
      )}
    </VStack>
  );
}
