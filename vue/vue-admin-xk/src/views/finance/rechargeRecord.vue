<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="query">
        <el-form-item>
          <el-date-picker
            unlink-panels
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
            v-model="query.num"
            style="width: 200px;"
            class="filter-item"
            size="medium"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.status" placeholder="请选择状态" size="medium">
            <el-option label="批准" value="1"></el-option>
            <el-option label="拒批" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" size="medium" @click="handleFilter">
            <svg-icon icon-class="search"/>
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium">
            <i class="fa fa-cloud-download"></i> 导出数据
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
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column label="申请时间" align="center" width="100px" prop="applytime"></el-table-column>
      <el-table-column label="申请人" align="center" prop="applymember"></el-table-column>
      <el-table-column label="手机号" align="center" width="110px" prop="phone"></el-table-column>
      <el-table-column label="充值类型" align="center" prop="type"></el-table-column>
      <el-table-column label="充值方式" align="center" prop="paymanner"></el-table-column>
      <el-table-column label="充值金额" align="center" prop="chargeammount"></el-table-column>
      <el-table-column label="充值币种" align="center" prop="monneyetype"></el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1" style="color:green;">申请获批</span>
          <span v-else style="color:red;">申请拒批</span>
        </template>
      </el-table-column>
      <el-table-column label="更多信息" width="100px" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <el-button size="mini" slot="reference">更多信息</el-button>
            <p>申请人编号: {{ scope.row.applymember }}</p>
            <p>申请人姓名: {{ scope.row.name }}</p>
            <p>账号信息: {{ scope.row.info }}</p>
            <p>受理人: {{ scope.row.receptionist }}</p>
          </el-popover>
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
import waves from "@/directive/waves"; //水波效果
import Pagination from "@/components/Pagination"; //页码
import Sortable from "sortablejs"; //拖拽排序
export default {
  name: "rechargeRecord",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      query: {},
      list: [
        {
          applytime: "2018-11-28 15:50:31",
          applymember: "yq123",
          name: "姚庆",
          phone: "13980728995",
          type: "后台充值",
          paymanner: "支付宝线下",
          chargeammount: "388.00",
          monneyetype: "储值积分",
          receptionist: "admin",
          info: "gy",
          status: "1"
        },
        {
          applytime: "2018-07-18 13:53:58",
          applymember: "hfq123",
          name: "姚庆",
          phone: "18202860765",
          type: "前台充值",
          paymanner: "银行卡	",
          chargeammount: "155.00",
          monneyetype: "储值积分",
          receptionist: "admin",
          info: "工商银行[9558880440211314480][黄方权]",
          status: "2"
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
