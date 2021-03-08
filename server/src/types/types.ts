import { objectType, enumType } from 'nexus';

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
