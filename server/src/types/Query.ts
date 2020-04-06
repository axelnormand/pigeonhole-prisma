import { intArg, queryType, stringArg } from 'nexus';
import { getUserId } from '../auth';

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'punbb_users',
      nullable: true,
      resolve: (_parent, _args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.punbb_users.findOne({
          where: {
            id: Number(userId),
          },
        });
      },
    });

    t.list.field('forums', {
      type: 'punbb_forums',
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.punbb_forums.findMany({
          orderBy: {
            forum_name: 'asc',
          },
        });
      },
    });

    t.list.field('topics', {
      type: 'punbb_topics',
      args: {
        forum_id: intArg({ required: true }),
      },
      resolve: (_parent, { forum_id }, ctx) => {
        return ctx.prisma.punbb_topics.findMany({
          where: {
            forum_id: Number(forum_id),
          },
          orderBy: {
            last_post: 'desc',
          },
        });
      },
    });

    t.list.field('searchPosts', {
      type: 'punbb_posts',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_parent, { searchString }, ctx) => {
        return ctx.prisma.punbb_posts.findMany({
          where: {
            message: {
              contains: searchString,
            },
          },
        });
      },
    });
  },
});
