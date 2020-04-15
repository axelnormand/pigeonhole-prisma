import { getNetlify } from '../server';

console.log(`🚀 Starting lambda graphql playground`);
const lambda = getNetlify();

export const handler = lambda.playgroundHandler;
