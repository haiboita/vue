<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <!-- <breadcrumb/> -->
    <div class="right-menu" id="phone">
      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img src="src\icons\head.png" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/home/home">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/setting/1">
            <el-dropdown-item>奖金设置</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;">修改管理员名称</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right-menu" id="pc">
      <!-- <template v-if="device!=='mobile'">
        <search class="right-menu-item"/>
      </template> -->
      <router-link class="inlineBlock right-menu-item hover-effect" to="/home/home">首页</router-link>

      <router-link class="inlineBlock right-menu-item hover-effect" to="/setting/1">奖金设置</router-link>

      <el-dropdown class="right-menu-item hover-effect">
        <div class="tabs">留言</div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/members/8">
            <el-dropdown-item>写留言</el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/members/8">
            <el-dropdown-item divided>收件箱</el-dropdown-item>
          </router-link>
          <router-link class="inlineBlock" to="/members/8">
            <el-dropdown-item divided>收件箱</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>

      <template v-if="device!=='mobile'">
        <screenfull class="right-menu-item hover-effect"/>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <img src="src\icons\head.png" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>欢迎页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;">修改管理员名称</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出系统</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
// import Search from "@/components/HeaderSearch";
import Screenfull from "@/components/Screenfull";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // Search,
    Screenfull
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
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
        document.getElementById("pc").style.display = "none";
        document.getElementById("phone").style.display = "block";
      }
    });
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";

.navbar {
  height: 60px;
  line-height: 60px;
  // margin-left: 220px;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  background-color: $themeColor;
  .hamburger-container {
    line-height: 60px;
    height: 60px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
  }
  #phone {
    display: none;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 15px;
      color: $textColor;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .tabs {
      text-align: center;
      height: 60px;
      line-height: 60px;
    }
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        height: 60px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

