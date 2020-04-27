import React, { useState } from 'react';
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
import type { AppStackParams } from '../navigation/AppStack';
import { useQuery } from '../models';

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
  const { store, data, loading, error } = useQuery();

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
            const query = store.mutateLogin({ username, password });
            await query;
            setSubmitting(false);
            console.log(`Submitted! ${username}`, query);
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
                style={styles.input}
              />
              <Input
                placeholder="Password"
                status={submitCount && errors.password ? 'danger' : ''}
                caption={(submitCount && errors.password) || ''}
                value={values.password}
                secureTextEntry={!isShowingPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.input}
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
                disabled={isSubmitting || !isValid || loading}
                style={{ marginTop: margin }}
              >
                Login
              </Button>
              {loading && <Spinner />}
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
  input: {
    marginTop: margin,
    minWidth: Platform.OS === 'web' ? 400 : undefined,
  },
});
