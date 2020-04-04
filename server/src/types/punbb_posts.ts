import { objectType } from 'nexus';

export const punbb_posts = objectType({
  name: 'punbb_posts',
  definition(t) {
    t.model.id();
    t.model.poster_id();
    t.model.message();
    t.model.posted();
    t.model.edited();
    t.model.edited_by();
  },
});
