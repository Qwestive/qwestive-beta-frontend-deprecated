/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function areMapsTheSame<Type>(
  map1: Map<string, Type>,
  map2: Map<string, Type>,
  areEqual: (arg0: Type, arg1: Type) => boolean
): boolean {
  let testVal;
  let areTheSame = true;
  if (map1.size !== map2.size) {
    return false;
  }
  map1.forEach((value, key) => {
    testVal = map2.get(key) as Type;
    // in cases of an undefined value, make sure the key
    // actually exists on the object so there are no false positives
    if (
      !areEqual(testVal, value) ||
      (testVal === undefined && !map2.has(key))
    ) {
      areTheSame = false;
    }
  });
  return areTheSame;
}

export const objectToMap = (obj: any): Map<string, any> => {
  const keys = Object.keys(obj);
  const map = new Map();
  for (let i = 0; i < keys.length; i += 1) {
    map.set(keys[i], obj[keys[i]]);
  }
  return map;
};
