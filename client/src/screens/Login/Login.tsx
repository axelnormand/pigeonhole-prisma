import React, { useContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { observer } from 'mobx-react';
import type { AppStackParams } from '../../navigation/AppStack';
import { StoreContext } from '../../models';
import { setTokenInHeader } from '../../graphql/client';
import { LoginComponent } from './LoginComponent';

type Navigation = StackNavigationProp<AppStackParams, 'Login'>;
type Props = {
  navigation: Navigation;
};

export const Login: React.FC<Props> = observer(({ navigation }) => {
  const store = useContext(StoreContext);

  const handleSubmit = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { login } = await store.mutateLogin({
        username,
        password,
      });
      console.log(
        `Result ${login.loginResult}! ${username} with token ${login.token}`,
      );
      if (login.loginResult === 'ERROR') {
        throw Error('Server returned Error');
      }
      if (login.loginResult === 'INVALID') {
        return false;
      }

      if (!login.token) {
        throw Error('Server returned empty token');
      }
      setTokenInHeader(login.token);
      navigation.navigate('Home');
      return true;
    } catch (e) {
      console.log(`Can't login: ${e.message}`);
      throw e;
    }
  };

  return <LoginComponent onSubmit={handleSubmit} />;
});
