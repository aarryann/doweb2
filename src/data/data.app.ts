// tslint:disable
import { useEffect, useState } from 'react';

/*
 ** Subscribe to Subjects
 */
export const usePageContext = (client: any, elements: any) => {
  const pending = elements.slice();

  useEffect(() => {
    for (let i = elements.length; i > 0; i--) {
      if (!sessionStorage.getItem(elements[i - 1])) {
        delete pending[i - 1];
      }
    }
  }, [elements]);

  return [pending, []];
};
