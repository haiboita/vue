<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="query">
        <el-form-item>
          <el-date-picker
            size="medium"
            v-model="query.datePicker"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 290px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入会员编号"
            style="width: 200px;"
            class="filter-item"
            size="small"
            clearable
            v-model="query.num"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.region" placeholder="请选择" size="medium" clearable="clearable">
            <el-option label="只看前台" value="1"></el-option>
            <el-option label="只看后台" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" size="medium" @click="handleFilter">
            <svg-icon icon-class="search"/>
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="用户编号" align="center" prop="memberid"></el-table-column>
      <el-table-column label="充值币种" align="center" prop="amounttype"></el-table-column>
      <el-table-column label="充值类型" align="center" prop="type"></el-table-column>
      <el-table-column label="充值金额" align="center" prop="charge">
        <template slot-scope="scope">
          <span>{{scope.row.charge}}元</span>
        </template>
      </el-table-column>
      <el-table-column label="充值时间" align="center" prop="datetime"></el-table-column>
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
import waves from "@/directive/waves"; //水波效果
import Pagination from "@/components/Pagination"; //页码

export default {
  name: "allRechargeRecord",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      query: {},
      list: [
        {
          memberid: "wwy5689[王万英]",
          amounttype: "储值积分",
          type: "后台充值	",
          charge: "38800.00",
          chargeammount: "388.00",
          datetime: "2019-03-03 20:50:26"
        },
        {
          memberid: "wwy5689[王万英]",
          amounttype: "储值积分",
          type: "后台充值	",
          charge: "38800.00",
          chargeammount: "388.00",
          datetime: "2019-03-03 20:50:26"
        }
      ],
      total: 16,
      //页码属性值
      listQuery: {
        page: 1,
        limit: 10
      },
      formInline: {
        user: "",
        region: ""
      },
      datePicker: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.app-main {
  width: auto;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 10px;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>