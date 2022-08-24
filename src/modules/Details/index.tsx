import { MoveCardDetails, NoDataMessage, PokemonCardDetails, TypeCardDetails } from './components';
import { useParams } from 'react-router-dom';
import { AvailableCardDetails } from 'types';
import { useEffect, useState } from 'react';
import { useMemoizedData } from 'hooks';
import { Layout } from 'modules';
import * as S from './styled';

type Props = {
  componentName: string;
  location: string;
};

export const Details = ({ componentName, location }: Props) => {
  const [dataType, setDataType] = useState<AvailableCardDetails>();

  const { id, cardType } = useParams();
  const { pokemonMatchingId, moveMatchingId, typeMatchingId, isDataFound } = useMemoizedData(
    Number(id)
  );

  useEffect(() => {
    const { move, pokemon, type } = AvailableCardDetails;
    if (id && cardType === pokemon) setDataType(pokemon);
    if (id && cardType === move) setDataType(move);
    if (id && cardType === type) setDataType(type);
  }, [cardType, id]);

  return (
    <Layout location={location} componentName={componentName}>
      <S.DetailsView>
        {isDataFound && (
          <>
            {dataType === AvailableCardDetails.type && typeMatchingId && (
              <TypeCardDetails type={typeMatchingId} />
            )}
            {dataType === AvailableCardDetails.pokemon && pokemonMatchingId && (
              <PokemonCardDetails pokemon={pokemonMatchingId} />
            )}
            {dataType === AvailableCardDetails.move && moveMatchingId && (
              <MoveCardDetails move={moveMatchingId} />
            )}
          </>
        )}

        <NoDataMessage fetchButton={!!(dataType && !isDataFound)} returnButton>
          <S.DetailsInformation>
            {dataType && !isDataFound ? (
              <>
                Could not found detailed data for {cardType} with id {id}
              </>
            ) : (
              <>
                No enugh information provided. Get back to the search page in order to fetch data
                and select specific pokemon to see its details.
              </>
            )}
          </S.DetailsInformation>
        </NoDataMessage>
      </S.DetailsView>
    </Layout>
  );
};
