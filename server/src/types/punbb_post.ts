import { objectType } from '@nexus/schema';

export const punbb_post = objectType({
  name: 'punbb_post',
  definition(t) {
    t.model.id();
    t.model.poster_id();
    t.model.message();
    t.model.posted();
    t.model.edited();
    t.model.edited_by();
  },
});
