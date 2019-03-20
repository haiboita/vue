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
          >添加商品</el-button>
        </router-link>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="danger"
          size="small"
          @click="delMemberH"
        >删除商品</el-button>
      </div>

      <el-form inline="true" :model="query">
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
            placeholder="请输入查询信息"
            v-model="query.info"
            style="width: 200px;"
            class="filter-item"
            size="medium"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="query.status"
            placeholder="请选择"
            clearable
            size="medium"
            style="width: 150px;"
            class="filter-item"
          >
            <el-option v-for="item in status" :key="item" :label="item" :value="item"/>
          </el-select>
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

      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品分类" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jb }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cz }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商城价" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消费积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gxd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品余量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dfh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已售数量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.kfh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更多信息" width="100px" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <el-button size="mini" slot="reference">更多信息</el-button>
            <p>是否热销: {{ scope.row.inviter }}</p>
            <p>是否推荐: {{ scope.row.regTime }}</p>
            <p>是否新品: {{ scope.row.regTime }}</p>
            <p>出售状态: {{ scope.row.regTime }}</p>
            <p>创建时间: {{ scope.row.regTime }}</p>
            <p>更新时间: {{ scope.row.regTime }}</p>
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
            type="primary"
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
  name: "goodsList",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: false,
      query: "",
      status: ["ID", "商品名称"],
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