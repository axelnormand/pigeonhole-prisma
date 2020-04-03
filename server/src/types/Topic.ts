import { objectType } from 'nexus';

export const Thread = objectType({
  name: 'punbb_topics',
  definition(t) {
    t.model.id();
    t.model.poster();
    t.model.subject();
    t.model.posted();
    t.model.closed();
    t.model.sticky();
    t.model.last_post();
    t.model.last_post_id();
    t.model.last_poster();
  },
});
