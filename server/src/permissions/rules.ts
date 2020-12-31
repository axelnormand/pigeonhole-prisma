import { getUserId } from '../auth';
import { rule } from 'graphql-shield';
import { Context } from '../context';

export const isAuthenticated = rule({ cache: 'contextual' })(
  (_parent, _args, context: Context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  },
);

export const isPostOwner = rule({ cache: 'contextual' })(
  async (_parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const post = await context.prisma.punbb_post.findUnique({
      where: {
        id: Number(id),
      },
    });
    return userId === post.poster_id;
  },
);

export const isTopicOwner = rule({ cache: 'contextual' })(
  async (_parent, { id }, context: Context) => {
    const userId = getUserId(context);
    const user = await context.prisma.punbb_user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    const topic = await context.prisma.punbb_topic.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user.username === topic.poster;
  },
);
