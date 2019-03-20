<template>
  <div class="app-container">
    <el-checkbox v-model="chooseHome">普通用户</el-checkbox>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波效果
import { parseTime } from "@/utils"; //时间格式化

export default {
  name: "adminEmpower",
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

