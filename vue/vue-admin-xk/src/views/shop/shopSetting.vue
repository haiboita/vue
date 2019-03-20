<template>
  <div class="app-container">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="110px">
      <el-form-item label="商城名称" prop="num">
        <el-input v-model="form.num" size="medium" :class="ispull?'pull':'nopull'"></el-input>
      </el-form-item>
      <el-form-item label="发货地址" prop="name">
        <el-input v-model="form.name" size="medium" :class="ispull?'pull':'nopull'"></el-input>
      </el-form-item>
      <el-form-item label="发货人" prop="isfree">
        <el-input v-model="form.name" size="medium" :class="ispull?'pull':'nopull'"></el-input>
      </el-form-item>
      <el-form-item label="商城logo" prop="money">
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
      <el-form-item label="QQ客服" prop="idcard">
        <el-input v-model="form.idcard" size="medium" :class="ispull?'pull':'nopull'"></el-input>
      </el-form-item>
      <el-form-item label="客服电话" prop="phone">
        <el-input v-model="form.phone" size="medium" :class="ispull?'pull':'nopull'"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-waves
          type="success"
          @click="onSubmit('form')"
          style="margin-left:10px ;width:100px"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "shopSetting",
  data() {
    return {
      form: {}
    };
  }
};
</script>