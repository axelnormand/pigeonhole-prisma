import { intArg, queryType, stringArg } from '@nexus/schema';
import { getUserId } from '../auth';

const DEFAULT_TAKE = 20;

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'punbb_user',
      nullable: true,
      resolve: (_parent, _args, ctx) => {
        const userId = getUserId(ctx);
        return ctx.prisma.punbb_user.findOne({
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
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.punbb_topic.findMany({
          where: {
            last_post: {
              gte: Math.round(new Date().getTime() / 1000) - 200 * 24 * 60 * 60,
            },
          },
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
        forum_id: intArg({ required: true }),
        cursor: intArg({ required: false }),
        take: intArg({ required: false }),
      },
      resolve: (_parent, { forum_id, cursor, take }, ctx) => {
        return ctx.prisma.punbb_topic.findMany({
          skip: cursor ? 1 : 0,
          take: take || DEFAULT_TAKE,
          cursor: {
            id: cursor,
          },
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
        topic_id: intArg({ required: true }),
        cursor: intArg({ required: false }),
        take: intArg({ required: false }),
      },
      resolve: (_parent, { topic_id, cursor, take }, ctx) => {
        return ctx.prisma.punbb_post.findMany({
          skip: cursor ? 1 : 0,
          take: take || DEFAULT_TAKE,
          cursor: {
            id: cursor,
          },
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
        searchString: stringArg({ nullable: true }),
        cursor: intArg({ required: false }),
        take: intArg({ required: false }),
      },
      resolve: (_parent, { searchString, cursor, take }, ctx) => {
        return ctx.prisma.punbb_post.findMany({
          skip: cursor ? 1 : 0,
          take: take || DEFAULT_TAKE,
          cursor: {
            id: cursor,
          },
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
