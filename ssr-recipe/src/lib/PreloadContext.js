/* PreloadContext - 서버 사이드 렌더링을 하는 과정에서 처리해야 할 작업들을 실행하고, 만약 기다려야 하는 promise가 있다면 프로미스들을 수집함
 *                - promise들을 수집한뒤, 해당 프로미스들이 끝날 때까지 기다렸다 그다음 다시 rendering하면 Data가 채워진채로 Component들이 나타남
 * Preloader Component - resolve 함수를 props로 받아 오며, 컴포넌트가 렌더링될 때 서버환경에서만 resolve함수를 호출해줌
 */

import { createContext, useContext } from 'react';

/* Client 환경 : null, Server 환경 : null */
const PreloadContext = createContext(null);
export default PreloadContext;

/* resolve는 함수타입 */
export const Preloader = ({ resolve }) => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null; //context 값이 유효하지 않다면 아무것도 하지 않음
    if (preloadContext.done) return null; //이미 작업이 끝났다면 아무것도 하지않음

    /* Promises 배열에 promise 등록
     * 만약 resolve 함수가 promise를 반환하지 않더라도, promise로 처리하기 위해 Promise.resolve 함수 사용 */
    preloadContext.promises.push(Promise.resolve(resolve()));
    return null;
};

/* Hook 형태로 사용할 수 있는 함수
 * usePreloader - Preloader 컴포넌트와 매우유사함, 단지 함수로 작성됐을뿐(해당 Hook을 UserContainer에서 사용) */
export const usePreloader = (resolve) => {
    const preloadContext = useContext(PreloadContext);
    if (!preloadContext) return null;
    if (preloadContext.done) return null;
    preloadContext.promises.push(Promise.resolve(resolve()));
};
