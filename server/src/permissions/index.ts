import { getUserId } from '../utils';
import { rule, shield } from 'graphql-shield';
import { Context } from '../context';

const rules = {
  isAuthenticated: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isPostOwner: rule()(async (_parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const author = await context.prisma.punbb_posts
      .findOne({
        where: {
          id: Number(id),
        },
      })
      .author();
    return userId === author.id;
  }),
  isTopicOwner: rule()(async (_parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const author = await context.prisma.punbb_threads
      .findOne({
        where: {
          id: Number(id),
        },
      })
      .author();
    return userId === author.id;
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticated,
    filterPosts: rules.isAuthenticated,
    post: rules.isAuthenticated,
  },
  Mutation: {
    createPost: rules.isPostOwner,
    updatePost: rules.isPostOwner,
    deletePost: rules.isPostOwner,
    createThread: rules.isTopicOwner,
    updateThread: rules.isTopicOwner,
    deleteThread: rules.isTopicOwner,
  },
});
