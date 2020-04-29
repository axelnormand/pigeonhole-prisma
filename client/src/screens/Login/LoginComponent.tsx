import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
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
import { Screen } from '../../comps/Screen';
import { FormRow } from '../../comps/FormRow';
import { PageTitle } from '../../comps/PageTitle';
import { FormLoading } from '../../comps/FormLoading';

type Props = {
  onSubmit: (username: string, password: string) => Promise<boolean>;
};

const loginSchema = object().shape({
  username: string().required('Please enter your username'),
  password: string().required('Please enter your password'),
});

type LoginSchema = InferType<typeof loginSchema>;
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
      <Screen isCentre>
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
              <PageTitle>Welcome to the Pigeon Hole</PageTitle>

              <FormRow>
                <Input
                  placeholder="Username"
                  status={submitCount && errors.username ? 'danger' : ''}
                  caption={(submitCount && errors.username) || ''}
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                />
              </FormRow>

              <FormRow>
                <Input
                  placeholder="Password"
                  status={submitCount && errors.password ? 'danger' : ''}
                  caption={(submitCount && errors.password) || ''}
                  value={values.password}
                  secureTextEntry={!isShowingPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  icon={(style) => (
                    <Icon
                      {...style}
                      name={isShowingPassword ? 'eye-off' : 'eye'}
                    />
                  )}
                  onIconPress={() => setIsShowingPassword(!isShowingPassword)}
                />
              </FormRow>

              {isFailed && (
                <FormRow>
                  <Text category="s1" status="danger">
                    Sorry invalid username/password please try again
                  </Text>
                </FormRow>
              )}

              <FormRow>
                <Button
                  onPress={(e) => handleSubmit(e as any)}
                  disabled={isSubmitting || !isValid || isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </FormRow>

              {isLoading && <FormLoading />}
            </>
          )}
        </Formik>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 192,
  },
});
