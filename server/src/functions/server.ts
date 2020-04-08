import { GraphQLServerLambda } from 'graphql-yoga';
import { getNetlify } from '../server';

console.log(`🚀 Starting lambda graphql server`);
const lambda = getNetlify();

export const handler = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;
