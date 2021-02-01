/* React.FC 사용 방식 - 다양한 이유에서 사용 비추천, function 형태를 사용할 것 */
import React from 'react';

type GreetingsProps = {
    name: string;
    mark?: string;
    optional?: string;
    onClick: (name: string) => void;
    //children:React.ReactNode
};

/* <React.FC 사용의 장점>
 * 1. children props가 기본적으로 탑재되어 있음 ({ children })
 * 2. Component의 defaultProps, propTypes, contextTypes를 설정 할 때 자동완성 가능 */
const Greetings: React.FC<GreetingsProps> = ({ name, mark = '!', optional, onClick }) => {
    const handleClick = () => onClick(name);
    return (
        <div>
            {`Hello, ${name}${mark}`}
            {optional && <p>{optional}</p>}
            <div>
                <button onClick={handleClick}>Click Me</button>
            </div>
        </div>
    );
};

/* React.FC를 사용하게 되면 defaultProps가 올바르게 동작하지 않음
 * - props를 받는 곳에서 값을 선언해주고, 변수는 '?'를 붙여서 선언해준다 */
// Greetings.defaultProps = {
//     mark: '!',
// };

export default Greetings;

// import React from 'react';

// type GreetingsProps = {
//     name: string;
//     mark: string;
//     optional?: string;
//     onClick: (name: string) => void; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
// };

// function Greetings({ name, mark, optional, onClick }: GreetingsProps) {
//     const handleClick = () => onClick(name);
//     return (
//         <div>
//             Hello, {name} {mark}
//             {optional && <p>{optional}</p>}
//             <div>
//                 <button onClick={handleClick}>Click Me</button>
//             </div>
//         </div>
//     );
// }

// Greetings.defaultProps = {
//     mark: '!',
// };

// export default Greetings;
