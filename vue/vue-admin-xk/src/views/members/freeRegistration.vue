<template>
  <div class="app-container">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="110px">
      <div class="tableTitle">基本信息</div>
      <div class="content">
        <el-form-item label="会员编号" prop="num">
          <el-input v-model="form.num" size="medium" :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="form.name" size="medium" :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
        <el-form-item label="免费注册" prop="isfree">
          <el-radio-group v-model="form.isfree">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.isfree==0" label="报单金额" prop="money">
          <el-input v-model="form.money" size="medium" disabled :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="form.idcard" size="medium" :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" size="medium" :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-cascader
            v-model="form.address1"
            placeholder="选择或搜索"
            :options="options"
            filterable
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address2" size="medium" :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
      </div>

      <div class="tableTitle">
        关系信息
        <i class="no">(如果修改了推荐人请重新获取报单中心;如果修改了接点人系统按从左至右排位)</i>
      </div>
      <div class="content">
        <el-form-item label="邀请人" prop="tjr">
          <el-input v-model="form.tjr" size="medium" :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
        <el-form-item label="报单中心" prop="bd">
          <el-input v-model="form.bd" size="medium" :class="ispull?'pull':'nopull'"></el-input>
          <el-button v-waves type="primary" size="small">获取报单中心</el-button>
        </el-form-item>
        <el-form-item label="接点人" prop="jdr">
          <el-input v-model="form.jdr" size="medium" :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
        <el-form-item label="接点区" prop="jdq">
          <el-input v-model="form.jdq" size="medium" :class="ispull?'pull':'nopull'"></el-input>
        </el-form-item>
      </div>

      <div class="tableTitle">
        安全信息
        <i class="no">(默认密码:123456)</i>
      </div>
      <div class="content">
        <el-form-item label="登录密码" prop="dl">
          <el-input
            type="password"
            placeholder="请输入登录密码"
            v-model="form.dl"
            show-password
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认登录密码" prop="dly">
          <el-input
            type="password"
            placeholder="请输入登录密码"
            v-model="form.dly"
            show-password
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="安全密码" prop="aq">
          <el-input
            type="password"
            placeholder="请输入安全密码"
            v-model="form.aq"
            show-password
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认安全密码" prop="aqy">
          <el-input
            type="password"
            placeholder="请输入安全密码"
            v-model="form.aqy"
            show-password
            size="medium"
            :class="ispull?'pull':'nopull'"
          ></el-input>
          <el-button v-waves type="primary" size="small" @click="reset()">重置密码</el-button>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button
          v-waves
          type="success"
          @click="onSubmit('form')"
          style="margin-left:10px ;width:100px"
        >提交</el-button>
        <!-- <el-button v-waves style="margin-left:10px">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波效果
import { parseTime } from "@/utils"; //时间格式化
import Pagination from "@/components/Pagination"; // 页码
export default {
  name: "freeRegistration",
  components: { Pagination },
  directives: { waves },
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
    var validateLoginPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入登录密码"));
      } else {
        if (this.form.dly !== "") {
          this.$refs.form.validateField("dly");
        }
        callback();
      }
    };
    var validateLoginPass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入登录密码"));
      } else if (value !== this.form.dl) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateSafePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入安全密码"));
      } else {
        if (this.form.aqy !== "") {
          this.$refs.form.validateField("aqy");
        }
        callback();
      }
    };
    var validateSafePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入安全密码"));
      } else if (value !== this.form.aq) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ispull: false,
      form: {
        isfree: 1,
        money: 480,
        dl: "123456",
        dly: "123456",
        aq: "123456",
        aqy: "123456"
      },
      rules: {
        num: [
          {
            required: true,
            message: "请输入会员编号",
            trigger: "blur"
          }
        ],
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
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        isfree: [{ required: true, trigger: "blur" }],
        money: [{ required: true, trigger: "blur" }],
        tjr: [
          {
            required: true,
            message: "请输入推荐人编号",
            trigger: "blur"
          }
        ],
        bd: [
          {
            required: true,
            message: "请输入报单中心编号",
            trigger: "blur"
          }
        ],
        jdr: [
          {
            required: true,
            message: "请输入接点人编号",
            trigger: "blur"
          }
        ],
        jdq: [
          {
            required: true,
            message: "请输入接点区",
            trigger: "blur"
          }
        ],
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
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          alert("submit!");
          return false;
        } else {
          // alert("error submit!!");
          return false;
        }
      });
    },
    reset() {
      this.form.dl = "";
      this.form.dly = "";
      this.form.aq = "";
      this.form.aqy = "";
    }
  }
};
</script>


<style scoped>
.no {
  color: #ff0000;
  margin-left: 0px;
  font-size: 12px;
}

.nopull {
  width: 400px;
}

.pull {
  width: 100%;
}

.tableTitle {
  padding: 5px 5px;
  border-left: 5px solid #409eff;
  color: #666;
  font-weight: 1000;
  margin-bottom: 10px;
}
.content {
  padding-left: 10px;
}
</style>
