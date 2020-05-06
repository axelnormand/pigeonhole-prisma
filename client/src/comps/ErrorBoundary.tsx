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

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorMsg: error.message });
    console.error(`Error Boundary: ${error.message}`, error, errorInfo);
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
