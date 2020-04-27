import { GraphQLClient } from 'graphql-request';
import { createHttpClient } from 'mst-gql';
import { config } from '../config';
import { setBearerToken } from './init';
import { deleteKey } from './storage';

/** singleton */
const graphQLClient: GraphQLClient = createHttpClient(
  config().graphqlServerUrl,
);

export const getGraphQLClient = () => graphQLClient;

export const setTokenInHeader = (token: string) => {
  graphQLClient.setHeader('Authorization', `Bearer ${token}`);
  setBearerToken(token);
};

export const clearTokenInHeader = () => {
  graphQLClient.setHeader('Authorization', ``);
  setBearerToken('');
};
