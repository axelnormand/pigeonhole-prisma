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
import { InferType, string, object } from 'yup';

type Props = {
  onSubmit: (username: string, password: string) => Promise<boolean>;
};

const loginSchema = object().shape({
  username: string().required('Please enter your username'),
  password: string().required('Please enter your password'),
});

type LoginSchema = InferType<typeof loginSchema>;

const margin = 15;
export const LoginComponent: React.FC<Props> = ({ onSubmit }) => {
  const initialValues: LoginSchema = { username: '', password: '' };
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  return (
    <>
      <ImageBackground
        style={styles.appBar}
        source={require('../../../assets/login-background.png')}
      />
      <Layout style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={async ({ username, password }, { setSubmitting }) => {
            console.log(`Submitting ${username}`);
            setIsLoading(true);
            const success = await onSubmit(username, password);
            if (!success) {
              setIsLoading(false);
              setIsFailed(true);
              setSubmitting(false);
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
              {isFailed && (
                <Text
                  category="s1"
                  status="danger"
                  style={{ marginBottom: margin }}
                >
                  Sorry invalid username/password please try again
                </Text>
              )}
              <Button
                onPress={(e) => handleSubmit(e as any)}
                disabled={isSubmitting || !isValid || isLoading}
                style={{ marginTop: margin }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              {isLoading && <Spinner size="giant" style={styles.row} />}
            </>
          )}
        </Formik>
      </Layout>
    </>
  );
};

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
