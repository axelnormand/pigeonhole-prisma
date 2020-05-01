import { objectType } from '@nexus/schema';

export const punbb_category = objectType({
  name: 'punbb_category',
  definition(t) {
    t.model.id();
    t.model.cat_name();
    t.model.disp_position();
    t.model.punbb_forum();
  },
});
