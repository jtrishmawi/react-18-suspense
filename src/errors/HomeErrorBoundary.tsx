import React, { Component } from "react";

export class HomeErrorBoundary extends Component<
  { children?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <p
          role="alert"
          className="p-8 text-center font-semibold text-red-700 dark:text-red-500"
        >
          Something went wrong. Please refresh the page.
        </p>
      );
    }

    return this.props.children;
  }
}

export default HomeErrorBoundary;
