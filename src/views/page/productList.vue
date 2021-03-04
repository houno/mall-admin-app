<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit"
                :data='categoryList' />
    <!-- 表格 -->
    <products-table :data='tableData'
                    :page='page'
                    @change='changePage' />
  </div>
</template>

<script>
import api from '@/api/product';
import CategoryApi from '@/api/category';
import ProductsTable from '../../components/productsTable.vue';
import SearchBox from '../../components/search.vue';

export default {
  data() {
    return {
      tableData: [],
      categoryList: [],
      searchForm: {},
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    SearchBox,
    ProductsTable,
  },
  async created() {
    await CategoryApi.categoryList().then((res) => {
      this.categoryList = res.data;
      console.log(res);
      res.data.forEach((item) => {
        if (!this.categoryObj[item.id]) {
          this.categoryObj[item.id] = item;
        }
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          console.log(res);
          this.page.total = res.total;
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
  },
};
</script>
