import React, { Component } from 'react';

class Hello extends Component {
    static defaultProps = {
        name: '이름없음',
    };
    render() {
        const { color, name, isSpecial } = this.props;
        return (
            <div style={{ color }}>
                {isSpecial && <b>*</b>}
                안녕하세요 {name}
            </div>
        );
    }
}

/* 기본 defaultProps 값을 설정하는 방법 - 1 */
// Hello.defaultProps = {
//     name: '이름없음',
// };

export default Hello;

/* 함수형 컴포넌트 */
// import React from 'react';

// function Hello({ color, name, isSpecial }) {
//   return (
//     <div style={{ color }}>
//       {isSpecial && <b>*</b>}
//       안녕하세요 {name}
//     </div>
//   );
// }

// Hello.defaultProps = {
//   name: '이름없음'
// };

// export default Hello;
