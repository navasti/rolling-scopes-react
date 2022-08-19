import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { CustomPokemon, FormActionType, FormContextProps } from 'types';
import { formReducer, initialFormState } from 'reducers';

export const FormContext = createContext<FormContextProps>({} as FormContextProps);

export const FormContextProvider = ({ children }: { children: JSX.Element }) => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { formState: state } = useMemo(() => ({ formState, dispatch }), [formState, dispatch]);

  const addPokemon = useCallback(
    (pokemon: CustomPokemon & { id: string }) => {
      dispatch({
        type: FormActionType.addPokemon,
        payload: {
          customPokemons: [pokemon],
        },
      });
    },
    [dispatch]
  );

  return (
    <FormContext.Provider value={{ formState: state, addPokemon }}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within FormContext');
  } else return context;
};
