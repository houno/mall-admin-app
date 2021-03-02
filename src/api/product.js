import axios from '@/axios';

export default {
  categoryList(params) {
    return axios.get('/category/all', params);
  },
};
