<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="基本配置">
        <el-form ref="form" :model="updateName" label-width="90px">
          <el-form-item label="会员称谓">
            <el-input v-model="updateName.password" placeholder="请输入会员称谓"/>
          </el-form-item>
          <el-form-item label="网站名称">
            <el-input v-model="updateName.newAdminName" placeholder="请输入网站名称"/>
          </el-form-item>
          <el-form-item label="欢迎语">
            <el-input v-model="updateName.newAdminName" placeholder="请输入欢迎语"/>
          </el-form-item>
          <el-form-item label="网站备案号">
            <el-input v-model="updateName.newAdminName" placeholder="请输入网站备案号"/>
          </el-form-item>
          <el-form-item>
            <el-button v-waves type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="内容配置">
        <el-form ref="form" :model="updatePassword" label-width="160px">
          <el-form-item label="公司微信收款二维码">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="公司支付宝收款二维码">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="APP下载">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button v-waves type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="LOGO配置">
        <el-form ref="form" :model="updatePassword" label-width="120px">
          <el-form-item label="后台logo">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button v-waves type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "websiteSetting",
  data() {
    return {
      updateName: {},
      updatePassword: {}
    };
  },
  methods: {}
};
</script>