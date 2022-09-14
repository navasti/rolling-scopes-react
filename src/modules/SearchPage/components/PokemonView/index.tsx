import { SortingSelector, Pagination, ResultsSelector } from 'modules/SearchPage/components';
import { PokemonCard } from './components/PokemonCard';
import { useGlobalData, useResources } from 'hooks';
import { RESULTS_AMOUNT } from 'appConstants';
import { useGlobalContext } from 'contexts';
import { PokemonSorting } from 'types';
import { Loader } from 'components';
import * as S from './styled';

export const PokemonView = () => {
  const { handleSorting, handleResultsAmount, nextPage, previousPage, specificPage } =
    useResources('pokemons');
  const options = Object.values(PokemonSorting);
  const { totalPageCounts } = useGlobalData();
  const { state } = useGlobalContext();

  return (
    <S.PokemonView>
      <S.SelectorsWrapper>
        <SortingSelector
          name="pokemon"
          options={options}
          onChange={handleSorting}
          value={state.sorting.pokemons}
        />
        <ResultsSelector
          options={RESULTS_AMOUNT.POKEMON}
          onClick={handleResultsAmount}
          value={state.resultsAmount.pokemons}
        />
      </S.SelectorsWrapper>
      <Pagination
        totalPageCount={totalPageCounts.pokemons}
        currentPage={state.currentPage.pokemons}
        previousPage={previousPage}
        specificPage={specificPage}
        nextPage={nextPage}
      />
      {!state.currentPageResults.pokemons.length && <S.TextCenter>No pokemons found</S.TextCenter>}
      {state.isLoading && <Loader />}
      <S.CardsWrapper visible={!state.isLoading}>
        {state.currentPageResults.pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </S.CardsWrapper>
    </S.PokemonView>
  );
};
