import { SortingSelector, Pagination, ResultsSelector } from 'modules/SearchPage/components';
import { usePokemonContext, useSearchContext } from 'contexts';
import { PokemonCard } from './components/PokemonCard';
import { usePokemonData } from 'hooks/usePokemonData';
import { API, RESULTS_AMOUNT } from 'appConstants';
import { fetchAndMapPokemons } from 'utils';
import { PokemonSorting } from 'types';
import { Loader } from 'components';
import { MouseEvent } from 'react';
import * as S from './styled';

export const PokemonView = () => {
  const {
    setSorting,
    setBaseData,
    setCurrentPage,
    setResultsAmount,
    setSearchResults,
    setCurrentPageResults,
    pokemonState: {
      sorting,
      baseData,
      currentPage,
      searchResults,
      resultsAmount,
      allDataResults,
      currentPageResults,
    },
  } = usePokemonContext();

  const {
    totalPageCount,
    shouldFetchSearch,
    sortById,
    sortByHeight,
    sortByWeight,
    sortAlphabetically,
    sortByBaseExperience,
  } = usePokemonData();

  const {
    setIsLoading,
    searchState: { isLoading },
  } = useSearchContext();

  const options = Object.values(PokemonSorting);

  const sort = (sorting: PokemonSorting) => {
    switch (sorting) {
      case PokemonSorting.alphabetical:
        return sortAlphabetically();
      case PokemonSorting.baseExperience:
        return sortByBaseExperience();
      case PokemonSorting.height:
        return sortByHeight();
      case PokemonSorting.weight:
        return sortByWeight();
      default:
        return sortById();
    }
  };

  const handleSorting = (sorting: string) => {
    if (sorting === PokemonSorting.none && !searchResults) {
      fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`).then((pokemons) => {
        pokemons.base && setBaseData(pokemons.base);
        setCurrentPageResults(pokemons.mapped);
      });
    } else {
      const sorted = sort(sorting as PokemonSorting);
      const results = sorted?.slice(0, resultsAmount);
      if (sorted && results) {
        setCurrentPageResults(results);
        setSearchResults(sorted);
      }
    }
    setSorting(sorting as PokemonSorting);
    setCurrentPage(1);
  };

  const nextPage = async () => {
    if (shouldFetchSearch && baseData.next) {
      setIsLoading(true);
      fetchAndMapPokemons(baseData.next).then((pokemons) => {
        const { base, mapped } = pokemons;
        if (base) {
          setBaseData(base);
          setCurrentPageResults(mapped);
          setCurrentPage(currentPage + 1);
        }
        setIsLoading(false);
      });
    } else {
      const index = currentPage * resultsAmount;
      const results = (searchResults || allDataResults).slice(index, index + resultsAmount);
      setCurrentPageResults(results);
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = async () => {
    if (shouldFetchSearch && baseData.previous) {
      setIsLoading(true);
      fetchAndMapPokemons(baseData.previous).then((pokemons) => {
        const { base, mapped } = pokemons;
        if (base) {
          setBaseData(base);
          setCurrentPageResults(mapped);
          setCurrentPage(currentPage - 1);
        }
        setIsLoading(false);
      });
    } else {
      const index = (currentPage - 1) * resultsAmount;
      const results = (searchResults || allDataResults).slice(index - resultsAmount, index);
      setCurrentPageResults(results);
      setCurrentPage(currentPage - 1);
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchSearch) {
        setIsLoading(true);
        fetchAndMapPokemons(
          `${API.POKEMON}?limit=${resultsAmount}&offset=${page * resultsAmount - resultsAmount}`
        ).then((pokemons) => {
          const { base, mapped } = pokemons;
          if (base) {
            setBaseData(base);
            setCurrentPageResults(mapped);
          }
          setCurrentPage(page);
          setIsLoading(false);
        });
      } else {
        const index = page * resultsAmount;
        const results = (searchResults || allDataResults).slice(index - resultsAmount, index);
        setCurrentPageResults(results);
        setCurrentPage(page);
      }
    }
  };

  const handleResultsAmount = (resultsAmount: number) => {
    setResultsAmount(resultsAmount);
    if (shouldFetchSearch) {
      setIsLoading(true);
      fetchAndMapPokemons(`${API.POKEMON}?limit=${resultsAmount}`).then((pokemons) => {
        const { base, mapped } = pokemons;
        if (base) {
          setBaseData(base);
          setCurrentPageResults(mapped);
        }
        setCurrentPage(1);
        setIsLoading(false);
      });
    } else {
      const results = (searchResults || allDataResults).slice(0, resultsAmount);
      setCurrentPageResults(results);
      setCurrentPage(1);
    }
  };

  return (
    <S.PokemonView>
      <S.SelectorsWrapper>
        <SortingSelector
          name="pokemon"
          onChange={handleSorting}
          options={options}
          value={sorting}
        />
        <ResultsSelector
          options={RESULTS_AMOUNT.POKEMON}
          onClick={handleResultsAmount}
          value={resultsAmount}
        />
      </S.SelectorsWrapper>
      <Pagination
        totalPageCount={totalPageCount}
        previousPage={previousPage}
        specificPage={specificPage}
        currentPage={currentPage}
        nextPage={nextPage}
      />
      {!currentPageResults.length && <S.TextCenter>No pokemons found</S.TextCenter>}
      {isLoading && <Loader />}
      <S.CardsWrapper visible={!isLoading}>
        {currentPageResults.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </S.CardsWrapper>
    </S.PokemonView>
  );
};
