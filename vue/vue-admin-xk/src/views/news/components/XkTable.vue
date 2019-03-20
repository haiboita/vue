<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">
        <router-link class="inlineBlock right-menu-item hover-effect" to="/news/3">
          <el-button
            v-waves
            class="filter-item"
            style="margin-right: 10px;margin-top: 5px"
            type="primary"
            size="small"
          >
            <span v-if="this.id=='1'">新增新闻</span>
            <span v-else>新增资讯</span>
          </el-button>
        </router-link>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="danger"
          size="small"
          @click="delNewH"
        >
          <span v-if="this.id=='1'">删除新闻</span>
          <span v-else>删除资讯</span>
        </el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="success"
          size="small"
          @click="startNewH"
        >启用</el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="danger"
          size="small"
          @click="stopNewH"
        >禁用</el-button>
        <router-link class="inlineBlock right-menu-item hover-effect" to="/news/4">
          <el-button
            v-waves
            class="filter-item"
            style="margin-right: 10px;margin-top: 5px"
            type="primary"
            size="small"
            @click="sort"
          >排序</el-button>
        </router-link>
      </div>
      <el-form inline="true" :model="form">
        <el-form-item>
          <el-input
            placeholder="请输入标题"
            v-model="listQuery.title"
            style="width: 300px;"
            class="filter-item"
            size="medium"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listQuery.importance"
            placeholder="请选择状态"
            clearable
            size="medium"
            style="width: 150px;"
            class="filter-item"
          >
            <el-option v-for="item in status" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" size="medium" @click="handleFilter">
            <svg-icon icon-class="search"/>
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" size="medium" @click="refresh">
            <i class="el-icon-refresh"></i>
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
      <el-table-column type="selection" width="55px" align="center"></el-table-column>

      <!-- 顺序 -->
      <el-table-column label="ID" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题" width="300px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <!-- 发布者 -->
      <el-table-column label="发布者" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <!-- 更多信息 -->
      <el-table-column label="更多信息" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <el-button size="mini" slot="reference">更多信息</el-button>
            <p>发布时间: {{ scope.row.publishTime }}</p>
            <p>更新时间: {{ scope.row.updateTime }}</p>
            <p>浏&nbsp;&nbsp;览&nbsp;&nbsp;量: {{ scope.row.looks }}</p>
            <p>排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序: {{ scope.row.sort }}</p>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 状态(正常/禁用) -->
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1" class="status_start">启用</span>
          <span v-else class="status_stop">禁用</span>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column
        label="操作"
        align="center"
        width="200px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button v-waves @click="editNewT(scope.row)" type="primary" size="mini">编辑</el-button>

          <el-button
            v-if="scope.row.status==0"
            v-waves
            @click="statusNewT(scope.row)"
            type="success"
            size="mini"
          >启用</el-button>
          <el-button v-else v-waves @click="statusNewT(scope.row)" type="danger" size="mini">禁用</el-button>
          <!-- >{{ $t('table.edit') }}</el-button> -->
          <!-- 删除按钮 -->
          <el-button v-waves @click="delNewT(scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 总页数大于0显示页码 -->
    <!-- 点击分页时会调用getNewsList() -->
    <!-- getNewsList()会有两个参数(page,limit),现在模拟没有参数 -->
    <pagination
      :class="listLoading?'':'pagination-border'"
      v-show="!listLoading"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getNewsList"
    />
  </div>
</template>

<script>
//引入模拟接口
import { getCompanyNews, getNewsInformation } from "@/api/news";
import waves from "@/directive/waves"; // 水波效果
import { parseTime } from "@/utils"; //时间格式化
import Pagination from "@/components/Pagination"; // 页码

