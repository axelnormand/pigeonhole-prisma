import { shield, deny, allow } from 'graphql-shield';
import { rules } from './rules';

export const permissions = shield(
  {
    Query: {
      me: rules.isAuthenticated,
      forums: rules.isAuthenticated,
      topics: rules.isAuthenticated,
      searchPosts: rules.isAuthenticated,
    },
    Mutation: {
      login: allow,

      // createPost: rules.isPostOwner,
      // updatePost: rules.isPostOwner,
      // deletePost: rules.isPostOwner,
      // createTopic: rules.isTopicOwner,
      // updateTopic: rules.isTopicOwner,
      // deleteTopic: rules.isTopicOwner,
    },
  },

  { fallbackRule: deny },
);
