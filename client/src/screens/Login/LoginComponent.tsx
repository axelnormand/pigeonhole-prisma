import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Button, Input, Text, Icon } from '@ui-kitten/components';
import { Formik } from 'formik';
import { InferType, string, object } from 'yup';
import { Page } from '../../comps/Page';
import { FormRow } from '../../comps/FormRow';
import { PageTitle } from '../../comps/PageTitle';
import { CentreLoading } from '../../comps/CentreLoading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParams } from '../../navigation/AppStack';

type Props = {
  onSubmit: (username: string, password: string) => Promise<boolean>;
};

type NavProps = StackNavigationProp<AppStackParams, 'Login'>;

const loginSchema = object().shape({
  username: string().required('Please enter your username'),
  password: string().required('Please enter your password'),
});

type LoginSchema = InferType<typeof loginSchema>;
export const LoginComponent: React.FC<Props> = ({ onSubmit }) => {
  const navigation = useNavigation<NavProps>();
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
      <Page>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={async ({ username, password }, { setSubmitting }) => {
            console.log(`Submitting ${username}`);
            setIsFailed(false);
            setIsLoading(true);
            const success = await onSubmit(username, password);
            if (success) {
              navigation.navigate('Home');
            } else {
              setIsFailed(true);
            }
            setIsLoading(false);
            setSubmitting(false);
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
