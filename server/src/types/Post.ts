import { objectType } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.poster_id();
    t.model.message();
    t.model.posted();
    t.model.edited();
    t.model.edited_by();
  },
});
