<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <div class="myHeader">
      <div id="logo">全球家庭共享平台</div>
      <div id="account">
        <navbar/>
        <!-- <tags-view/> -->
      </div>
    </div>
    <div class="main-container">
      <sidebar class="sidebar-container"/>
      <tags-view/>
      <app-main>
        <title/>
      </app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, Title } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Title
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
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
        document.getElementById("logo").style.display = "none";
      }
    });
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";

.myHeader {
  position: fixed;
  width: 100%;
  z-index: 999999;
}
#logo {
  float: left;
  width: 220px;
  height: 60px;
  font-size: 24px;
  font-weight: 500;
  line-height: 60px;
  text-align: center;
  background-color: $themeColor;
  color: $textColor;
  border-right: 1px solid $lineColor;
}
#account {
  width: 100%;
  // min-width: $minWidth;
  height: 60px;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: calc(100%);
  width: calc(100%);
  overflow: hidden;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  // z-index: 999;
}
</style>
