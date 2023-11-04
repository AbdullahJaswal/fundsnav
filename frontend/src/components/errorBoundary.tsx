import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex h-[calc(100vh-200px)]">
          <div className="m-auto flex flex-col gap-2">
            <h2 className="text-xl text-primary text-center">Error - Something went wrong</h2>

            <button
              type="button"
              className="btn btn-primary btn-outline mx-auto hover:background-glow-primary"
              onClick={() => window.location.reload()}
            >
              Try again?
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
