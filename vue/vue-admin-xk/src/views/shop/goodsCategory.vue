<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">
        <router-link class="inlineBlock right-menu-item hover-effect" to="/members/5">
          <el-button
            v-waves
            class="filter-item"
            style="margin-top: 5px"
            type="primary"
            size="small"
          >添加分类</el-button>
          <el-button
            v-waves
            class="filter-item"
            style="margin-top: 5px"
            type="danger"
            size="small"
          >删除分类</el-button>
        </router-link>
      </div>
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

      <el-table-column label="分类名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="父类名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="270px"
        class-name="small-padding fixed-width"
      >
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
  name: "goodsCategory",
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