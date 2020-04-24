import React from 'react';
import { CentreScreen } from './CentreScreen';
import { Text, Divider } from '@ui-kitten/components';

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
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <CentreScreen>
          <Text status="danger">
            💥 Oops, something went wrong. Please restart.
          </Text>
          <Divider>
            <Text appearance="hint">{this.state.errorMsg}</Text>
          </Divider>
        </CentreScreen>
      );
    }

    return this.props.children;
  }
}
