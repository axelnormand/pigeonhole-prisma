import React, { useState, useContext } from 'react';
import { StyleSheet, Platform, ImageBackground } from 'react-native';
import {
  Button,
  Input,
  Text,
  Icon,
  Layout,
  Spinner,
} from '@ui-kitten/components';
import { Formik } from 'formik';
import { StackNavigationProp } from '@react-navigation/stack';
import { InferType, string, object } from 'yup';
import { observer } from 'mobx-react';
import type { AppStackParams } from '../../navigation/AppStack';
import { StoreContext } from '../../models';
import { setTokenInHeader } from '../../graphql/client';

type Navigation = StackNavigationProp<AppStackParams, 'Login'>;
type Props = {
  navigation: Navigation;
};

const loginSchema = object().shape({
  username: string().required('Please enter your username'),
  password: string().required('Please enter your password'),
});

type LoginSchema = InferType<typeof loginSchema>;

const margin = 15;
export const Login: React.FC<Props> = observer(({ navigation }) => {
  const initialValues: LoginSchema = { username: '', password: '' };
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailedLogin, setIsError] = useState(false);

  const store = useContext(StoreContext);

  return (
    <>
      <ImageBackground
        style={styles.appBar}
        source={require('../../assets/login-background.png')}
      />
      <Layout style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={async ({ username, password }, { setSubmitting }) => {
            console.log(`Submitting ${username}`);
            setIsLoading(true);

            try {
              const { login } = await store.mutateLogin({
                username,
                password,
              });
              console.log(`Success! ${username} and got token ${login.token}`);
              if (!login.token) {
                throw Error('Server returned empty token');
              }
              setTokenInHeader(login.token);
              navigation.navigate('Home');
            } catch (e) {
              console.log(`Can't login: ${e.message}`);
            } finally {
              setSubmitting(false);
              setIsLoading(false);
            }
          }}
        >
          {({
            handleSubmit,
            values,
            isSubmitting,
            errors,
            handleChange,
            handleBlur,
            isValid,
            submitCount,
          }) => (
            <>
              <Text category="h5" style={{ marginBottom: margin }}>
                Welcome to the Pigeon Hole
              </Text>
              <Input
                placeholder="Username"
                status={submitCount && errors.username ? 'danger' : ''}
                caption={(submitCount && errors.username) || ''}
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                style={styles.row}
              />
              <Input
                placeholder="Password"
                status={submitCount && errors.password ? 'danger' : ''}
                caption={(submitCount && errors.password) || ''}
                value={values.password}
                secureTextEntry={!isShowingPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.row}
                icon={(style) => (
                  <Icon
                    {...style}
                    name={isShowingPassword ? 'eye-off' : 'eye'}
                  />
                )}
                onIconPress={() => setIsShowingPassword(!isShowingPassword)}
              />
              <Button
                onPress={(e) => handleSubmit(e as any)}
                disabled={isSubmitting || !isValid || isLoading}
                style={{ marginTop: margin }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              {isLoading && <Spinner size="giant" style={styles.row} />}
              {isError && (
                <Text
                  category="s1"
                  status="danger"
                  style={{ marginBottom: margin }}
                >
                  Sorry invalid username/password please try again
                </Text>
              )}
            </>
          )}
        </Formik>
      </Layout>
    </>
  );
});

const styles = StyleSheet.create({
  appBar: {
    height: 192,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  row: {
    marginTop: margin,
    minWidth: Platform.OS === 'web' ? 400 : undefined,
  },
});
