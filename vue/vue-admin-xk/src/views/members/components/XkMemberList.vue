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
          >添加会员</el-button>
        </router-link>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="danger"
          size="small"
          @click="delMemberH"
        >删除会员</el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="primary"
          size="small"
          @click="startMemberH"
        >启用会员</el-button>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="danger"
          size="small"
          @click="stopMemberH"
        >冻结会员</el-button>
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
      @selection-change="select"
    >
      <el-table-column type="selection" width="50px" align="center"></el-table-column>

      <el-table-column label="会员编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员级别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jb }}</span>
        </template>
      </el-table-column>
      <el-table-column label="储值积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cz }}</span>
        </template>
      </el-table-column>
      <el-table-column label="D币" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column label="共享D币" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gxd }}</span>
        </template>
      </el-table-column>
      <el-table-column label="待分红积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dfh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="可分红积分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.kfh }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更多信息" width="100px" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <el-button size="mini" slot="reference">更多信息</el-button>
            <p>邀&nbsp;&nbsp;请&nbsp;&nbsp;人: {{ scope.row.inviter }}</p>
            <p>注册时间: {{ scope.row.regTime }}</p>
            <p>
              会员状态:
              <span v-if="scope.row.status==1" class="status_start">正常</span>
              <span v-else-if="scope.row.status==2" class="status_stop">冻结</span>
            </p>
            <p>
              会员提现:
              <span v-if="scope.row.iswithdraw==1" class="status_stop">禁止</span>
              <span v-else-if="scope.row.iswithdraw==0" class="status_start">正常</span>
            </p>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="270px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button v-waves @click="theStageT(scope.row)" type="primary" size="mini">访问前台</el-button>
          <el-button
            v-if="scope.row.iswithdraw==1"
            v-waves
            @click="noWithdrawT(scope.row)"
            type="success"
            size="mini"
          >恢复提现</el-button>
          <el-button
            v-else-if="scope.row.iswithdraw==0"
            v-waves
            @click="noWithdrawT(scope.row)"
            type="danger"
            size="mini"
          >禁止提现</el-button>
          <!-- 状态：1=>启用；2=>被冻结；0=>未激活 -->
          <el-button
            v-if="scope.row.status==2"
            v-waves
            @click="statusMemberT(scope.row)"
            type="success"
            size="mini"
          >启用</el-button>
          <el-button
            v-else-if="scope.row.status==1"
            v-waves
            @click="statusMemberT(scope.row)"
            type="danger"
            size="mini"
          >冻结</el-button>
          <el-button v-waves type="primary" size="mini">充币</el-button>
          <!-- memberType:0=>免费会员；1=>报单会员 -->
          <el-button
            v-if="scope.row.type==1"
            @click="upMemberT(scope.row)"
            v-waves
            type="primary"
            size="mini"
          >升级</el-button>
          <el-button
            v-if="scope.row.type==1"
            @click="downMemberT(scope.row)"
            v-waves
            type="primary"
            size="mini"
          >降级</el-button>
          <el-button
            v-if="scope.row.type==0"
            @click="changeMemberT(scope.row)"
            v-waves
            type="primary"
            size="mini"
          >转共享商</el-button>
          <el-button
            v-if="scope.row.type==0"
            @click="delMemberT(scope.row)"
            v-waves
            type="danger"
            size="mini"
          >删除</el-button>
          <el-button
            v-waves
            size="mini"
            @click="more(scope.row)"
            type="success"
            style="margin-top:5px"
          >
            更多操作
            <i class="el-icon-d-arrow-right"></i>
          </el-button>
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
import { getMembers, getFreeMembers } from "@/api/members";
import waves from "@/directive/waves"; // 水波效果
import { parseTime } from "@/utils"; //时间格式化
import Pagination from "@/components/Pagination"; // 页码

