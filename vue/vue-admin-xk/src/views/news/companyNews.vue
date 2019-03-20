<template>
  <xk-table :url="url" :id="1"/>
</template>

<script>
import XkTable from "./components/XkTable";

export default {
  name: "companyNews",
  components: { XkTable },
  filters: {},
  data() {
    return {
      url: "/companyNews/getCompanyNews"
    };
  },
  methods: {}
};
</script>

