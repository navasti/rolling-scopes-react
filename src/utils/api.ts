export const fetchPokemonByParameter = async <T>(url: string): Promise<T | null> => {
  let results: T | null = null;
  try {
    const response = await fetch(url);
    const data: T = await response.json();
    results = data;
  } catch (error) {
    console.error(error);
  } finally {
    return results;
  }
};

export const fetchBase = async <T1 extends { results: Array<T2> }, T2>(url: string) => {
  let base: Array<T2> = [];
  try {
    const data = await fetch(url);
    const { results }: T1 = await data.json();
    base = [...results];
  } catch (error) {
    console.error(error);
  } finally {
    return base;
  }
};

export const fetchDetails = async <T1 extends { url: string }, T2>(arr: Array<T1>) => {
  let detailed: Array<T2> = [];
  try {
    const responses = arr.map(async (item) => {
      const response = await fetch(item.url);
      return (await response.json()) as T2;
    });
    detailed = await Promise.all(responses);
  } catch (error) {
    console.error(error);
  } finally {
    return detailed;
  }
};
