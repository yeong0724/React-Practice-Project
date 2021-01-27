/* eslint-disable */
import React, { useEffect, useState, useContext, Component } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import axios from 'axios';
import { 재고context } from './App.js';
import { Nav } from 'react-bootstrap';

let 박스 = styled.div`
    padding: 20px;
`;
let 제목 = styled.h4`
    font-size: 25px;
    color: ${(props) => props.색상};
`;

//class Detail2 extends React.Component {
//  componentDidmount() {}
//Detail2 컴포넌트가 Mount 되고나서 실행할 코드
//  componentWillUnmount() {}
//Detail2 컴포넌트가 unmount 되기전에 실행할 코드
//}

function Detail(props) {
    let [alert, alert변경] = useState(true);
    let [inputData, inputData변경] = useState('');
    let [누른탭, 누른탭변경] = useState(0);
    let 재고 = useContext(재고context);
    useEffect(() => {
        axios.get();
        let 타이머 = setTimeout(() => {
            alert변경(false);
        }, 2000);
        console.log('안녕');
        return () => {
            clearTimeout(타이머);
        };
    }, [alert]);

    let { id } = useParams();
    let history = useHistory();
    let 찾은상품 = props.shoes.find(function (상품) {
        return 상품.id == id;
    });
    return (
        <div className="container">
            <박스>
                <제목 className="red">Detail</제목>
            </박스>
            {inputData}
            <input
                onChange={(e) => {
                    inputData변경(e.target.value);
                }}
            />
            {alert === true ? (
                <div className="my-alert">
                    <p style={{ color: 'red' }}>재고가 얼마남지 않았습니다</p>
                </div>
            ) : null}
            <div className="row">
                <div className="col-md-6">
                    <img
                        src="http://codingapple1.github.io/shop/shoes1.jpg"
                        width="100%"
                    />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p style={{ color: 'red' }}>{찾은상품.price}</p>
                    <Info 재고={props.재고}></Info>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            props.재고변경([9, 10, 11]);
                        }}
                    >
                        주문하기
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        뒤로가기
                    </button>
                </div>
            </div>
            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link
                        eventKey="link-0"
                        onClick={() => {
                            누른탭변경(0);
                        }}
                    >
                        Active
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey="link-1"
                        onClick={() => {
                            누른탭변경(1);
                        }}
                    >
                        Option 2
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent />
        </div>
    );
}

function TabContent(props) {
    if (props.누른탭 === 0) {
        return <div>0번째내용입니다</div>;
    } else if (props.누른탭 === 1) {
        return <div>1번째내용입니다</div>;
    } else if (props.누른탭 === 2) {
        return <div>2번째내용입니다</div>;
    }
}

function Info(props) {
    return <p>재고:{props.재고[0]}</p>;
}

export default Detail;
