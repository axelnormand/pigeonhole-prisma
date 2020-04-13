import path from 'path';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from 'nexus';
import * as types from './types';

/**
 * __dirname not working on netlify
 * Error: ENOENT: no such file or directory, mkdir
 *
 * Trying solution from here instead
 * https://github.com/prisma/prisma/issues/1021
 */
const getPathFromDirname = (...fileParts: string[]) => {
  // process.cwd is the server dir, so add on src
  return path.join(process.cwd(), 'src', ...fileParts);
};

export const schema = makeSchema({
  types,
  plugins: [
    nexusPrismaPlugin({
      outputs: {
        //typegen: __dirname + '/generated/nexusTypes.ts',
        typegen: getPathFromDirname('generated', 'nexusTypes.ts'),
      },
      shouldGenerateArtifacts: false,
    }),
  ],
  outputs: {
    //schema: __dirname + '/../../schema.graphql',
    schema: getPathFromDirname('../../', 'schema.graphql'),
    //typegen: __dirname + '/generated/nexus.ts',
    typegen: getPathFromDirname('generated', 'nexus.ts'),
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
