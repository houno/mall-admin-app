// 所有类目接口
import axios from '@/axios';

export default {
  categoryList(params) {
    return axios.get('/category/all', params);
  },
};
