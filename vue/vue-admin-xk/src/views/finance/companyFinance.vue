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
      @sort-change="sortChange"
    >
      <el-table-column label="日期" align="center" prop="datetime"></el-table-column>
      <el-table-column label="收入" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.inputmoney>0" style="color:red;">{{ scope.row.inputmoney}}</span>
          <span v-else>{{ scope.row.inputmoney}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支出" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.outputmoney>0" style="color:red;">{{ scope.row.outputmoney}}</span>
          <span v-else>{{ scope.row.outputmoney}}</span>
        </template>
      </el-table-column>
      <el-table-column label="沉淀" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sediment>0" style="color:red;">{{ scope.row.sediment}}</span>
          <span v-else>{{ scope.row.sediment}}</span>
        </template>
      </el-table-column>
      <el-table-column label="拨出率" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.rate>0" style="color:red;">{{ scope.row.rate}}%</span>
          <span v-else>{{ scope.row.rate}}%</span>
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
import Pagination from "@/components/Pagination"; // 页码
import waves from "@/directive/waves"; // 水波效果
export default {
  name: "companyFinance",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      query: {},
      list: [
        {
          datetime: "2019-03-04",
          inputmoney: "1440.00",
          outputmoney: "4315.20",
          sediment: "-2875.20",
          rate: "299.67"
        },
        {
          datetime: "2019-03-04",
          inputmoney: "1440.00",
          outputmoney: "4315.20",
          sediment: "2875.20",
          rate: "299.67"
        },
        {
          datetime: "2019-03-04",
          inputmoney: "1440.00",
          outputmoney: "4315.20",
          sediment: "-2875.20",
          rate: "299.67"
        }
      ],
      total: 16,
      //页码属性值
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },

  methods: {}
};
</script>