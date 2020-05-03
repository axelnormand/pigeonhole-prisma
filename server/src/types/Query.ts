import { intArg, queryType, stringArg } from '@nexus/schema';
import { getUserId } from '../auth';

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
        });
      },
    });

    t.list.field('topics', {
      type: 'punbb_topic',
      args: {
        forum_id: intArg({ required: true }),
      },
      resolve: (_parent, { forum_id }, ctx) => {
        return ctx.prisma.punbb_topic.findMany({
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
      },
      resolve: (_parent, { topic_id }, ctx) => {
        return ctx.prisma.punbb_post.findMany({
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
      },
      resolve: (_parent, { searchString }, ctx) => {
        return ctx.prisma.punbb_post.findMany({
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
