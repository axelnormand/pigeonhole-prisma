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

export const setTokenInHeader = async (token: string) => {
  graphQLClient.setHeader('Authorization', `Bearer ${token}`);
  await setBearerToken(token);
};

export const clearTokenInHeader = async () => {
  graphQLClient.setHeader('Authorization', ``);
  await setBearerToken('');
};
