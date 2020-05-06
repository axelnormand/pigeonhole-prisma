import Constants from 'expo-constants';
import { Platform } from 'react-native';

type Config = {
  graphqlServerUrl: string;
};

const isProductionWeb =
  Platform.OS === 'web' && process.env.IS_PRODUCTION_CLIENT === 'true';

const isProductionPhone =
  Platform.OS !== 'web' && Constants.manifest?.releaseChannel;

/* read process.env known keys and expo constants */
export const config = (): Config => ({
  graphqlServerUrl:
    isProductionPhone || isProductionWeb
      ? 'https://graphql.tessellators.com/.netlify/functions/server'
      : 'http://localhost:4000',
});
