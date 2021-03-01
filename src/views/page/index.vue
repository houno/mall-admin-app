<template>
    <div>
        <div class="index">
                <card />
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
