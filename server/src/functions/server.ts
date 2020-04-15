import { getNetlify } from '../server';
import { config } from '../config';

const { nodeEnv, pigeonholeServer } = config();

console.log(
  `🚀 Starting server with NODE_ENV ${nodeEnv} and PIGEONHOLE_SERVER ${pigeonholeServer}`,
);
const lambda = getNetlify();

export const handler = lambda.graphqlHandler;
