import { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio rendering error:', error, info);
  }

  componentDidUpdate(previousProps) {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main id="main-content" className="error-fallback">
          <p className="eyebrow"><span />KDM portfolio</p>
          <h1>Something went wrong.</h1>
          <p>The portfolio could not finish loading. Please refresh the page or return home.</p>
          <Link className="button button-primary" to="/" onClick={this.resetError}>Return home</Link>
        </main>
      );
    }

    return this.props.children;
  }
}

export function RouteErrorBoundary({ children }) {
  const location = useLocation();
  return <ErrorBoundary resetKey={location.key}>{children}</ErrorBoundary>;
}
