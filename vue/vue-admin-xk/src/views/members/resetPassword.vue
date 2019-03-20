<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">重置会员密码</div>
      <el-form ref="form" status-icon :rules="rules" :model="resetPasswordForm" label-width="110px">
        <el-form-item label="用户编号">
          <span style="color:#ff0000">{{ numAndName }}</span>
        </el-form-item>
        <el-form-item label="登录密码" prop="dl">
          <el-input
            type="password"
            placeholder="请输入登录密码"
            v-model="resetPasswordForm.dl"
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认登录密码" prop="dly">
          <el-input
            type="password"
            placeholder="请输入登录密码"
            v-model="resetPasswordForm.dly"
            show-password
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="安全密码" prop="aq">
          <el-input
            type="password"
            placeholder="请输入安全密码"
            v-model="resetPasswordForm.aq"
            show-password
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认安全密码" prop="aqy">
          <el-input
            type="password"
            placeholder="请输入安全密码"
            v-model="resetPasswordForm.aqy"
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPassword('form')">确 定</el-button>
        </el-form-item>
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
          this.$refs.form.validateField("dly");
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
        if (this.resetPasswordForm.aqy !== "") {
          this.$refs.form.validateField("aqy");
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
      ispull: false,
      numAndName: "zj123[张江]",
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
  mounted() {
    this.$nextTick(function() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      if (!flag) {
        // alert(flag);
        this.ispull = true;
      }
    });
  },
  methods: {
    cancel() {
      this.$message({
        type: "info",
        message: "操作已取消"
      });
    },
    resetPassword(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$confirm("会员的密码将被重置，是否继续?", "提示", {
            confirmButtonText: "确认重置",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              //
              //执行访问后台操作
              //
              this.$message({
                type: "success",
                message: "该会员密码已被重置!"
              });
            })
            .catch(() => {
              this.cancel();
            });
          return false;
        } else {
          // alert("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.tableTitle {
  padding: 5px 5px;
  border-left: 5px solid #409eff;
  color: #666;
  font-weight: 1000;
  margin-bottom: 10px;
}
.nopull {
  width: 400px;
}

.pull {
  width: 100%;
}
</style>


