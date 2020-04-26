import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { Formik, FormikErrors } from 'formik';
import { StackNavigationProp } from '@react-navigation/stack';
import { InferType, string, object } from 'yup';
import type { AppStackParams } from '../navigation/AppStack';
import { CentreScreen } from '../comps/CentreScreen';

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
    <CentreScreen style={{ paddingLeft: 20, paddingRight: 20 }}>
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
            <Text category="h5" style={{ marginBottom: 10 }}>
              Welcome to the Pigeon Hole
            </Text>
            <Input
              placeholder="Username"
              status={errors.username ? 'danger' : ''}
              caption={errors.username || ''}
              value={values.username}
              style={styles.row}
            />
            <Input
              placeholder="Password"
              status={errors.password ? 'danger' : ''}
              caption={errors.password || ''}
              value={values.password}
              secureTextEntry
              style={styles.row}
            />
            <Button
              onPress={(e) => handleSubmit(e as any)}
              disabled={isSubmitting}
              style={styles.row}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
    </CentreScreen>
  );
};

const styles = StyleSheet.create({
  row: {
    marginTop: 10,
  },
});