export default {
  name: "XkTable",
  components: { Pagination },
  directives: { waves },
  props: ["url", "id"], //接受父组件传递过来的url
  filters: {},
  data() {
    return {
      listLoading: false,
      status: ["正常", "禁用"],
      selectionItems: [],
      list: null,
      total: 0,
      //页码属性值
      listQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    cancel() {
      this.$message({
        type: "info",
        message: "操作已取消"
      });
    },
    select(val) {
      this.selectionItems = val;
    },
    //获取表格数据
    getNewsList() {
      //开启加载动画
      this.listLoading = true;
      if (this.id == "1") {
        getCompanyNews(this.url).then(response => {
          //list:表数据;total:数据总条数
          this.list = response.items.items;
          this.total = response.total;
        });
      } else {
        getNewsInformation(this.url).then(response => {
          //list:表数据;total:数据总条数
          this.list = response.items.items;
          this.total = response.total;
        });
      }
      // 模拟的加载延迟时间1.5s
      setTimeout(() => {
        //关闭加载动画
        this.listLoading = false;
      }, 0.5 * 1000);
    },
    refresh() {
      this.getNewsList();
    },
    //顶部删除按钮事件
    delNewH() {
      if (this.selectionItems.length == 0) {
        this.$message.error("请勾选要删除的行！");
      } else {
        console.log(this.selectionItems);
        this.$confirm(
          "所选的所有新闻资讯将被永久删除，无法恢复，是否继续?",
          "警告",
          {
            confirmButtonText: "确认删除",
            confirmButtonClass: "el-button--danger",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //
            //执行访问后台操作
            //
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.cancel();
          });
      }
    },
    //顶部启用按钮事件
    startNewH() {
      if (this.selectionItems.length == 0) {
        this.$message.error("请勾选要启用的行！");
      } else {
        this.$confirm(
          "所选的所有新闻资讯将被启用，前台将会显示，是否继续?",
          "警告",
          {
            confirmButtonText: "确认启用",
            confirmButtonClass: "el-button--success",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //
            //执行访问后台操作
            //
            this.$message({
              type: "success",
              message: "所选新闻资讯已全被启用，前台将会显示!"
            });
          })
          .catch(() => {
            this.cancel();
          });
      }
    },
    //顶部禁用按钮事件
    stopNewH() {
      if (this.selectionItems.length == 0) {
        this.$message.error("请勾选要禁用的行！");
      } else {
        this.$confirm(
          "所选的所有新闻资讯将被禁用，前台将不会显示，是否继续?",
          "警告",
          {
            confirmButtonText: "确认禁用",
            confirmButtonClass: "el-button--danger",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //
            //执行访问后台操作
            //
            this.$message({
              type: "success",
              message: "所选新闻资讯已被禁用，前台将不会显示!"
            });
          })
          .catch(() => {
            this.cancel();
          });
      }
    },
    //表格工具列启用/禁用按钮事件
    statusNewT(data) {
      var hint;
      var btnHint;
      var messageHint;
      var statusNow;
      var btnClass;
      //判断当前是否被禁用
      if (data.status == 0) {
        //当前为禁用状态
        hint = "》的新闻资讯将被启用，前台将会显示，是否继续?";
        btnHint = "确认启用";
        messageHint = "新闻资讯已被启用，前台将会显示!";
        statusNow = 1;
        btnClass = "el-button--success";
      } else {
        //当前为启用状态
        hint = "》的新闻资讯将被禁用，前台将不会显示，是否继续?";
        btnHint = "确认禁用";
        messageHint = "新闻资讯已被禁用，前台将不会显示!";
        statusNow = 0;
        btnClass = "el-button--danger";
      }
      this.$confirm("标题为《" + data.title + hint, "警告", {
        confirmButtonText: btnHint,
        confirmButtonClass: btnClass,
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //
          //执行访问后台操作
          //
          data.status = statusNow;
          this.$message({
            type: "success",
            message: messageHint
          });
        })
        .catch(() => {
          this.cancel();
        });
    },
    //表格工具列删除按钮事件
    delNewT(data) {
      this.$confirm(
        "标题为《" +
          data.title +
          "》的新闻资讯将被永久删除，无法恢复，是否继续?",
        "警告",
        {
          confirmButtonText: "确认删除",
          confirmButtonClass: "el-button--danger",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //
          //执行访问后台操作
          //
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.cancel();
        });
    }
  }
};
</script>


<style scoped>
.status_stop {
  color: #f56c6c;
}
.status_start {
  color: #13ce66;
}
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>

