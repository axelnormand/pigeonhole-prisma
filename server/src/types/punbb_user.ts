import { objectType } from 'nexus';

export const punbb_user = objectType({
  name: 'punbb_user',
  definition(t) {
    t.model.id();
    t.model.username();
    t.model.signature();
    t.model.registered();
    t.model.last_visit();
    t.model.last_post();
    t.model.tokens();
  },
});
