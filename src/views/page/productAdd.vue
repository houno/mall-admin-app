<template>
  <div class="product-detail">
    <a-steps :current="current"
             class="peoduct-steps">
      <a-step v-for="item in steps"
              :key="item.title"
              :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <basic-detail v-if="current ===0" @next="next" />
      <sale-detail v-else-if="current ===1" />
    </div>
  </div>
</template>

<script>
import BasicDetail from '@/components/basicDetail.vue';
import SaleDetail from '@/components/saleDetail.vue';

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  methods: {
    next() {
      this.current += 1;
      console.log(this.form);
    },
    prev() {
      this.current -= 1;
    },
  },
  components: {
    BasicDetail,
    SaleDetail,
  },
};
</script>

<style lang="less" scoped>
.product-detail {
  .peoduct-steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
