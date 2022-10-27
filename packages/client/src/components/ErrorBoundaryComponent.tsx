import React, {Component, ErrorInfo, ReactNode} from 'react';

type TProps = {
  children: ReactNode;
}
type TState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

export class ErrorBoundaryComponent extends Component<TProps, TState> {
  public state: TState = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({hasError: true, error, errorInfo});
  }

  render() {
    if (this.state.hasError) {
      return (
          <div style={{
            whiteSpace: 'pre-wrap',
            padding: '20px',
            border: '1px solid #ffffff3b',
            margin: '20px',
          }}>
            <h2>Что-то пошло не так...</h2>
            <details style={{whiteSpace: 'pre-wrap', padding: '20px'}}>
              {this.state.error && this.state.error.toString()}
            </details>
          </div>
      );
    }

    return this.props.children;
  }
}