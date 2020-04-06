import { getUserId } from '../auth';
import { rule } from 'graphql-shield';
import { Context } from '../context';

export const rules = {
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
