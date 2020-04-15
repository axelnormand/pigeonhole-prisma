import { getNetlify } from '../server';
import { config } from '../config';

const { nodeEnv, pigeonholeServer } = config();

console.log(
  `🚀 Starting playground with NODE_ENV ${nodeEnv} and PIGEONHOLE_SERVER ${pigeonholeServer}`,
);
const lambda = getNetlify();

export const handler = lambda.playgroundHandler;
