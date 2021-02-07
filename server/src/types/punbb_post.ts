import { objectType } from 'nexus';

export const punbb_post = objectType({
  name: 'punbb_post',
  definition(t) {
    t.model.id();
    t.model.poster_id();
    t.model.message();
    t.model.posted();
    t.model.poster();
    t.model.edited();
    t.model.edited_by();
    t.model.punbb_user();
  },
});
