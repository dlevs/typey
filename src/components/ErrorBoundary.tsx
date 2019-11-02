import { Component, ReactNode } from 'react'
import { RequestError } from '../lib/fetchUtils'

interface Props {
  errorKey: string
  fallback?: ReactNode
  fallbackMap?: {
    default: ReactNode
    [key: number]: ReactNode
  }
}

export default class ErrorBoundary extends Component<Props> {
  state = {
    error: null as null | Error | RequestError,
    errorKey: null as null | string
  };

  componentDidCatch(error: Error) {
    const { errorKey } = this.props
    this.setState({ error, errorKey });
  }

  render() {
    const { children, fallback, fallbackMap, errorKey } = this.props
    const { error, errorKey: stateErrorKey } = this.state

    if (error && errorKey === stateErrorKey) {
      if (fallbackMap) {
        if ('statusCode' in error && fallbackMap[error.statusCode]) {
          return fallbackMap[error.statusCode]
        }
        return fallbackMap.default
      } else {
        return fallback;
      }
    }

    return children;
  }
}
