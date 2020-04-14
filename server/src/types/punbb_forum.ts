import { objectType } from '@nexus/schema';

export const punbb_forum = objectType({
  name: 'punbb_forum',
  definition(t) {
    t.model.id();
    t.model.forum_name();
    t.model.forum_desc();
  },
});
