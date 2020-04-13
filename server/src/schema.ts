import path from 'path';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from 'nexus';
import * as types from './types';

/**
 * __dirname not working on netlify
 * Error: ENOENT: no such file or directory, mkdir
 *
 * Trying solution from here instead to get generated dir path
 * https://github.com/prisma/prisma/issues/1021
 */
const getGeneratedFilePath = (filename: string) => {
  // process.cwd is the server dir, so add on src
  return path.join(process.cwd(), 'src', 'generated', filename);
};

export const schema = makeSchema({
  types,
  plugins: [
    nexusPrismaPlugin({
      outputs: {
        //typegen: __dirname + '/generated/nexusTypes.ts',
        typegen: getGeneratedFilePath('nexusTypes.ts'),
      },
      shouldGenerateArtifacts: false,
    }),
  ],
  outputs: {
    //schema: __dirname + '/../../schema.graphql',
    schema: getGeneratedFilePath('schema.graphql'),
    //typegen: __dirname + '/generated/nexus.ts',
    typegen: getGeneratedFilePath('nexus.ts'),
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
