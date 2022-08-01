import { FEMALE, MALE, ErrorMessages, Fields, SUCCESS_MESSAGE } from 'appConstants';
import { CustomPokemon, FormFields, MessageType } from 'types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Layout } from 'modules';
import * as S from './styled';
import { uuid } from 'utils';
import * as yup from 'yup';
import {
  BirthdayField,
  ConsentField,
  GenderField,
  AvatarField,
  ShinyField,
  TypeField,
  NameField,
  FormCard,
  Message,
} from 'modules';

type Props = {
  componentName: string;
  location: string;
};

const FORM_VALIDATION_SCHEMA = yup.object().shape({
  type: yup.string().required(ErrorMessages.type),
  name: yup.string().min(2).required(ErrorMessages.name),
  gender: yup.string().nullable().required(ErrorMessages.gender),
  birthday: yup.string().min(10).required(),
  consent: yup.bool().oneOf([true], ErrorMessages.consent),
});

export const Form = ({ componentName, location }: Props) => {
  const [pokemons, setPokemons] = useState<Array<CustomPokemon & { id: string }>>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(FORM_VALIDATION_SCHEMA),
  });

  const onSubmit: SubmitHandler<FormFields> = (fieldValues) => {
    const { shiny, avatar, gender, name, type, birthday } = fieldValues;
    const customPokemon: CustomPokemon & { id: string } = {
      avatar: avatar.length > 0 ? avatar[0] : null,
      id: uuid(),
      birthday,
      gender,
      shiny,
      type,
      name,
    };
    setPokemons([...pokemons, customPokemon]);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <Layout location={location} componentName={componentName}>
      <S.CommonView>
        <S.FormHeading>Create custom pokemon!</S.FormHeading>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <NameField error={errors.name?.message} {...register(Fields.name)} />
          <TypeField error={errors.type?.message} {...register(Fields.type)} />
          <S.GenderWrapper>
            <S.RadioWrapper>
              *Gender
              <S.RadioFields>
                <GenderField {...register(Fields.gender)} value={FEMALE} />
                <GenderField {...register(Fields.gender)} value={MALE} />
              </S.RadioFields>
            </S.RadioWrapper>
            <Message
              message={errors.gender?.message || ''}
              visible={!!errors.gender?.message}
              type={MessageType.error}
            />
          </S.GenderWrapper>
          <BirthdayField error={errors.birthday?.message} {...register(Fields.birthday)} />
          <AvatarField {...register(Fields.avatar)} />
          <ShinyField {...register(Fields.shiny)} />
          <ConsentField error={errors.consent?.message} {...register(Fields.consent)} />
          <S.SubmitButton
            disabled={Object.values(errors).some((error) => error.message !== undefined)}
            type="submit"
          >
            Submit
          </S.SubmitButton>
          <Message
            visible={showSuccessMessage}
            type={MessageType.success}
            message={SUCCESS_MESSAGE}
            center
          />
        </S.Form>
        <hr />
        <S.CardsGrid>
          {pokemons.map((pokemon) => (
            <FormCard key={pokemon.id} customPokemon={pokemon} />
          ))}
        </S.CardsGrid>
      </S.CommonView>
    </Layout>
  );
};
