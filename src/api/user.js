// 对于用户操作的接口管理
import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params);
  },
  code(params) {
    return axios.post('/passport/getCode', params);
  },
  enroll(params) {
    return axios.post('/passport/logon', params);
  },
};
