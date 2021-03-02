<template>
  <div class="search-box">
    <a-form-model layout="inline"
                  :model="searchFrom"
                  @submit="handleSubmit"
                  @submit.native.prevent>
      <a-form-model-item label="搜素关键字">
        <a-input v-model="searchFrom.searchWord"
                 placeholder="请输入关键字">

        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select show-search
                  placeholder="请选择商品类目"
                  style="width: 200px"
                  @change="handleChange"
                  allowClear>

          <a-select-option v-for="c in categoryList"
                           :key="c.id"
                           :value="c.id">
            {{c.name}}
          </a-select-option>

        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary"
                  html-type="submit">
          搜素
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/category';

export default {
  data() {
    return {
      categoryList: [],
      searchFrom: {
        searchWord: '',
        category: '',
      },
    };
  },
  created() {
    api.categoryList().then((res) => {
      this.categoryList = res.data;
      console.log(res);
    });
  },
  methods: {
    //   提交表单是触发的数据
    handleSubmit() {
      this.$emit('submit', this.searchFrom);
      console.log(this.searchFrom);
    },
    // 切换类目是触发的函数
    handleChange(val) {
      this.searchFrom.category = val;
    },
  },
};
</script>

<style lang="less">
.search-box{
    padding: 10px 10px 10px 40px;
}
</style>
