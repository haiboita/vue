<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="修改管理员名">
        <el-form ref="form" :model="updateName" label-width="90px">
          <el-form-item label="密码">
            <i class="must">*</i>
            <el-input v-model="updateName.password" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item label="新管理员名">
            <i class="must">*</i>
            <el-input v-model="updateName.newAdminName" placeholder="请输入新名称"/>
          </el-form-item>
          <el-form-item>
            <el-button v-waves type="primary">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form ref="form" :model="updatePassword" label-width="90px">
          <el-form-item label="原密码">
            <i class="must">*</i>
            <el-input v-model="updatePassword.oldPassword" placeholder="请输入原密码"/>
          </el-form-item>
          <el-form-item label="新密码">
            <i class="must">*</i>
            <el-input v-model="updatePassword.newPassword" placeholder="请输入新密码"/>
          </el-form-item>
          <el-form-item label="确认新密码">
            <i class="must">*</i>
            <el-input v-model="updatePassword.confirmPassword" placeholder="请确认密码"/>
          </el-form-item>
          <el-form-item>
            <el-button v-waves type="primary">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "adminUpdate",
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
.must {
  color: #f00;
  margin-left: -12px;
  font-size: 24px;
}
.el-input {
  width: 300px;
}
</style>

