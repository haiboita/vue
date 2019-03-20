<template>
  <xk-order :orderType="2"/>
  <!-- 0:待发货，1：已发货，2：已签收 -->
</template>

<script>
import XkOrder from "./components/XkOrder";
export default {
  name: "signedOrder",
  components: { XkOrder },
  filters: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
</style>