import { objectType } from 'nexus';

export const User = objectType({
  name: 'punbb_users',
  definition(t) {
    t.model.id();
    t.model.username();
    t.model.signature();
    t.model.registered();
    t.model.last_visit();
    t.model.last_post();
  },
});
