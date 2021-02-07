import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import * as types from './types';
import { config } from './config';
import { makeSchema } from 'nexus';

console.log(
  `Loading schema with PIGEONHOLE_SERVER ${config().pigeonholeServer}`
);

const shouldGenerateArtifacts = config().pigeonholeServer === 'node'; // dont output on netlify

export const schema = makeSchema({
  shouldGenerateArtifacts,
  types,
  plugins: [
    nexusSchemaPrisma({
      shouldGenerateArtifacts,
      outputs: {
        typegen: __dirname + '/generated/nexusTypes.ts',
      },
    }),
  ],
  outputs: {
    schema: __dirname + '/../../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  // typegenAutoConfig: {
  //   sources: [
  //     {
  //       source: '@prisma/client',
  //       alias: 'client',
  //     },
  //     {
  //       source: require.resolve('./context'),
  //       alias: 'Context',
  //     },
  //   ],
  //   contextType: 'Context.Context',
  // },
});