export default {
  name: "XkMembersList",
  components: { Pagination },
  directives: { waves },
  props: ["memberType"], //接受父组件传递过来的url
  filters: {},
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
  },
  created() {
    this.getMmebersList();
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
    //this.$router.push('IndexDtaqInfo/' + device_id);
    //获取表格数据
    getMmebersList() {
      //开启加载动画
      this.listLoading = true;
      if (this.memberType == "1") {
        this.$http.get("/xk/members").then(response => {
          //list:表数据;total:数据总条数
          this.list = response.items.items;
          this.total = response.total;
        });
      } else {
        this.$http.get("/xk/members").then(response => {
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
    //顶部删除会员按钮事件
    delMemberH() {
      if (this.selectionItems.length == 0) {
        this.$message.error("请勾选要删除的会员！");
      } else {
        console.log(this.selectionItems);
        this.$confirm(
          "所选的所有会员将被删除，可到系统设置恢复中心恢复，会员数据将被清空，是否继续?",
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
    //顶部启用会员按钮事件
    startMemberH() {
      if (this.selectionItems.length == 0) {
        this.$message.error("请勾选要启用的会员！");
      } else {
        this.$confirm(
          "所选会员将被启用，相关冻结功能将恢复使用, 是否继续?",
          "提示",
          {
            confirmButtonText: "确认启用",
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
              message: "所选会员已被启用!"
            });
          })
          .catch(() => {
            this.cancel();
          });
      }
    },
    //顶部冻结会员按钮事件
    stopMemberH() {
      if (this.selectionItems.length == 0) {
        this.$message.error("请勾选要冻结的会员！");
      } else {
        this.$confirm(
          "所选会员将被冻结，相关功能将无法使用, 是否继续?",
          "警告",
          {
            confirmButtonText: "确认冻结",
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
              message: "所选会员已被冻结!"
            });
          })
          .catch(() => {
            this.cancel();
          });
      }
    },
    //搜索按钮事件
    search() {
      this.$message.error("搜索");
    },
    //导出按钮事件
    leadingOut() {},
    //表格工具列访问前台按钮事件
    theStageT(data) {},
    //表格工具列禁止提现按钮事件
    noWithdrawT(data) {
      this.$confirm(
        "会员编号为 [ " + data.num + " ] 的会员将被禁止提现，是否继续?",
        "警告",
        {
          confirmButtonText: "确认禁止",
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
            message: "禁止成功!"
          });
        })
        .catch(() => {
          this.cancel();
        });
    },
    //表格工具列启用/冻结按钮事件
    statusMemberT(data) {
      var hint;
      var btnHint;
      var messageHint;
      var statusNow;
      var btnClass;
      //判断当前是否被冻结
      if (data.status == 2) {
        //当前为冻结状态
        hint = " ] 的会员将被启用，是否继续?";
        btnHint = "确认启用";
        messageHint = "会员已被启用!";
        statusNow = 1;
        btnClass = "el-button--success";
      } else if (data.status == 1) {
        //当前为启用状态
        hint = " ] 的会员将被冻结，是否继续?";
        btnHint = "确认冻结";
        messageHint = "会员已被冻结!";
        statusNow = 2;
        btnClass = "el-button--danger";
      }
      this.$confirm("会员编号为 [ " + data.num + hint, "警告", {
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
    //表格工具列升级按钮事件
    upMemberT(data) {},
    //表格工具列降级按钮事件
    downMemberT(data) {},
    //表格工具列删除按钮事件
    delMemberT(data) {
      this.$confirm(
        "会员编号为 [ " +
          data.num +
          " ] 的会员将被删除，可到系统设置恢复中心恢复，会员数据将被清空，是否继续?",
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
    },
    //表格工具列转为共享商按钮事件
    changeMemberT(data) {},
    //表格工具列更多操作按钮事件
    more(data) {
      this.$router.push("/members/9");
    },

    handleFilter() {}
  }
};
</script>

<style scoped>
.app-main {
  width: auto;
}
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
.status_stop {
  color: #f56c6c;
}
.status_start {
  color: #13ce66;
}
</style>

