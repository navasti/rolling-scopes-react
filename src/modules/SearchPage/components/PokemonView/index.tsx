import { usePokemonContext, useSearchContext } from 'contexts';
import { SortingSelector, Pagination } from 'modules/SearchPage/components';
import { usePokemonData } from 'hooks/usePokemonData';
import { PokemonCard } from './components/PokemonCard';
import { fetchAndMapPokemons } from 'utils';
import { API, Limits } from 'appConstants';
import { Loader } from 'components';
import { MouseEvent } from 'react';
import * as S from './styled';
import { PokemonSorting } from 'types';

export const PokemonView = () => {
  const {
    setSorting,
    setBaseData,
    setCurrentPage,
    setAllDataResults,
    setCurrentPageResults,
    pokemonState: { allDataResults, currentPage, baseData, currentPageResults, sorting },
  } = usePokemonContext();

  const {
    totalPageCount,
    shouldFetchPagination,
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
    if (sorting === PokemonSorting.none) {
      fetchAndMapPokemons(`${API.POKEMON}${API.POKEMON_LIMIT}`).then((pokemons) => {
        const { base, mapped } = pokemons;
        if (base) {
          setBaseData(base);
          setSorting(sorting);
          setCurrentPageResults(mapped);
        }
        setCurrentPage(1);
      });
    } else {
      const sorted = sort(sorting as PokemonSorting);
      const results = sorted?.slice(0, Limits.pokemon);
      if (sorted && results) {
        setSorting(sorting as PokemonSorting);
        setCurrentPageResults(results);
        setAllDataResults(sorted);
        setCurrentPage(1);
      }
    }
  };

  const nextPage = async () => {
    if (shouldFetchPagination && baseData.next) {
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
      const index = currentPage * Limits.pokemon;
      const results = allDataResults.slice(index, index + Limits.pokemon);
      setCurrentPageResults(results);
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = async () => {
    if (shouldFetchPagination && baseData.previous) {
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
      const index = (currentPage - 1) * Limits.pokemon;
      const results = allDataResults.slice(index - Limits.pokemon, index);
      setCurrentPageResults(results);
      setCurrentPage(currentPage - 1);
    }
  };

  const specificPage = async (event: MouseEvent<HTMLButtonElement>) => {
    const page = Number(event.currentTarget.textContent);
    if (page !== NaN) {
      if (shouldFetchPagination) {
        setIsLoading(true);
        fetchAndMapPokemons(
          `${API.POKEMON}${API.POKEMON_LIMIT}&${API.getPokemonsOffset(page)}`
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
        const index = page * Limits.pokemon;
        const results = allDataResults.slice(index - Limits.pokemon, index);
        setCurrentPageResults(results);
        setCurrentPage(page);
      }
    }
  };

  return (
    <S.PokemonView>
      <Pagination
        totalPageCount={totalPageCount}
        previousPage={previousPage}
        specificPage={specificPage}
        currentPage={currentPage}
        nextPage={nextPage}
      />
      <SortingSelector name="pokemon" onChange={handleSorting} options={options} value={sorting} />
      <S.CardsWrapper>
        {isLoading ? (
          <Loader />
        ) : (
          currentPageResults.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
        )}
      </S.CardsWrapper>
    </S.PokemonView>
  );
};
