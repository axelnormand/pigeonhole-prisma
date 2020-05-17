import React from 'react';
import { CentreScreen } from './CentreScreen';
import { Text, Button } from '@ui-kitten/components';
import { FormRow } from './FormRow';
import { clearTokenInHeader } from '../graphql/client';
import { NavigationContext } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
  errorMsg?: string;
  isTokenCleared: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  static contextType = NavigationContext;
  state: State = { hasError: false, isTokenCleared: false };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error Boundary: ${error.message}`, error, errorInfo);
    this.setState({ errorMsg: error.message, hasError: true });
  }

  render() {
    if (this.state.hasError) {
      const navigation = this.context;
      return (
        <CentreScreen>
          <FormRow>
            <Text status="danger" category="h5">
              💥 Oops, something went wrong
            </Text>
          </FormRow>

          <FormRow>
            <Button
              onPress={() => {
                clearTokenInHeader();
                this.setState({ isTokenCleared: true });
              }}
              disabled={this.state.isTokenCleared}
            >
              Clear Login Token
            </Button>
          </FormRow>

          <Text appearance="hint">{this.state.errorMsg}</Text>
        </CentreScreen>
      );
    }

    return this.props.children;
  }
}
