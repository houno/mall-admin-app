<template>
  <div>
    <div class="index">
      <!-- 卡片 -->
      <card />
      <!-- 统计图 -->
      <carts />
    </div>
  </div>
</template>

<script>
import Card from '@/components/card.vue';

import Carts from '../../components/carts.vue';

export default {
  components: {
    Card,
    Carts,
  },
};
</script>
