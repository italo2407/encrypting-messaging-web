export function exclude<T extends Record<string | number | symbol, any>, Key extends keyof T>(
  object: T,
  keys: Key[],
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>;
}

export const removeUndefinedProps = (object: any): Record<string, any> =>
  Object.entries(object)
    .filter(([, value]) => value !== undefined)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
