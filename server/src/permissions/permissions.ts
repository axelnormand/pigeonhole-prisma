import { shield, deny, allow } from 'graphql-shield';
import { isAuthenticated } from './rules';

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      forums: isAuthenticated,
      topics: isAuthenticated,
      searchPosts: isAuthenticated,
    },
    Mutation: {
      login: allow,

      // createPost: isPostOwner,
      // updatePost: isPostOwner,
      // deletePost: isPostOwner,
      // createTopic: isTopicOwner,
      // updateTopic: isTopicOwner,
      // deleteTopic: isTopicOwner,
    },
    AuthPayload: allow,
    punbb_user: isAuthenticated,
    punbb_forum: isAuthenticated,
    punbb_topic: isAuthenticated,
    punbb_post: isAuthenticated,
  },
  { fallbackRule: deny },
);
