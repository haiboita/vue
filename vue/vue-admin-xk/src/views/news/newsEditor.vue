<template>
  <div class="app-container">
    <el-form ref="form" :model="editor" label-width="70px">
      <el-form-item label="标题">
        <el-input v-model="editor.title" placeholder="请输入标题"/>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3}"
          v-model="editor.summary"
          placeholder="请输入摘要内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <div id="xk-wangEditor"></div>
        <!-- <button v-on:click="getContent">查看内容</button> -->
      </el-form-item>
      <el-form-item label="发布者">
        <el-input v-model="editor.author" placeholder="请输入发布者"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="editor.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="截至时间">
        <el-date-picker
          size="medium"
          v-model="editor.closingDate"
          type="date"
          placeholder="请选择截止日期"
        ></el-date-picker>
        <el-time-picker size="medium" v-model="editor.closingTime" placeholder="请选择截止时间"></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button v-waves type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "newEditor",
  data() {
    return {
      editor: {
        author: "admin",
        editorContent: "",
        status: 1
      }
    };
  },
  methods: {
    getContent: function() {
      alert(this.editorContent);
    }
  },
  mounted() {
    var editor = new E("#xk-wangEditor");
    editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    // 隐藏“网络图片”tab
    // editor.customConfig.showLinkImg = false;
    // 配置服务器端地址
    // editor.customConfig.uploadImgServer = '/upload'
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
    editor.txt.html("<style>.w-e-toolbar {flex-wrap: wrap;}</style>");
  }
};
</script>


<style scoped>
</style>


