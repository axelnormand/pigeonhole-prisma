# pigeonhole-prisma

Punbb exposed as GraphQL endpoint and with a react native expo client

Uses: Prisma 2, GraphQL Nexus, GraphQL yoga, Graphql shield, React Native, Expo, Mobx State Tree + mst-gql, react native paper

# Install

- npm install -g prisma

## Running

1. Start your Prisma server: `yarn docker:up`
2. Check running: `docker-compose ps`
3. Deploy your Prisma service if you change data model (also re-generates ts): `yarn prisma:deploy`
4. run graphql server: `yarn dev`

## Outline

- Expose your MySQL DB over the internet
- Deploy this Node Docker image to somewhere like Heroku
- Uses prisma + nexus to generate typed graphql from DB schema
- Uses graphql-yoga and graphql-shield to provide GraphQL endpoint with permissions

## Code TODOS

- [ ] deploy heroku with config
- [ ] expo install
- [ ] foreign keys in schema.prisma: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/relations#example
- [ ] dependabot
- [ ] jest
- [ ] circle ci
- [ ] fix linting
- [ ] use babel or stay ts-node

## Feature TODOs

- [ ] login
- [ ] read forums + topics + posts
- [ ] create post and topic
- [ ] update/delete post and topic
- [ ] navigation + web
- [ ] bbcode
- [ ] push notifications
- [ ] offline friendly / PWA
- [ ] signup
