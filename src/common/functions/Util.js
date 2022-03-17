/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-nested-ternary */

export function listObjectAreSame(o1, o2) {
  if (o2 === null && o1 !== null) return false;
  return o1 !== null && typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
        Object.keys(o1).every((p) => listObjectAreSame(o1[p], o2[p]))
    : o1 !== null &&
      Array.isArray(o1) &&
      Array.isArray(o2) &&
      !o1.length &&
      !o2.length
    ? true
    : o1 === o2;
}
