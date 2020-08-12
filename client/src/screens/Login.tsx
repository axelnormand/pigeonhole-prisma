import React, { useState, useContext } from 'react';
import { StyleSheet, ImageBackground, Keyboard } from 'react-native';
import { Button, Input, Text, Icon } from '@ui-kitten/components';
import { Formik } from 'formik';
import { InferType, string, object } from 'yup';
import { StoreContext } from '../models';
import { Page } from '../comps/Page';
import { PageTitle } from '../comps/PageTitle';
import { FormRow } from '../comps/FormRow';
import { CentreLoading } from '../comps/CentreLoading';

const loginSchema = object().shape({
  username: string().required('Please enter your username'),
  password: string().required('Please enter your password'),
});

type LoginSchema = InferType<typeof loginSchema>;

export const Login: React.FC = () => {
  const initialValues: LoginSchema = { username: '', password: '' };
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const store = useContext(StoreContext);

  return (
    <>
      <ImageBackground
        style={styles.appBar}
        source={require('../../assets/login-background.png')}
      />
      <Page keyboardShouldPersistTaps="always">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={async ({ username, password }, { setSubmitting }) => {
            try {
              console.log(`Submitting ${username}`);
              setIsFailed(false);
              setIsLoading(true);
              await store.login(username, password);
              if (!store.isAuthorized) {
                setIsFailed(true);
              }
              setIsLoading(false);
              setSubmitting(false);
            } catch (e) {
              console.error(e);
            } finally {
              setIsLoading(false);
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  onSubmitEditing={Keyboard.dismiss}
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
                    Sorry invalid login, please try again
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

              {isLoading && <CentreLoading />}
            </>
          )}
        </Formik>
      </Page>
    </>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 192,
  },
});
