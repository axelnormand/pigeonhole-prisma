import { objectType } from 'nexus';

export const punbb_userthread = objectType({
  name: 'punbb_userthread',
  definition(t) {
    t.model.forum();
    t.model.last_read();
    t.model.posted();
    t.model.thread();
    t.model.user();
  },
});
