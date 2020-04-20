import Constants from 'expo-constants';

type Config = {
  graphqlServerUrl: string;
};

/* read process.env known keys and expo constants */
export const config = (): Config => ({
  graphqlServerUrl: Constants.manifest?.releaseChannel
    ? 'https://graphql.tessellators.com/.netlify/functions/server'
    : 'http://localhost:4000',
});
