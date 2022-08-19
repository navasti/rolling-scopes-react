import { MoveCardDetails, NoDataMessage, PokemonCardDetails, TypeCardDetails } from './components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearchContext } from 'contexts';
import { Loader } from 'components';
import { Layout } from 'modules';
import * as S from './styled';
import {
  AvailableCardDetails,
  PokemonTypeDetails,
  PokemonMoveDetails,
  PokemonDetails,
  CardDetails,
} from 'types';

type Props = {
  componentName: string;
  location: string;
};

export const Details = ({ componentName, location }: Props) => {
  const [details, setDetails] = useState<null | {
    data: CardDetails;
    type: AvailableCardDetails;
  }>(null);

  const { searchState } = useSearchContext();
  const { id, cardType } = useParams();

  useEffect(() => {
    if (id && cardType === AvailableCardDetails.pokemon) {
      const data = searchState.pokemons.find((pokemon) => pokemon.id === Number(id));
      data && setDetails({ data, type: AvailableCardDetails.pokemon });
    }
    if (id && cardType === AvailableCardDetails.move) {
      const data = searchState.moves.find((move) => move.id === Number(id));
      data && setDetails({ data, type: AvailableCardDetails.move });
    }
    if (id && cardType === AvailableCardDetails.type) {
      const data = searchState.types.find((type) => type.id === Number(id));
      data && setDetails({ data, type: AvailableCardDetails.type });
    }
  }, [id, cardType, searchState]);

  const renderCardDetails = () => {
    if (details?.type === AvailableCardDetails.pokemon) {
      return <PokemonCardDetails pokemon={details.data as PokemonDetails} />;
    }
    if (details?.type === AvailableCardDetails.move) {
      return <MoveCardDetails move={details.data as PokemonMoveDetails} />;
    }
    if (details?.type === AvailableCardDetails.type) {
      return <TypeCardDetails type={details.data as PokemonTypeDetails} />;
    }
  };

  return (
    <Layout location={location} componentName={componentName}>
      <S.DetailsView>
        {searchState.isLoading ? (
          <Loader />
        ) : (
          <>
            {(!id || !cardType) && (
              <NoDataMessage fetchButton={false} returnButton>
                <S.DetailsInformation>
                  No enugh information provided. Get back to the search page in order to fetch data
                  and select specific pokemon to see its details.
                </S.DetailsInformation>
              </NoDataMessage>
            )}

            {id && cardType && !details && (
              <NoDataMessage fetchButton returnButton>
                <S.DetailsInformation>
                  Could not found detailed data for {cardType} with id {id}
                </S.DetailsInformation>
              </NoDataMessage>
            )}

            {id && cardType && details && renderCardDetails()}
          </>
        )}
      </S.DetailsView>
    </Layout>
  );
};
