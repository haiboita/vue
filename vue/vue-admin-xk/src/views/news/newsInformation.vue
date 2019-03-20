<template>
  <xk-table :url="url" :id="2"/>
</template>

<script>
import XkTable from "./components/XkTable";

export default {
  name: "newsInformation",

  components: { XkTable },
  filters: {},
  data() {
    return {
      url: "/companyNews/getNewsInformation"
    };
  },
  methods: {}
};
</script>
