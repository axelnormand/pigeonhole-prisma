import { objectType } from 'nexus';

export const Thread = objectType({
  name: 'punbb_forums',
  definition(t) {
    t.model.id();
    t.model.forum_name();
    t.model.forum_desc();
  },
});
