import { objectType } from '@nexus/schema';

export const punbb_topic = objectType({
  name: 'punbb_topic',
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
    t.model.forum_id();
    t.model.punbb_forum();
    t.model.punbb_posts();
  },
});
