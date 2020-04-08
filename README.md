# pigeonhole-prisma

Punbb exposed as GraphQL endpoint and with a react native expo client

Uses: Prisma 2, GraphQL Nexus, GraphQL yoga, Graphql shield, React Native, Expo, Mobx State Tree + mst-gql, Kitten UI toolkit

# Install

- npm install -g prisma

## Running Locally

1. Start your Mysql server: `yarn docker:up`
2. Check running: `docker-compose ps`
3. run graphql server: `yarn start`

## Running netlify locally

1. `yarn start:netlify:dev`
2. Status: http://localhost:8888/.netlify/functions/status
3. Playground: http://localhost:8888/.netlify/functions/playground
4. GraphQL Server: http://localhost:8888/.netlify/functions/server

## Code TODOS

- [ ] deploy netlify
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
