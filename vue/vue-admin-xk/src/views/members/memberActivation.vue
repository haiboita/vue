<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">
        <router-link class="inlineBlock right-menu-item hover-effect" to="/members/5">
          <el-button
            v-waves
            class="filter-item"
            style="margin-right: 10px;"
            type="primary"
            size="small"
          >添加会员</el-button>
        </router-link>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;"
          type="danger"
          size="small"
          @click="delMember"
        >删除会员</el-button>
      </div>

      <el-form inline="true" :model="query">
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
          <el-button v-waves class="filter-item" type="primary" size="medium" @click="search">
            <svg-icon icon-class="search"/>
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" size="medium" @click="leadingOut">
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

      <!-- 会员编号 -->
      <el-table-column label="会员编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column label="会员姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- 浏览量 -->
      <el-table-column label="邀请人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.inviter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.serve }}</span>
        </template>
      </el-table-column>
      <!-- 浏览量 -->
      <el-table-column label="注册时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.regTime }}</span>
        </template>
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button v-waves @click="activationT(scope.row)" type="success" size="mini">激活</el-button>
          <el-button v-waves @click="delMemberT(scope.row)" type="danger" size="mini">删除</el-button>
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
  name: "memberActivation",
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      listLoading: false,
      tableKey: 0,
      query: "",
      sortable: null,
      status: ["会员姓名", "会员编号"],
      list: [
        {
          num: "zj123",
          name: "张杰",
          serve: "admin",
          inviter: "admin",
          regTime: "2019-03-02 18:22:30"
        },
        {
          num: "zj123",
          name: "张杰",
          serve: "admin",
          inviter: "admin",
          regTime: "2019-03-02 18:22:30"
        },
        {
          num: "zj123",
          name: "张杰",
          serve: "admin",
          inviter: "admin",
          regTime: "2019-03-02 18:22:30"
        },
        {
          num: "zj123",
          name: "张杰",
          serve: "admin",
          inviter: "admin",
          regTime: "2019-03-02 18:22:30"
        },
        {
          num: "zj123",
          name: "张杰",
          serve: "admin",
          inviter: "admin",
          regTime: "2019-03-02 18:22:30"
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
    handleFilter() {},
    search() {},
    leadingOut() {},
    delMember() {
      this.$message({
        message: "请选择要删除的会员！",
        type: "warning"
      });
    }
  }
};
</script>


<style scoped>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 10px;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>

