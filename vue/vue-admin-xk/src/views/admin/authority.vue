<template>
  <div class="app-container">
    <div class="tableTitle">
      <el-button
        v-waves
        class="filter-item"
        style="margin-right: 10px;margin-top: 5px"
        type="primary"
        size="small"
        @click="handleCreate"
      >添加用户组</el-button>
      <el-button
        v-waves
        class="filter-item"
        style="margin-right: 10px;margin-top: 5px"
        type="danger"
        size="small"
        @click="handleCreate"
      >删除用户组</el-button>
      <el-button
        v-waves
        class="filter-item"
        style="margin-right: 10px;margin-top: 5px"
        type="primary"
        size="small"
        @click="handleCreate"
      >启用用户组</el-button>
      <el-button
        v-waves
        class="filter-item"
        style="margin-right: 10px;margin-top: 5px"
        type="danger"
        size="small"
        @click="handleCreate"
      >禁用用户组</el-button>
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
      <el-table-column label="用户组" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.adminGroup }}</span>
        </template>
      </el-table-column>
      <!-- 发布者 -->
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.describe }}</span>
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
  name: "authority",
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
          adminGroup: "普通管理员",
          status: "正常",
          describe: "普通管理员，权限略低"
        },
        {
          adminGroup: "超级管理员",
          status: "正常",
          describe: "权限最高"
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
      this.$router.push("/admin/4");
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

