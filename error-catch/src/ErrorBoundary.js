import React, { Component } from 'react';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends Component {
    state = {
        error: false,
    };
    /* componentDidCatch 메서드에는 두개의 파라미터를 사용하게 되는데
     * 첫번째 파라미터는 에러의 내용, 두번째 파라미터에서는 에러가 발생한 위치를 알려줍니다.
     */
    componentDidCatch(error, info) {
        console.log('에러가 발생했습니다.');
        console.log({
            error,
            info,
        });
        this.setState({
            error: true,
        });
        if (process.env.NODE_ENV === 'production') {
            Sentry.captureException(error, { extra: info });
        }
    }

    render() {
        if (this.state.error) {
            return <h1>에러 발생!</h1>;
        }
        return this.props.children;
        //error가 발생하지 않았다면 this.props.children가 App.js로 반환되고 결과적으로 ErrorBoundary의 자식인 User Component가 화면에 출력됨
    }
}

export default ErrorBoundary;
