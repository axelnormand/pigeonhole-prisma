import { GraphQLClient } from 'graphql-request';
import { createHttpClient } from 'mst-gql';
import { config } from '../config';

/** singleton */
const graphQLClient: GraphQLClient = createHttpClient(
  config().graphqlServerUrl,
);

export const getGraphQLClient = () => graphQLClient;

export const setTokenInHeader = (token: string) => {
  graphQLClient.setHeader('Authorization', `Bearer ${token}`);
};

export const clearTokenInHeader = () => {
  graphQLClient.setHeader('Authorization', ``);
};
