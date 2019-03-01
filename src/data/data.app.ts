// tslint:disable
import { useEffect, useState } from 'react';

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
