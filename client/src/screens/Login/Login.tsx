import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { StoreContext } from '../../models';
import { setTokenInHeader } from '../../graphql/client';
import { LoginComponent } from './LoginComponent';
import { LoginScreenProps } from '../../navigation/AppStack';

export const Login: React.FC = observer(() => {
  const store = useContext(StoreContext);
  const navigation = useNavigation<LoginScreenProps>();

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
