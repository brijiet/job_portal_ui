import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return(
        <div className="flex justify-center items-center flex-col bg-gradient-to-r from-[#EEF2FF] to-[#C7D2FE] h-screen">
          <div className="flex justify-center items-center">
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}somethingWentWrong.svg`} height="30%" width="30%" />
          </div>
            <h1 className=" text-4xl font-bold mt-5">Something went wrong !.</h1>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;