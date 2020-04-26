import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Button, Input, Text, Icon, Layout } from '@ui-kitten/components';
import { Formik, FormikErrors } from 'formik';
import { StackNavigationProp } from '@react-navigation/stack';
import { InferType, string, object } from 'yup';
import type { AppStackParams } from '../navigation/AppStack';
import { CentreScreen } from '../comps/CentreScreen';
import { useSafeArea } from 'react-native-safe-area-context';

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
export const Login: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeArea();
  const initialValues: LoginSchema = { username: '', password: '' };
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  return (
    <Layout style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={({ username }, { setSubmitting }) => {
          setTimeout(() => {
            console.log(`Submitting ${username}`);
            setSubmitting(false);
          }, 1000);
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
                <Icon {...style} name={isShowingPassword ? 'eye-off' : 'eye'} />
              )}
              onIconPress={() => setIsShowingPassword(!isShowingPassword)}
            />
            <Button
              onPress={(e) => handleSubmit(e as any)}
              disabled={isSubmitting || !isValid}
              style={{ marginTop: margin }}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    marginTop: margin,
    minWidth: Platform.OS === 'web' ? 400 : undefined,
  },
});
