import { intArg, queryType, stringArg } from 'nexus';
import { getUserId } from '../utils';

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
        return ctx.prisma.punbb_forums;
      },
    });

    t.list.field('topics', {
      type: 'punbb_topics',
      args: {
        forum_id: intArg({ required: true }),
      },
      resolve: (_parent, { forum_id }, ctx) => {
        return ctx.prisma.punbb_topics({ paginated: true }).findMany({
          where: {
            forum_id: Number(forum_id),
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
            OR: [
              {
                title: {
                  contains: searchString,
                },
              },
              {
                content: {
                  contains: searchString,
                },
              },
            ],
          },
        });
      },
    });
  },
});
