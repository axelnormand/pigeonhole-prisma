import React from 'react';
import { Platform } from 'react-native';

/** App init things before App component loaded */
export const init = () => {
  if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
      trackAllPureComponents: true,
    });
  }

  // setup async error handler
  if (Platform.OS !== 'web') {
    const defaultErrorHandler = ErrorUtils.getGlobalHandler();
    const myErrorHandler = (e: Error, isFatal?: boolean) => {
      console.error(`ASYNC ERROR (isFatal ${isFatal}): ${e.message}`, e);
      defaultErrorHandler(e, isFatal);
    };
    ErrorUtils.setGlobalHandler(myErrorHandler);
  }
};
