import { objectType, enumType } from '@nexus/schema';

export enum LoginResultType {
  SUCCESS = 'SUCCESS',
  INVALID = 'INVALID',
  ERROR = 'ERROR',
}

export const LoginResult = enumType({
  name: 'LoginResult',
  members: LoginResultType,
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token', { nullable: true });
    t.field('loginResult', {
      type: LoginResult,
    });
  },
});
