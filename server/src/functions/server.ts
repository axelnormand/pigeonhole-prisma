import { getNetlify } from '../server';

console.log(`Starting lambda graphql server`);
const lambda = getNetlify();

export const handler = lambda.graphqlHandler;

console.log(`🚀 Started lambda graphql server`);
