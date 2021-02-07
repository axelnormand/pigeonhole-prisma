import { objectType } from 'nexus';

export const punbb_forum = objectType({
  name: 'punbb_forum',
  definition(t) {
    t.model.id();
    t.model.forum_name();
    t.model.forum_desc();
    t.model.cat_id();
    t.model.num_posts();
    t.model.num_topics();
    t.model.last_post();
    t.model.last_post_id();
    t.model.last_poster();
    t.model.disp_position();
    t.model.punbb_topics();
  },
});
