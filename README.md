# pigeonhole-prisma

# Install

- npm install -g prisma

## Running

1. Start your Prisma server: `yarn docker:up`
2. Check running: `docker-compose ps`
3. Deploy your Prisma service if you change data model (also re-generates ts): `yarn prisma:deploy`
4. run graphql server: `yarn dev`

## Using prisma client

```
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

## Using prisma in server

- `import { prisma } from './generated/prisma-client'`
- `await prisma.users();`

## Using nexus in server to create API

- Using GraphQL Nexus for CRUD building blocks via `prismaObjectType`

```
import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as path from 'path'
import { stringArg, idArg } from 'nexus'
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['post'])
    t.list.field('feed', {
      type: 'Post',
      resolve: (_, args, ctx) =>
        ctx.prisma.posts({ where: { published: true } }),
    })
    t.list.field('postsByUser', {
      type: 'Post',
      args: { email: stringArg() },
      resolve: (_, { email }, ctx) =>
        ctx.prisma.posts({ where: { author: { email } } }),
    })
  },
})
```
