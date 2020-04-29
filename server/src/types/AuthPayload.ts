import { objectType, enumType } from '@nexus/schema';

export const LoginResult = enumType({
  name: 'LoginResult',
  members: ['SUCCESS', 'INVALID', 'ERROR'],
});

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('loginResult', {
      type: LoginResult,
    });
  },
});
