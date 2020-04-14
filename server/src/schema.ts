import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from '@nexus/schema';
import * as types from './types';
import { config } from './config';

//__dirname not working on netlify
// Error: ENOENT: no such file or directory, mkdir
// Trying not generating nexus types on netlify
// Therefore schema outputs undefined for netlify

export const schema = makeSchema({
  types,
  plugins: [
    nexusPrismaPlugin({
      shouldGenerateArtifacts: config().pigeonholeServer === 'node', // dont output on netlify
      outputs:
        config().pigeonholeServer === 'node'
          ? {
              typegen: __dirname + '/generated/nexusTypes.ts',
            }
          : undefined,
    }),
  ],
  outputs:
    config().pigeonholeServer === 'node'
      ? {
          schema: __dirname + '/../../schema.graphql',
          typegen: __dirname + '/generated/nexus.ts',
        }
      : false,
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
});
