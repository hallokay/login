import axios from 'axios';
export default axios.create({
    baseURL: "http://localhost:3500"
    // 이건 나중엔 env로 갑추기
})