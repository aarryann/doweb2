/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
// tslint:disable
import { useEffect } from 'react';

/*
 ** Subscribe to Subjects
 */
export const useCheckContext = (client: any, elements: any) => {
  let pending = null;

  useEffect(() => {
    for (let i = elements.length; i > 0; i--) {
      if (!sessionStorage.getItem(elements[i - 1])) {
        pending = elements[i];
        break;
      }
    }
  });

  return [pending, pending !== null];
};
