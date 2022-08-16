import { ErrorStatuses } from 'appConstants';

export const isServerError = (status: number) => String(status).startsWith(ErrorStatuses.server);

export const hasError = (status: number) => !String(status).startsWith(ErrorStatuses.success);

const handleCatch = (error: unknown) => {
  error instanceof Error && window.alert(error.message);
};

export const fetchPokemonByParameter = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await fetch(url);
    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchBase = async <T1 extends { results: Array<T2> }, T2>(url: string) => {
  try {
    const response = await fetch(url);
    const data = (await response.json()) as T1;
    return data ? (data.results as Array<T2>) : undefined;
  } catch (error) {
    handleCatch(error);
  }
};

export const fetchDetails = async <T1 extends { url: string }, T2>(arr: Array<T1>) => {
  try {
    const responses = await Promise.all(arr.map((item) => fetch(item.url)));
    const data = await Promise.all(responses.map((res) => res.json()));
    return data as Array<T2>;
  } catch (error) {
    handleCatch(error);
  }
};
