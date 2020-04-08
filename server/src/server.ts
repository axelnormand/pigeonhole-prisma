import { GraphQLServer, GraphQLServerLambda } from 'graphql-yoga';
import { permissions } from './permissions/permissions';
import { schema } from './schema';
import { createContext } from './context';

const options = {
  schema,
  context: createContext,
  middlewares: [permissions],
};

/** get graphql yoga for node */
export const getNode = () => new GraphQLServer(options);

/** get graphql yoga for netlify */
export const getNetlify = () => new GraphQLServerLambda(options);
