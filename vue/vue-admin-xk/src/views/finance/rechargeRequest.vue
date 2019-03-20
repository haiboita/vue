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
            v-model="query.num"
            style="width: 200px;"
            class="filter-item"
            size="medium"
            clearable
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-select v-model="query.coin" placeholder="请选择" size="medium" clearable="clearable">
            <el-option label="储值积分" value="1"></el-option>
            <el-option label="D币" value="2"></el-option>
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
      @sort-change="sortChange"
    >
      <el-table-column type="selection" width="55px" align="center"></el-table-column>
      <el-table-column label="申请时间" align="center" width="100px" prop="applytime"></el-table-column>
      <el-table-column label="申请人" align="center" prop="applymember"></el-table-column>
      <el-table-column label="手机号" align="center" prop="phone"></el-table-column>
      <el-table-column label="打款方式" align="center" prop="paymanner"></el-table-column>
      <el-table-column label="充值金额" align="center" prop="chargeammount"></el-table-column>
      <el-table-column label="充值币种" align="center" prop="monneyetype"></el-table-column>
      <el-table-column label="账号信息" align="center" width="200px" prop="info"></el-table-column>
      <el-table-column label="操作" align="center" width="150px" prop="operation">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="approve(scope.row)">批准</el-button>
          <el-button type="danger" size="small" @click="refuse(scope.row)">拒绝</el-button>
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
  name: "rechargeRequest",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      query: {},
      list: [
        {
          applytime: "2018-11-28 15:50:31",
          applymember: "yq123",
          phone: "13980728995",
          paymanner: "支付宝线下",
          chargeammount: "388.00",
          monneyetype: "储值积分",
          info: "gy"
        },
        {
          applytime: "2018-07-18 13:53:58",
          applymember: "hfq123",
          phone: "18202860765",
          paymanner: "银行卡	",
          chargeammount: "155.00",
          monneyetype: "储值积分",
          info: "工商银行[9558880440211314480][黄方权]"
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
      datePicker: ""
    };
  },
  methods: {}
};
</script>