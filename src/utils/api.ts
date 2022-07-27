enum ErrorStatuses {
  success = '2',
  client = '4',
  server = '5',
}

const isServerError = (status: number) => String(status).startsWith(ErrorStatuses.server);

const hasError = (status: number) => !String(status).startsWith(ErrorStatuses.success);

const handleCatch = (error: unknown) => {
  error instanceof Error && window.alert(error.message);
};

const handleResponse = async <T>(response: Response) => {
  if (hasError(response.status)) {
    if (isServerError(response.status)) {
      window.alert('There was a server error');
    }
  } else return (await response.json()) as T;
};

const handleMappedResponse = async <T>(arr: Array<Promise<Response>>) => {
  const responses = await Promise.all(arr);
  const promises: Array<Promise<T>> = [];
  let errors = 0;
  responses.forEach((response) => {
    if (isServerError(response.status)) errors += 1;
    else promises.push(response.json() as Promise<T>);
  });
  if (errors > 0) window.alert(`There was ${errors} errors on ${arr.length} requests.`);
  return await Promise.all(promises);
};

export const fetchPokemonByParameter = async <T>(url: string): Promise<T | null> => {
  let results: T | null = null;
  try {
    const response = await fetch(url);
    const data = await handleResponse<T>(response);
    if (data) results = data;
  } catch (error) {
    handleCatch(error);
  } finally {
    return results;
  }
};

export const fetchBase = async <T1 extends { results: Array<T2> }, T2>(url: string) => {
  let base: Array<T2> = [];
  try {
    const response = await fetch(url);
    const data = await handleResponse<T1>(response);
    if (data) base = [...data.results];
  } catch (error) {
    handleCatch(error);
  } finally {
    return base;
  }
};

export const fetchDetails = async <T1 extends { url: string }, T2>(arr: Array<T1>) => {
  let detailed: Array<T2> = [];
  try {
    const responses = arr.map((item) => fetch(item.url).then((response) => response));
    const data = await handleMappedResponse<T2>(responses);
    detailed = data;
  } catch (error) {
    handleCatch(error);
  } finally {
    return detailed;
  }
};
