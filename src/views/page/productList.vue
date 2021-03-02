<template>
    <div class="product-list">
       <!-- 搜索 -->
       <search-box :submit="searchSubmit"/>
       <!-- 表格 -->
    </div>
</template>

<script>
import SearchBox from '../../components/search.vue';

export default {
  components: {
    SearchBox,

  },
  methods: {
    searchSubmit(from) {
      console.log(from);
    },
  },
};
</script>
