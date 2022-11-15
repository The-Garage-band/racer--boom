import React, { Component, ReactNode } from 'react'

type TProps = {
  children: ReactNode
}
type TState = {
  hasError: boolean
  error?: Error
}

export class ErrorBoundaryComponent extends Component<TProps, TState> {
  public state: TState = {
    hasError: false,
  }

  componentDidCatch(error: Error) {
    console.error('Uncaught error:', error)
    this.setState({ hasError: true, error })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            padding: '20px',
            border: '1px solid #ffffff3b',
            margin: '20px',
          }}>
          <h2>Что-то пошло не так...</h2>
          <details style={{ whiteSpace: 'pre-wrap', padding: '20px' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
