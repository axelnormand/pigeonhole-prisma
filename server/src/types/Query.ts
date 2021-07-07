import { booleanArg, intArg, nonNull, nullable, queryType, stringArg } from 'nexus';
import { Context } from 'src/context';
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

    // posts have offset not cursor pagination so can jump to last read page
    t.field('posts', {
      type: 'PostsResult',
      args: {
        topic_id: nonNull(intArg()),
        skip: nullable(intArg()),
        take: intArg(),
        resumePosition: booleanArg(), // true on first load to resume page where you left off
      },
      resolve: async (_parent, { topic_id, skip, take, resumePosition }, ctx: Context) => {
        const finalTake = take || DEFAULT_TAKE;
        const finalSkip = skip || 0;

        const userThread = await ctx.prisma.punbb_userthread.findFirst({
          where: {
            user: getUserId(ctx) ?? 0,
            thread: topic_id
          }
        });
        const totalPosts = await ctx.prisma.punbb_post.count({
          where: {
            topic_id: Number(topic_id),
          }
        });
        const totalPages = totalPosts / finalTake;
        const currentPage = (finalSkip / finalTake);

        console.log(`Got user thread for topic ${topic_id} with resumePosition ${resumePosition}`, { user: getUserId(ctx), userThread, totalPages, totalPosts, currentPage });

        const posts = await ctx.prisma.punbb_post.findMany({
          skip: finalSkip,
          take: finalTake,
          where: {
            topic_id: Number(topic_id),
            posted: {
              gte: resumePosition ? (userThread?.last_read || 0) : 0
            }
          },
          orderBy: {
            posted: 'asc',
          },
        });

        return { posts, totalPages, currentPage, totalPosts };
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
