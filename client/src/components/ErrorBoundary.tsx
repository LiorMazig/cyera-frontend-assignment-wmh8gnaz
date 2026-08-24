import { Component, ErrorInfo, ReactNode } from 'react';
import { CrashFallback } from './CrashFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Without this, any render-time throw unmounts the whole tree and leaves a
 * blank page — a missing provider or a bad translation key is indistinguishable
 * from a dead server. Class component because only these can catch renders.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Unhandled render error', error, errorInfo);
  }

  render(): ReactNode {
    const { error } = this.state;

    if (error) return <CrashFallback error={error} />;

    return this.props.children;
  }
}
