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
          >添加菜单</el-button>
        </router-link>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="danger"
          size="small"
        >删除菜单</el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="primary"
          size="small"
        >排序</el-button>
      </div>

      <el-form inline="true" :model="query">
        <el-form-item>
          <el-input
            placeholder="请输入菜单名"
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

      <el-table-column label="ID" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jb }}</span>
        </template>
      </el-table-column>
      <el-table-column label="URL" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cz }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否隐藏" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gxd }}</span>
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
  name: "menuManager",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: false,
      query: "",
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
<style scoped>
.el-button--mini,
.el-button--mini.is-round {
  padding: 5px 10px;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>