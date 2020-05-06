import { objectType } from '@nexus/schema';

export const punbb_category = objectType({
  name: 'punbb_category',
  definition(t) {
    t.model.id();
    t.model.cat_name();
    t.model.disp_position();
    t.model.punbb_forums();
    t.int('topicCount', {
      async resolve(parent, _args, ctx) {
        const forums = await ctx.prisma.punbb_forum.findMany({
          where: {
            cat_id: parent.id,
          },
        });
        let total = 0;
        forums.forEach(
          async (forum) =>
            (total += await ctx.prisma.punbb_topic.count({
              where: {
                forum_id: forum.id,
              },
            })),
        );
        return total;
      },
    });
  },
});
