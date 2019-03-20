<template>
  <div class="app-container">
    <div>
      <el-row :gutter="40" class="panel-group" style="margin:20px 0 0 0">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <router-link to="/members/1">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-all-member">
                <svg-icon icon-class="all" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">会员总数</div>
                <div class="card-panel-num">895480</div>
              </div>
            </div>
          </router-link>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-add-member">
              <svg-icon icon-class="add" class-name="card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">新增会员</div>
              <div class="card-panel-num">50</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <router-link to="/finance/7">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-recharge">
                <svg-icon icon-class="chong" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">充值申请</div>
                <div class="card-panel-num">12</div>
              </div>
            </div>
          </router-link>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <router-link to="/finance/9">
            <div class="card-panel">
              <div class="card-panel-icon-wrapper icon-withdraw">
                <svg-icon icon-class="ti" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">提现申请</div>
                <div class="card-panel-num">20</div>
              </div>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-row :gutter="40" class="panel-group" style="margin:20px 0 0 0">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-income">
              <svg-icon icon-class="allin" class-name="card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">总收入</div>
              <div class="card-panel-num">895480</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-pay">
              <svg-icon icon-class="allout" class-name="card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">总支出</div>
              <div class="card-panel-num">5000</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-gather">
              <svg-icon icon-class="allmoney" class-name="card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">总沉淀</div>
              <div class="card-panel-num">890480</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-provide">
              <svg-icon icon-class="bb" class-name="card-panel-icon"/>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">拨币</div>
              <div class="card-panel-num">17.251%</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div style="padding:30px 20px 10px 20px">
      <div class="tableTitle">最近半个月内公司财务</div>
      <el-table :data="incomeSituation" height="630" border size="small" style="width: 100%">
        <el-table-column align="center" prop="date" label="日期" width="180"></el-table-column>
        <el-table-column align="center" prop="income" label="总收入" width="180"></el-table-column>
        <el-table-column align="center" prop="pay" label="总支出"></el-table-column>
        <el-table-column align="center" prop="gather" label="总沉淀"></el-table-column>
        <el-table-column align="center" prop="provide" label="拨币"></el-table-column>
      </el-table>
    </div>

    <div style="padding:30px 20px 10px 20px">
      <div class="tableTitle b">最近半个月内公司财务图</div>
      <div class="chart-container">
        <chart height="100%" width="100%"/>
      </div>
    </div>

    <div style="padding:30px 20px 10px 20px">
      <div class="tableTitle b">全国会员分布图</div>
    </div>

    <div style="padding:30px 20px 10px 20px">
      <div class="tableTitle b">全国销售业绩图</div>
    </div>
  </div>
</template>


<script>
import Chart from "@/components/Charts/mixChart";

export default {
  name: "Home",
  components: {
    Chart
  },
  data() {
    return {
      incomeSituation: [
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        },
        {
          date: "2016-05-03",
          income: "1200",
          pay: "200",
          gather: "1200",
          provide: "15.012%"
        }
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  background-color: #ffffff;
}
.panel-group {
  .card-panel-col {
    margin-bottom: 10px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    // overflow: hidden;
    color: #666;
    background: #fff;
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    .card-panel-icon-wrapper {
      color: #fff;
    }
    .icon-all-member {
      background: #40c9c6;
    }
    .icon-add-member {
      background: #67c23a;
    }
    .icon-recharge {
      background: #f4516c;
    }
    .icon-withdraw {
      background: #34bfa3;
    }
    .icon-income {
      background: #ff7226;
    }
    .icon-pay {
      background: #304156;
    }
    .icon-gather {
      background: #ab43fc;
    }
    .icon-provide {
      background: #36a3f7;
    }
    &:hover {
      box-shadow: 0 3px 25px 0 rgba(0, 0, 0, 0.3);
      transition: 300ms;
      top: -1px;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 5px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      text-align: center;
      .card-panel-text {
        line-height: 18px;
        // color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 24px;
      }
    }
  }
}

.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  border: 1px solid #868585;
}
</style>