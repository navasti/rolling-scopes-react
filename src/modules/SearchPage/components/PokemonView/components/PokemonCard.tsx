import { AvailableCardDetails, PokemonDetails } from 'types';
import { NO_IMAGE_PLACEHOLDER } from 'appConstants';
import { useNavigate } from 'react-router-dom';
import * as S from '../styled';

type Props = {
  pokemon: PokemonDetails;
};

export const PokemonCard = ({ pokemon }: Props) => {
  const navigation = useNavigate();
  const onClick = () => {
    navigation(`details/${AvailableCardDetails.pokemon}/${pokemon.id}`, { replace: true });
  };
  return (
    <>
      <S.Card onClick={onClick} align="left" stretch>
        <S.ImageWrapper>
          <S.Image
            src={pokemon.sprites.front_default || NO_IMAGE_PLACEHOLDER}
            data-testid="pokemon-card"
            alt={pokemon.name}
            height="85"
            width="85"
            role="img"
          />
          <S.BaseInformation>
            <S.Title>Base:</S.Title>
            <p>Name: {pokemon.name}</p>
            <p>
              Types: <span>{pokemon.types.map(({ type }) => type.name).join(', ')}</span>
            </p>
          </S.BaseInformation>
        </S.ImageWrapper>
      </S.Card>
    </>
  );
};
