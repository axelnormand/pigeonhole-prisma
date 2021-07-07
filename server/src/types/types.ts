import { objectType, enumType } from 'nexus';
import { punbb_post } from './punbb_post';

export enum LoginResultType {
  SUCCESS = 'SUCCESS',
  INVALID = 'INVALID',
  ERROR = 'ERROR',
}

export const LoginResult = enumType({
  name: 'LoginResult',
  members: LoginResultType,
});

export const UpdateResult = objectType({
  name: 'UpdateResult',
  definition(t) {
    t.boolean('success');
  },
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nullable.string('token');
    t.field('loginResult', {
      type: LoginResult,
    });
  },
});

export const PostsResult = objectType({
  name: 'PostsResult',
  definition(t) {
    t.list.field('posts', {
      type: punbb_post,
    });
    t.string('topicName');
    t.int('currentPage');
    t.int('totalPages')
    t.int('totalPosts')
  },
});

