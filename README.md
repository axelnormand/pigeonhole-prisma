# pigeonhole-prisma

Punbb exposed as GraphQL endpoint and with a react native expo client

Uses: Prisma 2, GraphQL Nexus, GraphQL yoga, Graphql shield, React Native, Expo, Mobx State Tree + mst-gql, Kitten UI toolkit

# Install

- npm install -g prisma

## Running Locally

1. Start your Mysql server: `yarn docker:up`
2. Check running: `docker-compose ps`
3. run graphql server on `http://localhost:4000`: `cd server; yarn start`
4. run react native / react native web on `https://localhost:19006/` : `cd client; yarn start`

## Local graphql playground 
Can run graphql queries on playground by going to `http://localhost:4000`

Login mutation first to get long lasting token:
```
mutation {
  login(username: "USERNAME", password: "PASSWORD") {
    token,
  }
}
```
Use token to set HTTP header in bottom panel
```
{
  "Authorization": "Bearer PASTE_TOKEN_HERE"
}
```
Now can run example query
```
query {
  topics(forum_id: 4) {
    id
    subject
    poster
  }
}
```

## Running netlify locally

1. `yarn start:netlify:dev`
2. Status: http://localhost:8888/.netlify/functions/status
3. Playground: http://localhost:8888/.netlify/functions/playground
4. GraphQL Server: http://localhost:8888/.netlify/functions/server

## Code TODOS

- [x] deploy netlify
- [x] expo install
- [ ] foreign keys in schema.prisma: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/relations#example
- [ ] dependabot
- [x] jest
- [ ] circle ci / github actions
- [ ] linting
- [ ] prettier
- [ ] bugsnag
- [ ] sentry
- [x] Error Boundary
- [ ] OTA updates
- [ ] expo error recovery https://docs.expo.io/versions/latest/sdk/error-recovery/
- [ ] absolute import rules
- [ ] storybook
- [ ] websocket subscriptions + lambda updates from a php post
- [ ] store push token in db by creating new table
- [ ] pull to refresh
- [ ] animations
- [ ] nice styling
- [ ] why forum card has multiple click hovers
- [ ] offline check 
- [ ] offline mode
- [ ] better unauth catch
- [ ] fix nested mst-gql typings in screens/Forums
- [ ] web urls with newer react navigation
- [ ] ui kitten 5

## Feature TODOs

- [x] login
- [ ] add bbcode
- [ ] read forums + topics + posts
- [ ] create post and topic
- [ ] update/delete post and topic
- [x] navigation + web
- [ ] push notifications
- [ ] offline friendly / PWA
- [ ] signup
- [ ] floating videos
- [ ] nice music player / floating
