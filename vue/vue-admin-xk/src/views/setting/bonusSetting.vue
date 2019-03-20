<template>
  <div class="app-container">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="110px">
      <div class="tableTitle">奖金结算规则设置</div>
      <div class="content">
        <el-form-item label="报单金额" prop="num">
          <el-input v-model="form.num" size="medium" style="width:100px"></el-input>&nbsp;元；
        </el-form-item>
        <el-form-item label="会员等级" prop="name">
          <el-input v-model="form.name" size="medium"></el-input>&nbsp;(级别：对应金额)注：会员升级需要补对应的差价(第一级别需要补全额)；
        </el-form-item>
        <el-form-item label="消费返还" prop="isfree">商城消费按照消费产品对应消费积分的&nbsp;
          <el-input v-model="form.num" size="medium" style="width:100px"></el-input>&nbsp;%进入[待分红积分账户]；
        </el-form-item>
        <el-form-item label="分销奖" prop="money">
          <el-input v-model="form.money" size="medium"></el-input>
          &nbsp;{代数：比例(%)}；
        </el-form-item>
        <el-form-item label="月分红" prop="idcard">待分红积分累计够&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;积分开始计算&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;天后转入到可分红积分；可分红积分每累积到&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;算&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;个分红单位；后台每月手动输入金额加权平分给持有可分红积分会员，按照分红单位分的储值积分；
        </el-form-item>
        <el-form-item label="升级层级奖" prop="phone">
          <el-input v-model="form.phone" size="medium"></el-input>&nbsp;[级别：奖励D币]；
        </el-form-item>
        <el-form-item label="升级代数奖">
          <el-input v-model="form.phone" size="medium"></el-input>&nbsp;[级别：奖励D币]；
        </el-form-item>
        <el-form-item label="扣除返还">扣除升级金额的&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;%经过&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;：
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;的转换；按照&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:300px"></el-input>
          &nbsp;{代数：比例(%)}进入待分红积分账户；
        </el-form-item>
        <el-form-item label="直推奖">
          <el-input v-model="form.phone" size="medium"></el-input>&nbsp;[级别：奖励D币]。
        </el-form-item>
      </div>

      <div class="tableTitle">其他规则设置</div>
      <div class="content">
        <el-form-item label="复投规则" prop="num">扣除奖励D币的&nbsp;
          <el-input v-model="form.num" size="medium" style="width:100px"></el-input>&nbsp;%作为共享D币，累计够&nbsp;
          <el-input v-model="form.num" size="medium" style="width:100px"></el-input>&nbsp;个共享D币自动复投一单一级子点位；子点位升级到满级后各个币种可以一键关联到主账号；
        </el-form-item>
        <el-form-item label="平台管理" prop="name">扣除奖励D币的&nbsp;
          <el-input v-model="form.name" size="medium" style="width:100px"></el-input>&nbsp; %作为平台管理费；
        </el-form-item>
        <el-form-item label="D币转换" prop="isfree">所以D币收入满&nbsp;
          <el-input v-model="form.num" size="medium" style="width:100px"></el-input>&nbsp;后；以后所有收益D币的&nbsp;
          <el-input v-model="form.num" size="medium" style="width:100px"></el-input>&nbsp;%按照10：1转入储值积分；
        </el-form-item>
        <el-form-item label="转换规则" prop="money">
          最低转币金额&nbsp;
          <el-input v-model="form.money" size="medium" style="width:100px"></el-input>元，
          &nbsp;且必须是&nbsp;
          <el-input v-model="form.num" size="medium" style="width:100px"></el-input>&nbsp;的整数倍；
          <br>D币和储值积分的转换比例为&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;：
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;
          ；也可以以同等比例逆转；
        </el-form-item>
        <el-form-item label="提现规则" prop="idcard">最低提现金额&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;元，且必须是&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;的整数倍，被刺提现有&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;%的手续费&nbsp;
          <br>最高收取&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:100px"></el-input>&nbsp;元，提现日期为每周&nbsp;
          <el-input v-model="form.idcard" size="medium" style="width:300px"></el-input>。
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
export default {
  name: "bonusSetting",
  data() {
    return {
      form: {}
    };
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
.content {
  padding-left: 10px;
}
</style>