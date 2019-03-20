<template>
  <div id="wel" class="app-container">
    <strong>WELCOME！</strong>
    <br>
    <br>
    <br>
    <strong>欢迎来到全球家庭共享平台后台系统！</strong>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: "Home",
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
        document.getElementById("wel").style.fontSize = "30px";
      }
    });
  }
};
</script>

<style scoped>
#wel {
  text-align: center;
  font-size: 65px;
}
.app-container {
  background-color: transparent;
}

strong {
  display: inline-block;
  width: 100%;
  margin: auto;
  color: #42b983;
}
</style>
