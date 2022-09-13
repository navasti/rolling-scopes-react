import { SortingSelector, Pagination, ResultsSelector } from 'modules/SearchPage/components';
import { useGlobalContext } from 'contexts/globalContext';
import { fetchAndMapPokemons, sortPokemon } from 'utils';
import { PokemonCard } from './components/PokemonCard';
import { API, RESULTS_AMOUNT } from 'appConstants';
import { PokemonSorting } from 'types';
import { useGlobalData } from 'hooks';
import { Loader } from 'components';
import { MouseEvent } from 'react';
import * as S from './styled';

// !todo add loader

export const PokemonView = () => {
  const { totalPageCounts, shouldFetchSearch } = useGlobalData();
  const options = Object.values(PokemonSorting);

  const {
    setAllData,
    state: {
      allDataResults,
      currentPageResults,
      searchResults,
      isLoading,
      resultsAmount,
      currentPage,
      baseData,
      sorting,
    },
  } = useGlobalContext();

  const sort = (sorting: PokemonSorting) => {
    const results = searchResults.pokemons?.length
      ? searchResults.pokemons
      : allDataResults.pokemons;
    switch (sorting) {
      case PokemonSorting.alphabetical:
        return sortPokemon(results).alphabetical();
      case PokemonSorting.baseExperience:
        return sortPokemon(results).byBaseExperience();
      case PokemonSorting.height:
        return sortPokemon(results).byHeight();
      case PokemonSorting.weight:
        return sortPokemon(results).byWeight();
      default:
        return sortPokemon(results).byId();
    }
  };

  const handleSorting = async (sorting: string) => {
    if (sorting === PokemonSorting.none && !searchResults.pokemons) {
      const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount.pokemons}`);
      setAllData({
        sorting: { pokemons: sorting },
        currentPokemons: data.mapped,
        currentPage: { pokemons: 1 },
        basePokemons: data.base,
      });
    } else {
      const sorted = sort(sorting as PokemonSorting);
      const currentPokemons = sorted?.slice(0, resultsAmount.pokemons);
      setAllData({
        sorting: { pokemons: sorting as PokemonSorting },
        searchResults: { pokemons: sorted },
        currentPage: { pokemons: 1 },
        currentPokemons,
      });
    }
  };

  const nextPage = async () => {
    if (shouldFetchSearch.pokemons && baseData.pokemons?.next) {
      const data = await fetchAndMapPokemons(baseData.pokemons.next);
      setAllData({
        basePokemons: data.base,
        currentPokemons: data.mapped,
        currentPage: {
          pokemons: currentPage.pokemons + 1,
        },
      });
    } else {
      const index = currentPage.pokemons * resultsAmount.pokemons;
      const results = searchResults.pokemons?.length
        ? searchResults.pokemons
        : allDataResults.pokemons;
      const currentPokemons = results.slice(index, index + resultsAmount.pokemons);
      setAllData({
        currentPokemons,
        currentPage: {
          pokemons: currentPage.pokemons + 1,
        },
      });
    }
  };

  const previousPage = async () => {
    if (shouldFetchSearch.pokemons && baseData.pokemons?.previous) {
      const data = await fetchAndMapPokemons(baseData.pokemons.previous);
      setAllData({
        basePokemons: data.base,
        currentPokemons: data.mapped,
        currentPage: {
          pokemons: currentPage.pokemons - 1,
        },
      });
    } else {
      const index = (currentPage.pokemons - 1) * resultsAmount.pokemons;
      const currentPokemons = (searchResults.pokemons || allDataResults.pokemons).slice(
        index - resultsAmount.pokemons,
        index
      );
      setAllData({
        currentPokemons,
        currentPage: {
          pokemons: currentPage.pokemons - 1,
        },
      });
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchSearch.pokemons) {
        const data = await fetchAndMapPokemons(
          `${API.POKEMON}?limit=${resultsAmount}&offset=${
            page * resultsAmount.pokemons - resultsAmount.pokemons
          }`
        );
        setAllData({
          basePokemons: data.base,
          currentPokemons: data.mapped,
          currentPage: {
            pokemons: page,
          },
        });
      } else {
        const index = page * resultsAmount.pokemons;
        const currentPokemons = (searchResults.pokemons || allDataResults.pokemons).slice(
          index - resultsAmount.pokemons,
          index
        );
        setAllData({
          currentPokemons,
          currentPage: {
            pokemons: page,
          },
        });
      }
    }
  };

  const handleResultsAmount = async (resultsAmount: number) => {
    if (shouldFetchSearch.pokemons) {
      const data = await fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`);
      setAllData({
        basePokemons: data.base,
        currentPokemons: data.mapped,
        resultsAmount: {
          pokemons: resultsAmount,
        },
        currentPage: {
          pokemons: 1,
        },
      });
    } else {
      const results = searchResults.pokemons?.length
        ? searchResults.pokemons
        : allDataResults.pokemons;
      const currentPokemons = results.slice(0, resultsAmount);
      setAllData({
        currentPokemons,
        resultsAmount: {
          pokemons: resultsAmount,
        },
        currentPage: {
          pokemons: 1,
        },
      });
    }
  };

  return (
    <S.PokemonView>
      <S.SelectorsWrapper>
        <SortingSelector
          name="pokemon"
          options={options}
          onChange={handleSorting}
          value={sorting.pokemons}
        />
        <ResultsSelector
          options={RESULTS_AMOUNT.POKEMON}
          onClick={handleResultsAmount}
          value={resultsAmount.pokemons}
        />
      </S.SelectorsWrapper>
      <Pagination
        totalPageCount={totalPageCounts.pokemons}
        currentPage={currentPage.pokemons}
        previousPage={previousPage}
        specificPage={specificPage}
        nextPage={nextPage}
      />
      {!currentPageResults.pokemons.length && <S.TextCenter>No pokemons found</S.TextCenter>}
      {isLoading && <Loader />}
      <S.CardsWrapper visible={!isLoading}>
        {currentPageResults.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </S.CardsWrapper>
    </S.PokemonView>
  );
};
