<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="margin-bottom:20px">
        <router-link class="inlineBlock right-menu-item hover-effect" to="/members/5">
          <el-button
            v-waves
            class="filter-item"
            style="margin-right: 10px;margin-top: 5px"
            type="primary"
            size="small"
          >添加会员</el-button>
        </router-link>
        <router-link class="inlineBlock right-menu-item hover-effect" to="/members/10">
          <el-button
            v-waves
            class="filter-item"
            style="margin-right: 10px;margin-top: 5px"
            type="primary"
            size="small"
            @click="resetPasswordH"
          >重置密码</el-button>
        </router-link>
        <router-link class="inlineBlock right-menu-item hover-effect" to="/members/11">
          <el-button
            v-waves
            class="filter-item"
            style="margin-right: 10px;margin-top: 5px"
            type="primary"
            size="small"
            @click="updateInfoH"
          >修改资料</el-button>
        </router-link>
        <el-button
          v-waves
          class="filter-item"
          style="margin-right: 10px;margin-top: 5px"
          type="primary"
          size="small"
          @click="setCenterH"
        >设为报单中心</el-button>
      </div>

      <el-form label-width="100px">
        <div class="tableTitle">基本信息</div>
        <div class="content">
          <el-form-item label="会员编号">
            <span>{{ num }}</span>
          </el-form-item>
          <el-form-item label="会员姓名">
            <span>{{ name }}</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <span>{{ idcard }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ phone }}</span>
          </el-form-item>
          <el-form-item label="会员级别">
            <span>{{ rank }}</span>
          </el-form-item>
        </div>

        <div class="tableTitle">关系信息</div>
        <div class="content">
          <el-form-item label="邀请人">
            <span class="red">{{ tjr }}</span>
          </el-form-item>
          <el-form-item label="接点人">
            <span class="red">{{ jdr }}</span>
          </el-form-item>
          <el-form-item label="所在区">
            <span class="red">{{ jdq }}</span>
          </el-form-item>
        </div>

        <div class="tableTitle">转币权限</div>
        <div class="content">
          <el-form-item label="设定转币权限">
            <el-checkbox v-model="checked" @change="checkboxChange">
              <span class="red">储值积分</span>
            </el-checkbox>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateLoginPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入登录密码"));
      } else {
        if (this.resetPasswordForm.dly !== "") {
          this.$refs.resetPasswordForm.validateField("dly");
        }
        callback();
      }
    };
    var validateLoginPass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入登录密码"));
      } else if (value !== this.resetPasswordForm.dl) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateSafePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入安全密码"));
      } else {
        if (this.fresetPasswordFormorm.aqy !== "") {
          this.$refs.resetPasswordForm.validateField("aqy");
        }
        callback();
      }
    };
    var validateSafePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入安全密码"));
      } else if (value !== this.resetPasswordForm.aq) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      num: "zj123",
      name: "张江",
      rank: "一级会员",
      phone: "158884278316",
      idcard: "510623198512123515",
      tjr: "admin",
      jdr: "aj123",
      jdq: "左区",
      checked: true,
      numAndName: "zj123[张江]",
      resetPasswordDialog: false,
      resetPasswordForm: {},
      rules: {
        dl: [{ required: true, validator: validateLoginPass, trigger: "blur" }],
        dly: [
          { required: true, validator: validateLoginPass2, trigger: "blur" }
        ],
        aq: [{ required: true, validator: validateSafePass, trigger: "blur" }],
        aqy: [{ required: true, validator: validateSafePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    cancel() {
      this.$message({
        type: "info",
        message: "操作已取消"
      });
    },
    resetPasswordH() {
      this.resetPasswordDialog = true;
    },
    updateInfoH() {},
    setCenterH() {
      this.$confirm("该会员将被设为报单中心， 是否继续?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //
          //执行访问后台操作
          //
          this.$message({
            type: "success",
            message: "该会员已被设为报单中心!"
          });
        })
        .catch(() => {
          this.cancel();
        });
    },
    checkboxChange(check) {
      this.$message({
        type: "info",
        message: check
      });
    }
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
.tableTitle {
  padding: 5px 5px;
  border-left: 5px solid #409eff;
  color: #666;
  font-weight: 1000;
  margin-bottom: 10px;
}
.el-form-item {
  margin-bottom: 10px;
}
.red {
  color: #ff0000;
}
</style>

