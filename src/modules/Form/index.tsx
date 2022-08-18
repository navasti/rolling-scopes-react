import { CustomPokemon, FormFields, MessageType } from 'types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Layout } from 'modules';
import * as S from './styled';
import { uuid } from 'utils';
import {
  FORM_VALIDATION_SCHEMA,
  SUCCESS_MESSAGE,
  DEFAULT_VALUES,
  Fields,
  FEMALE,
  MALE,
} from 'appConstants';
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
} from './components';
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
    clearErrors,
    register,
    reset,
    watch,
  } = useForm<FormFields>({
    resolver: yupResolver(FORM_VALIDATION_SCHEMA),
    defaultValues: DEFAULT_VALUES,
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormFields> = (fieldValues) => {
    const { shiny, avatar, gender, name, type, birthday } = fieldValues;
    const customPokemon: CustomPokemon & { id: string } = {
      avatar: !!avatar?.length ? avatar[0] : null,
      id: uuid(),
      birthday,
      gender,
      shiny,
      type,
      name,
    };
    setShowSuccessMessage(true);
    setPokemons([...pokemons, customPokemon]);
    reset(DEFAULT_VALUES, { keepValues: false });
  };

  watch(() => initialEnter && setInitialEnter(false));

  const onChange = (field: Fields) => {
    !!errors[field]?.message && clearErrors(field);
    !!showSuccessMessage && setShowSuccessMessage(false);
  };

  return (
    <Layout location={location} componentName={componentName}>
      <S.CommonView>
        <S.FormHeading>Create custom pokemon!</S.FormHeading>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <NameField
            error={errors.name?.message}
            {...register(Fields.name, {
              onChange: () => onChange(Fields.name),
            })}
          />
          <TypeField
            error={errors.type?.message}
            {...register(Fields.type, { onChange: () => onChange(Fields.type) })}
          />
          <S.GenderWrapper>
            <S.RadioWrapper>
              *Gender
              <S.RadioFields>
                <GenderField
                  {...register(Fields.gender, { onChange: () => onChange(Fields.gender) })}
                  value={FEMALE}
                />
                <GenderField
                  {...register(Fields.gender, { onChange: () => onChange(Fields.gender) })}
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
            {...register(Fields.birthday, { onChange: () => onChange(Fields.birthday) })}
            error={errors.birthday?.message}
          />
          <AvatarField
            error={errors.avatar?.message}
            {...register(Fields.avatar, { onChange: () => onChange(Fields.avatar) })}
          />
          <ShinyField {...register(Fields.shiny, { onChange: () => onChange(Fields.shiny) })} />
          <ConsentField
            error={errors.consent?.message}
            {...register(Fields.consent, { onChange: () => onChange(Fields.consent) })}
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
