import { FEMALE, MALE, Fields, SUCCESS_MESSAGE, FORM_VALIDATION_SCHEMA } from 'appConstants';
import { CustomPokemon, FormFields, MessageType } from 'types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import * as S from './styled';
import { uuid } from 'utils';
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
  Layout,
} from 'modules';

type Props = {
  componentName: string;
  location: string;
};

export const Form = ({ componentName, location }: Props) => {
  const [pokemons, setPokemons] = useState<Array<CustomPokemon & { id: string }>>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [initialEnter, setInitialEnter] = useState(true);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
    clearErrors,
  } = useForm<FormFields>({
    resolver: yupResolver(FORM_VALIDATION_SCHEMA),
    reValidateMode: 'onSubmit',
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
    reset();
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  watch(() => initialEnter && setInitialEnter(false));

  const clearErrorOnChange = (field: Fields) => !!errors[field]?.message && clearErrors(field);

  return (
    <Layout location={location} componentName={componentName}>
      <S.CommonView>
        <S.FormHeading>Create custom pokemon!</S.FormHeading>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <NameField
            error={errors.name?.message}
            {...register(Fields.name, {
              onChange: () => clearErrorOnChange(Fields.name),
            })}
          />
          <TypeField
            error={errors.type?.message}
            {...register(Fields.type, {
              onChange: () => clearErrorOnChange(Fields.type),
            })}
          />
          <S.GenderWrapper>
            <S.RadioWrapper>
              *Gender
              <S.RadioFields>
                <GenderField
                  {...register(Fields.gender, {
                    onChange: () => clearErrorOnChange(Fields.gender),
                  })}
                  value={FEMALE}
                />
                <GenderField
                  {...register(Fields.gender, {
                    onChange: () => clearErrorOnChange(Fields.gender),
                  })}
                  value={MALE}
                />
              </S.RadioFields>
            </S.RadioWrapper>
            <Message
              message={errors.gender?.message || ''}
              visible={!!errors.gender?.message}
              type={MessageType.error}
            />
          </S.GenderWrapper>
          <BirthdayField
            error={errors.birthday?.message}
            {...register(Fields.birthday, { onChange: () => clearErrorOnChange(Fields.birthday) })}
          />
          <AvatarField {...register(Fields.avatar)} />
          <ShinyField {...register(Fields.shiny)} />
          <ConsentField
            error={errors.consent?.message}
            {...register(Fields.consent, { onChange: () => clearErrorOnChange(Fields.consent) })}
          />
          <S.SubmitButton
            disabled={
              initialEnter || Object.values(errors).some((error) => error.message !== undefined)
            }
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
