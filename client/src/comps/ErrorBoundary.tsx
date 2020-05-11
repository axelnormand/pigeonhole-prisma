import React from 'react';
import { CentreScreen } from './CentreScreen';
import { Text } from '@ui-kitten/components';

type Props = {
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
  errorMsg?: string;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error Boundary: ${error.message}`, error, errorInfo);
    this.setState({ errorMsg: error.message, hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <CentreScreen>
          <Text status="danger">
            💥 Oops, something went wrong. Please restart.
          </Text>

          <Text appearance="hint">{this.state.errorMsg}</Text>
        </CentreScreen>
      );
    }

    return this.props.children;
  }
}
