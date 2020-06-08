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

## TODOS

- [x] deploy netlify
- [x] expo install
- [x] jest
- [x] Error Boundary
- [x] login
- [x] navigation + web
- [x] display categories/topics/posts
- [x] logout + drawer
- [ ] web urls with newer react navigation
- [ ] pagination
- [ ] add bbcode
- [ ] favicon + icon
- [ ] create post and topic
- [ ] update/delete post and topic
- [ ] push notifications (store push token in db)
- [ ] whats new/unread
- [ ] jump to unread page
- [ ] offline friendly / PWA
- [ ] floating videos
- [ ] nice music player / floating
- [ ] circle ci / github actions
- [ ] linting
- [ ] prettier
- [ ] foreign keys in schema.prisma: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/relations#example
- [ ] dependabot
- [ ] bugsnag
- [ ] sentry
- [ ] OTA updates
- [ ] expo error recovery https://docs.expo.io/versions/latest/sdk/error-recovery/
- [ ] absolute import rules
- [ ] storybook
- [ ] websocket subscriptions + lambda updates from a php post
- [ ] pull to refresh
- [ ] animations
- [ ] nice styling
- [ ] offline check
- [ ] offline mode
- [ ] fix nested mst-gql typings in screens/Forums
- [ ] ui kitten 5
- [ ] sign out + pop animation + better state https://reactnavigation.org/docs/auth-flow
- [ ] react native action sheet to edit / delete or something
- [ ] universal links + smart banner https://medium.com/@ageitgey/everything-you-need-to-know-about-implementing-ios-and-android-mobile-deep-linking-f4348b265b49
