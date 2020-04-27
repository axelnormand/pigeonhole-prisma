import { Platform } from 'react-native';

/** App init things before App component loaded */
export const init = () => {
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
