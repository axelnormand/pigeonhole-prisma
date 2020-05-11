import { getNetlify } from '../server';

console.log(`🚀 Starting lambda graphql server`);
const lambda = getNetlify();

// Netlify was always timing out: https://github.com/prisma/prisma/issues/2241
export const handler = (
  event: any,
  context: { callbackWaitsForEmptyEventLoop: boolean },
  cb: any,
) => {
  // Set to false to send the response right away when the callback executes, instead of waiting for the Node.js event loop to be empty.
  context.callbackWaitsForEmptyEventLoop = false;
  return lambda.graphqlHandler(event, context, cb);
};
