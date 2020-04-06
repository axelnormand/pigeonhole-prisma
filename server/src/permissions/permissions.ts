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
    punbb_users: isAuthenticated,
    punbb_forums: isAuthenticated,
    punbb_topics: isAuthenticated,
    punbb_posts: isAuthenticated,
  },
  { fallbackRule: deny },
);
