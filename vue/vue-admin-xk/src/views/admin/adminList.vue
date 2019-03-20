<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="primary"
          size="small"
          @click="addAdmin"
        >添加管理员</el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="danger"
          size="small"
          @click="delAdmin"
        >删除管理员</el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="primary"
          size="small"
          @click="startAdmin"
        >启用管理员</el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="danger"
          size="small"
          @click="stopAdmin"
        >禁用管理员</el-button>
      </div>

      <el-form inline="true" :model="query">
        <el-form-item>
          <el-input
            placeholder="请输入管理员名"
            v-model="listQuery.title"
            style="width: 200px;"
            class="filter-item"
            size="medium"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" size="medium" @click="search">
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

      <!-- 会员编号 -->
      <el-table-column label="管理员名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.adminName }}</span>
        </template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column label="登录次数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginTimes }}</span>
        </template>
      </el-table-column>
      <!-- 发布者 -->
      <el-table-column label="最后登录时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastLoginTime }}</span>
        </template>
      </el-table-column>
      <!-- 发布时间 -->
      <el-table-column label="最后登录IP" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginIp }}</span>
          <!-- <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
        </template>
      </el-table-column>
      <!-- 状态(正常/禁用) -->
      <el-table-column label="状态" class-name="status-col" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column
        label="操作"
        align="center"
        width="220px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button v-waves type="primary" size="mini">启用</el-button>
          <el-button v-waves type="danger" size="mini">禁用</el-button>
          <el-button v-waves type="primary" size="mini" @click="setPowerT(scope.row)">授权</el-button>
          <el-button v-waves type="danger" size="mini">删除</el-button>
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
  name: "adminList",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        正常: "success",
        禁用: "danger"
      };
      return statusMap[status];
    }
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type];
    // }
  },
  data() {
    return {
      listLoading: false,
      tableKey: 0,
      datePicker: "",
      sortable: null,
      status: ["会员姓名", "会员编号"],
      list: [
        {
          adminName: "admin",
          loginTimes: 10,
          lastLoginTime: "2019-02-20 09:53:58",
          loginIp: "222.209.71.135",
          status: "正常"
        },
        {
          adminName: "admin23",
          loginTimes: 10,
          lastLoginTime: "2019-02-20 09:53:58",
          loginIp: "222.209.71.135",
          status: "正常"
        }
      ],
      total: 2,
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
    setPowerT(data) {
      this.$router.push("/admin/5");
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

