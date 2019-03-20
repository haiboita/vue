<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">
        <router-link class="inlineBlock right-menu-item hover-effect" to="/members/5">
          <el-button
            v-waves
            class="filter-item"
            style="margin-right: 10px;margin-top: 5px"
            type="primary"
            size="small"
          >添加</el-button>
        </router-link>
      </div>

      <el-form inline="true" :model="query">
        <el-form-item>
          <el-input
            placeholder="请输入查询信息"
            v-model="query.info"
            style="width: 200px;"
            class="filter-item"
            size="medium"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            v-waves
            class="filter-item"
            style="margin-right:10px"
            type="primary"
            size="medium"
            @click="search"
          >
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
      @selection-change="select"
    >
      <el-table-column type="selection" width="50px" align="center"></el-table-column>

      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否购物" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否充值" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jb }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否扣币" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cz }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否提现" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值申请" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gxd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="钱包统计" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dfh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="后台账户" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.kfh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="前台首页" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.kfh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员转账" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.kfh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更多信息" width="100px" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <el-button size="mini" slot="reference">更多信息</el-button>
            <p>钱包转换出: {{ scope.row.inviter }}</p>
            <p>钱包转换入: {{ scope.row.regTime }}</p>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type==1"
            @click="upMemberT(scope.row)"
            v-waves
            type="primary"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="scope.row.type==1"
            @click="downMemberT(scope.row)"
            v-waves
            type="danger"
            size="mini"
          >删除</el-button>
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
  name: "walletSetting",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: false,
      query: "",
      status: ["会员姓名", "会员编号"],
      selectionItems: [],
      list: null,
      total: 0,
      //页码属性值
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  }
};
</script>