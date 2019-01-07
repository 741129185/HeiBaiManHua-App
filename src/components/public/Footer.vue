<template>
<div class="foot">
  <span class="foot-text">黑白漫话，分享新鲜事！</span>
</div>
</template>
<script>
    export default {
        name: 'Footer'
    }
</script>
<style lang="scss" scoped>
.foot{
  box-sizing: border-box;
  width: 100%;
  height: 97px;
  padding: 30px 0;
  background: #282828;
  .foot-text{
    display: block;
    width: 100%;
    height: 37px;
    line-height: 37px;
    text-align: center;
    color:#fff;
  }
}
</style>
