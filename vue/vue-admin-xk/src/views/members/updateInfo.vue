<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="tableTitle">修改会员基本信息</div>
      <el-form ref="form" status-icon :rules="rules" :model="updateInfoForm" label-width="110px">
        <el-form-item label="姓名" prop="name">
          <el-input
            placeholder="请输入姓名"
            v-model="updateInfoForm.name"
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input
            placeholder="请输入身份证号"
            v-model="updateInfoForm.idcard"
            show-password
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            placeholder="请输入手机号"
            v-model="updateInfoForm.phone"
            show-password
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input
            placeholder="请输入银行卡号"
            v-model="updateInfoForm.bankcard"
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-input
            placeholder="请输入开户银行名称"
            v-model="updateInfoForm.bankname"
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户人">
          <el-input
            placeholder="请输入开户人姓名"
            v-model="updateInfoForm.holder"
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input
            placeholder="请输入QQ号"
            v-model="updateInfoForm.qq"
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input
            placeholder="请输入微信号"
            v-model="updateInfoForm.wex"
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号">
          <el-input
            placeholder="请输入支付宝账号"
            v-model="updateInfoForm.alipay"
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
    var validateIdCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("身份证号不能为空"));
      }
      setTimeout(() => {
        if (!/^\d{15}|\d{18}$/.test(value)) {
          callback(new Error("请输入正确的身份证号"));
        }
        callback();
      }, 500);
    };
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        if (
          !/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
            value
          )
        ) {
          callback(new Error("请输入正确的手机号"));
        }
        callback();
      }, 500);
    };
    return {
      ispull: false,
      numAndName: "zj123[张江]",
      updateInfoForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入会员姓名",
            trigger: "blur"
          }
        ],
        idcard: [
          { required: true, validator: validateIdCard, trigger: "blur" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
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


