<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;"
          type="primary"
          size="small"
          @click="enterMailbox"
        >进入发件箱</el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;"
          type="primary"
          size="small"
          @click="writeMessage"
        >写留言</el-button>
      </div>

      <el-form inline="true" :model="query">
        <el-form-item>
          <el-date-picker
            size="medium"
            v-model="datePicker"
            class="filter-item"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 290px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入标题"
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
      <el-table-column label="留言时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ltime }}</span>
        </template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column label="发件用户" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <!-- 发布者 -->
      <el-table-column label="留言标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <!-- 发布时间 -->
      <el-table-column label="留言内容" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lnr }}</span>
          <!-- <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
        </template>
      </el-table-column>
      <!-- 更新时间 -->
      <el-table-column label="回复内容" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hnr }}</span>
          <!-- <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
        </template>
      </el-table-column>
      <!-- 浏览量 -->
      <el-table-column label="留言状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <!-- 浏览量 -->
      <el-table-column label="处理时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>

      <!-- 操作按钮 -->
      <el-table-column
        label="操作"
        align="center"
        width="100px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
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
import waves from "@/directive/waves"; // 水波效果
import { parseTime } from "@/utils"; //时间格式化
import Pagination from "@/components/Pagination"; // 页码

export default {
  name: "memberMessage",
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      listLoading: false,
      query: {},
      list: [
        {
          ltime: "2019-03-02 21:26",
          name: "admin123",
          title: "留言",
          lnr: "你好",
          hnr: "收到,你好",
          status: "已处理",
          ctime: "2019-03-02 22:13"
        },
        {
          ltime: "2019-03-02 21:26",
          name: "admin123",
          title: "留言",
          lnr: "你好",
          hnr: "收到,你好",
          status: "已处理",
          ctime: "2019-03-02 22:13"
        },
        {
          ltime: "2019-03-02 21:26",
          name: "admin123",
          title: "留言",
          lnr: "你好",
          hnr: "无",
          status: "未处理",
          ctime: "2019-03-02 22:13"
        },
        {
          ltime: "2019-03-02 21:26",
          name: "admin123",
          title: "留言",
          lnr: "你好",
          hnr: "无",
          status: "已查看",
          ctime: "2019-03-02 22:13"
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

