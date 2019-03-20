<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="formInline">
        <el-form-item>
          <el-date-picker
            size="medium"
            v-model="datePicker"
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
            size="medium"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formInline.region"
            placeholder="请选择"
            size="medium"
            clearable="clearable"
          >
            <el-option label="注单赠送" value="1"></el-option>
            <el-option label="消费返还" value="2"></el-option>
            <el-option label="分销奖" value="3"></el-option>
            <el-option label="月分红" value="4"></el-option>
            <el-option label="升级层次奖" value="5"></el-option>
            <el-option label="升级代数奖" value="6"></el-option>
            <el-option label="扣除返还" value="7"></el-option>
            <el-option label="直推奖" value="8"></el-option>
            <el-option label="注册" value="9"></el-option>
            <el-option label="后台充值" value="10"></el-option>
            <el-option label="提现" value="11"></el-option>
            <el-option label="提现拒批" value="12"></el-option>
            <el-option label="转币" value="13"></el-option>
            <el-option label="升级" value="14"></el-option>
            <el-option label="购物" value="15"></el-option>
            <el-option label="扣币" value="16"></el-option>
            <el-option label="在线支付" value="17"></el-option>
            <el-option label="前台充值" value="18"></el-option>
            <el-option label="转换可分红积分" value="19"></el-option>
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
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="日期" align="center" prop="datetime"></el-table-column>
      <el-table-column label="相关会员" align="center" prop="rtmember"></el-table-column>
      <el-table-column label="目标会员" align="center" prop="tgmember"></el-table-column>
      <el-table-column label="应发金额" align="center" prop="shouldsend"></el-table-column>
      <el-table-column label="实发金额" align="center" prop="rtmonney">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.rtmonney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更后金额" align="center" prop="changemoney">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.changemoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更状态" align="center" prop="changestatus">
        <template slot-scope="scope">
          <span v-if="scope.row.changestatus==1" style="color:red;">↑↑</span>
          <span v-else style="color:green;">↓↓</span>
        </template>
      </el-table-column>
      <el-table-column label="变更类型" align="center" prop="changetype"></el-table-column>
      <el-table-column label="变更币种" align="center" prop="changecurrency"></el-table-column>
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
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
import waves from "@/directive/waves"; // 水波效果
import { parseTime } from "@/utils"; //时间格式化
import Pagination from "@/components/Pagination"; // 页码
import Sortable from "sortablejs"; //拖拽排序
export default {
  name: "financialFlow",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: [
        {
          datetime: "2019-03-04 15:06:57",
          rtmember: "pql333",
          tgmember: "y668899",
          shouldsend: "0.72",
          rtmonney: "0.72",
          changemoney: "36.04",
          changestatus: "1",
          changetype: "分销奖",
          changecurrency: "待分红积分"
        },
        {
          datetime: "2019-03-04 15:06:57",
          rtmember: "pql333",
          tgmember: "y668899",
          shouldsend: "0.72",
          rtmonney: "0.72",
          changemoney: "36.04",
          changestatus: "1",
          changetype: "分销奖",
          changecurrency: "待分红积分"
        },
        {
          datetime: "2019-03-04 15:06:57",
          rtmember: "pql333",
          tgmember: "y668899",
          shouldsend: "0.72",
          rtmonney: "0.72",
          changemoney: "36.04",
          changestatus: "0",
          changetype: "分销奖",
          changecurrency: "待分红积分"
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
      },
      formInline: {
        user: "",
        region: ""
      },
      listLoading: false,
      tableKey: 0,
      datePicker: "",
      sortable: null
    };
  },
  methods: {}
};
</script>