import Constants from 'expo-constants';
import { Platform } from 'react-native';

type Config = {
  graphqlServerUrl: string;
  webUrl: string;
  appScheme: string;
};

const isProductionWeb =
  Platform.OS === 'web' && process.env.NODE_ENV === 'production';

const isProductionPhone =
  Platform.OS !== 'web' && Constants.manifest?.releaseChannel;

console.log(
  `Config: isProductionWeb ${isProductionWeb}, isProductionPhone: ${isProductionPhone}`,
);

console.log(`Config: process.env`, process.env);

/* read process.env known keys and expo constants */
export const config = (): Config => ({
  graphqlServerUrl:
    isProductionPhone || isProductionWeb
      ? 'https://graphql.tessellators.com/.netlify/functions/server'
      : 'http://192.168.0.204:4000',
  webUrl:
    isProductionPhone || isProductionWeb
      ? 'https://graphql.tessellators.com'
      : 'http://localhost:19006',
  appScheme: 'pigeonhole://',
});
