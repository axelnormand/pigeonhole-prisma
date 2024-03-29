import { shield, deny, allow } from 'graphql-shield';
import { isAuthenticated, isPostOwner, isTopicOwner } from './rules';

export const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
      categories: isAuthenticated,
      recentTopics: isAuthenticated,
      topics: isAuthenticated,
      posts: isAuthenticated,
      searchPosts: isAuthenticated,
    },
    Mutation: {
      login: allow,
      updatePushToken: isAuthenticated,
      createPost: isPostOwner,
      //updatePost: isPostOwner,
      //deletePost: isPostOwner,
      createTopic: isTopicOwner,
      //updateTopic: isTopicOwner,
      //deleteTopic: isTopicOwner,
    },
    AuthPayload: allow,
    punbb_user: isAuthenticated,
    punbb_category: isAuthenticated,
    punbb_forum: isAuthenticated,
    punbb_topic: isAuthenticated,
    punbb_post: isAuthenticated,
  },
  {
    //fallbackRule: deny,
    debug: true,
  },
);
