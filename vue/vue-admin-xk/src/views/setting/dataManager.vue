<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="数据初始化">
        <el-button v-waves type="danger">清空所有数据</el-button>
      </el-tab-pane>
      <el-tab-pane label="数据备份">
        <el-button v-waves type="primary">备份数据</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "dataManager",
  data() {
    return {
      updateName: {},
      updatePassword: {}
    };
  },
  methods: {}
};
</script>


<style scoped>
</style>

