import { Instance, types, flow } from 'mobx-state-tree';
import { RootStoreBase } from './RootStore.base';
import { getBearerToken } from '../graphql/init';
import { setTokenInHeader, clearTokenInHeader } from '../graphql/client';
import {
  AuthPayloadModelType,
  AuthPayloadModelSelector,
} from './AuthPayloadModel';
import { LoginResult } from './LoginResultEnum';

export interface RootStoreType extends Instance<typeof RootStore.Type> {}

export const RootStore = RootStoreBase.props({
  token: types.string,
})
  .views((self) => ({
    get isAuthorized() {
      return !!self.token;
    },
  }))
  .actions((self) => ({
    loadToken: flow(function* loadToken() {
      try {
        const token = yield getBearerToken();
        if (token) {
          console.log(`Got token from storage`);
          yield setTokenInHeader(token);
          self.token = token;
        }
      } catch (e) {
        console.error(`Error reading auth token: ${e.message}`);
      }
    }),
    //@ts-ignore PromiseLike in Query doesnt match Promise https://github.com/mobxjs/mst-gql/issues/227
    login: flow(function* login(username: string, password: string) {
      try {
        const {
          loginResult,
          token,
        }: { loginResult: LoginResult; token: string } = yield self.mutateLogin(
          {
            username,
            password,
          },
        );

        console.log(`Login Result ${loginResult} for ${username}`);
        switch (loginResult) {
          case LoginResult.ERROR:
            throw Error('Server returned Error');
          case LoginResult.INVALID:
            break;
          case LoginResult.SUCCESS:
            yield setTokenInHeader(token);
            self.token = token;
            break;
          default:
            const exhaustiveCheck: never = loginResult;
            throw new Error(
              `Missing loginResult switch case for ${exhaustiveCheck}`,
            );
        }
      } catch (e) {
        console.log(`Caught Error in login: ${e.message}`);
        throw e;
      }
    }),
    logout: flow(function* logout() {
      try {
        yield clearTokenInHeader();
        self.token = '';
      } catch (e) {
        console.error(`Error logging out: ${e.message}`);
      }
    }),
  }));
