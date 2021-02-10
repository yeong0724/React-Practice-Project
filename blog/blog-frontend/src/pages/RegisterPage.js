import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';
import { Container, Col, Row } from 'react-bootstrap';

import palette from '../lib/styles/palette';
import Carousels from '../components/common/MainpageImg/Carousels';
import Particle from '../components/common/MainpageImg/Particle';
import Typing from '../components/common/MainpageImg/Typing';

const RegisterPage = () => {
    return (
        <Container style={{ background: `${palette.gray[2]}` }}>
            <>
                <Row>
                    <Col
                        lg={8}
                        style={{ paddingRight: '0px', paddingLeft: '0px' }}
                    >
                        <Carousels />
                        <Particle />
                        <Typing />
                    </Col>
                    <Col lg={4}>
                        <AuthTemplate>
                            <RegisterForm />
                        </AuthTemplate>
                    </Col>
                </Row>
            </>
        </Container>
    );
};

export default RegisterPage;
