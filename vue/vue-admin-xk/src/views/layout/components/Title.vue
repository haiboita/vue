
<template>
    <span>{{ title }}</span>
</template>

<script>
// import path from 'path'
export default {
   data: {
    title: window.location.href
  },
  
  
}
</script>


<style scoped>
span{
    height: 48px;
    border-left: 5px solid #42b983
}
</style>

