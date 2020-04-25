import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input } from '@ui-kitten/components';
import { Formik, FormikErrors } from 'formik';
import { StackNavigationProp } from '@react-navigation/stack';
import { InferType, string, object } from 'yup';
import type { AppStackParams } from '../navigation/AppStack';
import { CentreScreen } from '../comps/CentreScreen';
import { LoadingAccessory } from '../comps/LoadingAccessory';

type Navigation = StackNavigationProp<AppStackParams, 'Login'>;
type Props = {
  navigation: Navigation;
};

const loginSchema = object().shape({
  username: string().required('Please enter your username'),
  password: string().required('Please enter your password'),
});

type LoginSchema = InferType<typeof loginSchema>;

export const Login: React.FC<Props> = ({ navigation }) => {
  const initialValues: LoginSchema = { username: '', password: '' };
  return (
    <CentreScreen>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: FormikErrors<LoginSchema> = {};
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={({ username }, { setSubmitting }) => {
          setTimeout(() => {
            console.log(`Submitting ${username}`);
            setSubmitting(false);
          }, 1000);
        }}
      >
        {({ handleSubmit, values, isSubmitting, errors }) => (
          <>
            <Input
              placeholder="Username"
              status={errors.username ? 'danger' : ''}
              caption={errors.username || ''}
              value={values.username}
            />
            <Input
              placeholder="Password"
              status={errors.password ? 'danger' : ''}
              caption={errors.password || ''}
              value={values.password}
              secureTextEntry
            />
            <Button
              onPress={(e) => handleSubmit(e as any)}
              disabled={isSubmitting}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
    </CentreScreen>
  );
};
