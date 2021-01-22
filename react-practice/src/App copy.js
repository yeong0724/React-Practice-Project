import React, { useState } from 'react';
import './App.css';

function App() {
    let [글제목, 글제목변경] = useState(['여자코트ㅇㅇㅇㅇ추천', '강남']);
    let [글제목2, 글제목변경2] = useState('여자코트추천2');

    let posts = '강남고기맛집';
    return (
        <div className="App">
            <div className="black-nav">
                <div> 개발 BLOG</div>
            </div>

            <div className="list">
                <h3> {글제목[0]}</h3>
                <p>2월 17일 발행</p>
                <hr />
            </div>
        </div>
    );
}

export default App;
