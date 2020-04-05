import { getUserId } from '../utils';
import { rule, shield, deny, allow } from 'graphql-shield';
import { Context } from '../context';

const rules = {
  isAuthenticated: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isPostOwner: rule()(async (_parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const post = await context.prisma.punbb_posts.findOne({
      where: {
        id: Number(id),
      },
    });
    return userId === post.poster_id;
  }),
  isTopicOwner: rule()(async (_parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const user = await context.prisma.punbb_users.findOne({
      where: {
        id: Number(userId),
      },
    });
    const topic = await context.prisma.punbb_topics.findOne({
      where: {
        id: Number(id),
      },
    });
    return user.username === topic.poster;
  }),
};

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
  //{ fallbackRule: deny, debug: true },
);
