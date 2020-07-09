import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { makeSchema } from '@nexus/schema';
import * as types from './types';
import { config } from './config';

console.log(
  `Loading schema with PIGEONHOLE_SERVER ${config().pigeonholeServer}`,
);

export const schema = makeSchema({
  shouldGenerateArtifacts: config().pigeonholeServer === 'node', // dont output on netlify
  types,
  plugins: [
    nexusSchemaPrisma({
      shouldGenerateArtifacts: config().pigeonholeServer === 'node', // dont output on netlify
      outputs: {
        typegen: __dirname + '/generated/nexusTypes.ts',
      },
    }),
  ],
  outputs: {
    schema: __dirname + '/../../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
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
