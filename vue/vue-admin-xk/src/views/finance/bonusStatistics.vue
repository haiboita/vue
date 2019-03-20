<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">
        <el-button v-waves class="filter-item" type="primary" size="small" @click="director">董事分红</el-button>
      </div>

      <el-form inline="true" :model="query">
        <el-form-item>
          <el-input
            placeholder="请输入用户编号"
            style="width: 200px;"
            class="filter-item"
            size="medium"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" size="medium" @click="query">
            <svg-icon icon-class="search"/>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- :summary-method="getSummaries" -->
    <!-- show-summary -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="汇总时间" align="center" width="151px" prop="time"></el-table-column>
      <el-table-column label="会员编号" align="center" width="100px" prop="num"></el-table-column>
      <el-table-column label="消费返还" align="center" width="90px" prop="xfback"></el-table-column>
      <el-table-column label="分销奖" align="center" width="90px" prop="devbonus"></el-table-column>
      <el-table-column label="月分红" align="center" width="90px" prop="monthbonus"></el-table-column>
      <el-table-column label="升级层次奖" align="center" width="95px" prop="levelbonus"></el-table-column>
      <el-table-column label="升级代数奖" align="center" width="95px" prop="Dbonus"></el-table-column>
      <el-table-column label="扣除返还" align="center" width="90px" prop="kcback"></el-table-column>
      <el-table-column label="直推奖" align="center" width="90px" prop="pushprize"></el-table-column>
      <el-table-column label="平台管理费" align="center" width="95px" prop="manageMoney"></el-table-column>
      <el-table-column label="共享D币" align="center" width="90px" prop="togetherD"></el-table-column>
      <el-table-column
        label="应发奖金累计"
        align="center"
        width="100px"
        prop="shouldbonus"
        style="color:red;"
      >
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.shouldbonus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实发奖金累计" align="center" width="100px" prop="realbonus">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.realbonus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="210px">
        <template slot-scope="scope">
          <el-button v-waves type="primary" size="small">查看日统计</el-button>
          <el-button v-waves type="primary" size="small">查看流水</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 总页数大于0显示页码 -->
    <pagination
      :class="listLoading?'':'pagination-border'"
      v-show="!listLoading"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import waves from "@/directive/waves"; // 水波效果
import { parseTime } from "@/utils"; //时间格式化
import Pagination from "@/components/Pagination"; // 页码

export default {
  name: "bonusStatistics",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: [
        {
          time: "2019-03-03 20:50:57",
          num: "wwy5689[王万英]",
          xfback: "9654.22",
          devbonus: "0.00",
          monthbonus: "0.00",
          levelbonus: "0.00",
          Dbonus: "0.00",
          kcback: "0.00",
          pushprize: "0.00",
          manageMoney: "0.00",
          togetherD: "0.00",
          shouldbonus: "9654.22",
          realbonus: "9654.22"
        },
        {
          time: "2019-03-03 20:50:57",
          num: "wwy5689[王万英]",
          xfback: "9654.22",
          devbonus: "0.00",
          monthbonus: "0.00",
          levelbonus: "0.00",
          Dbonus: "0.00",
          kcback: "0.00",
          pushprize: "0.00",
          manageMoney: "0.00",
          togetherD: "0.00",
          shouldbonus: "9654.22",
          realbonus: "9654.22"
        },
        {
          time: "2019-03-03 20:50:57",
          num: "wwy5689[王万英]",
          xfback: "9654.22",
          devbonus: "0.00",
          monthbonus: "0.00",
          levelbonus: "0.00",
          Dbonus: "0.00",
          kcback: "0.00",
          pushprize: "0.00",
          manageMoney: "0.00",
          togetherD: "0.00",
          shouldbonus: "9654.22",
          realbonus: "9654.22"
        },
        {
          time: "2019-03-03 20:50:57",
          num: "wwy5689[王万英]",
          xfback: "9654.22",
          devbonus: "0.00",
          monthbonus: "0.00",
          levelbonus: "0.00",
          Dbonus: "0.00",
          kcback: "0.00",
          pushprize: "0.00",
          manageMoney: "0.00",
          togetherD: "0.00",
          shouldbonus: "9654.22",
          realbonus: "9654.22"
        }
      ],
      total: 16,
      //页码属性值
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      }
    };
  },
  methods: {
    // getSummaries(param) {
    //   const { columns, data } = param;
    //   const sums = [];
    //   columns.forEach((column, index) => {
    //     if (index === 0) {
    //       sums[index] = "奖金累计";
    //       return;
    //     }
    //     const values = data.map(item => Number(item[column.property]));
    //     if (!values.every(value => isNaN(value))) {
    //       sums[index] = values.reduce((prev, curr) => {
    //         const value = Number(curr);
    //         if (!isNaN(value)) {
    //           return prev + curr;
    //         } else {
    //           return prev;
    //         }
    //       }, 0);
    //       sums[index] = sums[index].toFixed(2);
    //     } else {
    //       sums[index] = "";
    //     }
    //   });
    //   return sums;
    // }
  }
};
</script>
