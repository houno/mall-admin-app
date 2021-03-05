<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit"
                :data='categoryList' />
                <a-button class="product-add-btn" >
                    <router-link :to="{name:'ProductAdd'}">
                        添加商品
                    </router-link>
                    </a-button>
    <!-- 表格 -->
    <products-table :data='tableData'
                    :page='page'
                    @change='changePage'
                    @edit="editProduct"
                    @remove="removeProduct" />
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
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">
        {`确认删除标题为:${record.title}的商品`}
        </div>,
        onOk: () => {
          api.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'comfirm-box',
      });
    },
  },
};
</script>

<style lang="less">
.product-list{
    position: relative;
.product-add-btn{
    position: absolute;
    right: 10px;
    top: 14px;

}
}

</style>
