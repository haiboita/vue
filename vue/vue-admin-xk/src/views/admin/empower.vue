<template>
  <div class="app-container">
    <el-collapse v-model="authorityItems" @change="handleChange">
      <el-collapse-item name="home">
        <template slot="title">
          <el-checkbox v-model="chooseHome">首页</el-checkbox>
        </template>
        <div class="function">
          <el-checkbox v-model="chooseHome">会员总数</el-checkbox>
          <el-checkbox v-model="chooseHome">新增会员</el-checkbox>
          <el-checkbox v-model="chooseHome">充值申请</el-checkbox>
          <el-checkbox v-model="chooseHome">提现申请</el-checkbox>
        </div>
      </el-collapse-item>
      <el-collapse-item name="news">
        <template slot="title">
          <el-checkbox v-model="chooseNews">新闻公告</el-checkbox>
        </template>
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波效果
import { parseTime } from "@/utils"; //时间格式化

export default {
  name: "empower",
  directives: { waves },
  filters: {},
  data() {
    return {
      allFunction: [
        {
          isHave: true,
          home: [
            { isHave: true, functon: "membersNum" },
            { isHave: true, functon: "membersAdd" },
            { isHave: true, functon: "rechargeApply" },
            { isHave: true, functon: "withdrawApply" }
          ]
        },
        {
          isHave: true,
          news: [
            {
              isHave: true,
              companyNews: [
                { isHave: true, functon: "add" },
                { isHave: true, functon: "delete" },
                { isHave: true, functon: "start" },
                { isHave: true, functon: "stop" },
                { isHave: true, functon: "sort" },
                { isHave: true, functon: "search" },
                { isHave: true, functon: "sort" },
                { isHave: true, functon: "refresh" },
                { isHave: true, functon: "edit" }
              ]
            },
            {
              isHave: true,
              newsInfomation: [
                { isHave: true, functon: "add" },
                { isHave: true, functon: "delete" },
                { isHave: true, functon: "start" },
                { isHave: true, functon: "stop" },
                { isHave: true, functon: "sort" },
                { isHave: true, functon: "search" },
                { isHave: true, functon: "sort" },
                { isHave: true, functon: "refresh" },
                { isHave: true, functon: "edit" }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>


<style scoped>
.function {
  margin-left: 20px;
}
</style>

