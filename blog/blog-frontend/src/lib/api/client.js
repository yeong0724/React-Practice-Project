/* <axios 인스턴스 장점>
 * 1. axios 인스턴스를 만들어 놓으면 이후 API Client에 공통된 설정을 쉽게 넣어 줄 수 있음
 * 2. axios를 사용하지 않는 상황에 쉽게 Client를 교체 할 수 있음
 * (만약 인스턴스가 없다면, application에서 발생하는 모든 요청에 대해 설정하게 되므로 다른 API Server를 이용하기가 어려워짐)
 */
import axios from 'axios';

const client = axios.create();

/*
  글로벌 설정 예시:
  
  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL = 'https://external-api-server.com/' 

  // 헤더 설정
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

  // 인터셉터 설정
  axios.intercepter.response.use(\
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    }, 
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error);
    }
  })  
*/

export default client;
