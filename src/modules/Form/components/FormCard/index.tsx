import questionmark from 'assets/images/questionmark.png';
import { CustomPokemon } from 'types';
import { capitalize } from 'utils';
import * as S from './styled';

type Props = {
  customPokemon: CustomPokemon;
};

export const FormCard = ({ customPokemon }: Props) => {
  const { avatar, birthday, gender, name, shiny, type } = customPokemon;
  const baseContent = [
    { id: 1, label: 'Name', value: capitalize(name) },
    { id: 2, label: 'Gender', value: capitalize(gender) },
    { id: 3, label: 'Main type', value: capitalize(type) },
    { id: 4, label: 'Birthday', value: capitalize(birthday) },
    { id: 5, label: 'Shiny', value: shiny ? 'Yes' : 'No' },
  ];
  return (
    <S.Card>
      <S.ImageWrapper>
        <img src={avatar ? URL.createObjectURL(avatar) : questionmark} />
      </S.ImageWrapper>
      <S.Details>
        {baseContent.map(({ id, label, value }) => (
          <p key={id}>
            {label}: <span>{value}</span>
          </p>
        ))}
      </S.Details>
    </S.Card>
  );
};
