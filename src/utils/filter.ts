export function getKeysInFilter<T>(filter: Partial<T>): string {
  const keys = Object.keys(filter);
  if (keys.length === 0) return '';
  let keysMapped: string;

  keys.forEach((key) => {
    if (!keysMapped) {
      keysMapped = `${key}=${filter[key]}`;
    } else {
      keysMapped += `&${key}=${filter[key]}`;
    }
  });

  return keysMapped;
}
