import React from 'react';

export const setDocumentTitle = (title: string) => {
  document.title = `${title} | DoApp`;
};

export const renderErrorsFor = (errors: any, ref: string) => {
  if (!errors) {
    return false;
  }
  if (typeof errors === 'string') {
    errors = [errors];
  }

  return errors.map((error: any, i: number) => {
    if (error[ref]) {
      return (
        <div key={i} className="error">
          {error[ref]}
        </div>
      );
    }
    return null;
  });
};
