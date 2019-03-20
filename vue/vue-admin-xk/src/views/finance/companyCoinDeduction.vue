<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px">
        <el-form-item label="会员编号" prop="membername">
          <el-input
            v-model="ruleForm2.membername"
            placeholder="请输入会员编号"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="扣除数量" prop="charge">
          <el-input
            v-model="ruleForm2.charge"
            placeholder="请输入扣除数量"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="币种">
          <el-radio-group v-model="ruleForm2.coin">
            <el-radio :label="1" style="margin-right:10px;">储值积分</el-radio>
            <el-radio :label="2" style="margin-right:10px;">D币</el-radio>
            <el-radio :label="3" style="margin-right:10px;">待分红积分</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            v-waves
            type="primary"
            @click="submitForm('ruleForm2')"
            style="margin-right:10px;"
          >扣币</el-button>
          <el-button v-waves @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波效果
import Pagination from "@/components/Pagination"; // 页码

export default {
  name: "companyCoinDeduction",
  components: { Pagination },
  directives: { waves },
  data() {
    var validatorName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入会员名"));
      } else {
        callback();
      }
    };
    var validatorMoney = (rule, value, callback) => {
      if (!value && !Number.isInteger(value)) {
        return callback(new Error("请输入扣币金额"));
      } else {
        callback();
      }
    };
    return {
      ispull: false,
      ruleForm2: {
        coin: 1
      },
      rules2: {
        membername: [{ validator: validatorName, trigger: "blur" }],
        charge: [{ validator: validatorMoney, trigger: "blur" }]
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("充值成功!");
        } else {
          console.log("充值失败!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.nopull {
  width: 400px;
}
.pull {
  width: 100%;
}
</style>
