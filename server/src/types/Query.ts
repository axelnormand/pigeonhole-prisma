import { intArg, nonNull, nullable, queryType, stringArg } from 'nexus';
import { getUserId } from '../auth';

const DEFAULT_TAKE = 20;

export const Query = queryType({
  definition(t) {
    t.nullable.field('me', {
      type: 'punbb_user',
      resolve: (_parent, _args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.punbb_user.findUnique({
          where: {
            id: Number(userId),
          },
        });
      },
    });

    t.list.field('categories', {
      type: 'punbb_category',
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.punbb_category.findMany({
          orderBy: {
            disp_position: 'asc',
          },
          include: {
            punbb_forums: true,
          },
        });
      },
    });

    t.list.field('recentTopics', {
      type: 'punbb_topic',
      args: {
        cursor: nullable(intArg()),
        take: nullable(intArg()),
      },
      resolve: (_parent, { cursor, take }, ctx) => {
        return ctx.prisma.punbb_topic.findMany({
          skip: cursor ? 1 : 0,
          take: take || DEFAULT_TAKE,
          cursor: cursor
            ? {
                id: cursor,
              }
            : undefined,
          orderBy: {
            last_post: 'desc',
          },
          include: {
            punbb_forum: true,
          },
        });
      },
    });

    t.list.field('topics', {
      type: 'punbb_topic',
      args: {
        forum_id: nonNull(intArg()),
        cursor: nullable(intArg()),
        take: nullable(intArg()),
      },
      resolve: (_parent, { forum_id, cursor, take }, ctx) => {
        return ctx.prisma.punbb_topic.findMany({
          skip: cursor ? 1 : 0,
          take: take || DEFAULT_TAKE,
          cursor: cursor
            ? {
                id: cursor,
              }
            : undefined,
          where: {
            forum_id: Number(forum_id),
          },
          orderBy: {
            last_post: 'desc',
          },
        });
      },
    });

    t.list.field('posts', {
      type: 'punbb_post',
      args: {
        topic_id: nonNull(intArg()),
        cursor: nullable(intArg()),
        take: nullable(intArg()),
      },
      resolve: (_parent, { topic_id, cursor, take }, ctx) => {
        return ctx.prisma.punbb_post.findMany({
          skip: cursor ? 1 : 0,
          take: take || DEFAULT_TAKE,
          cursor: cursor
            ? {
                id: cursor,
              }
            : undefined,
          where: {
            topic_id: Number(topic_id),
          },
          orderBy: {
            posted: 'asc',
          },
        });
      },
    });

    t.list.field('searchPosts', {
      type: 'punbb_post',
      args: {
        searchString: nonNull(stringArg()),
        cursor: nullable(intArg()),
        take: nullable(intArg()),
      },
      resolve: (_parent, { searchString, cursor, take }, ctx) => {
        return ctx.prisma.punbb_post.findMany({
          skip: cursor ? 1 : 0,
          take: take || DEFAULT_TAKE,
          cursor: cursor
            ? {
                id: cursor,
              }
            : undefined,
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
