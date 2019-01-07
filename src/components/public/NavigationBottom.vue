<template>
<div class="navigation">
    <div class="content">
      <transition name="fade">
        <span v-show="homePage >= 1" @click="prePage">上页</span>
      </transition>
      <span :class="homePage+1 == 1 ? 'active': ''" @click="goClickPage($event)">1</span>
      <span :class="homePage+1 == 2 ? 'active': ''" @click="goClickPage($event)">2</span>
      <span ref="span1" @click="goClickPage($event)">3</span>
      <span ref="span2" @click="goClickPage($event)">...</span>
      <span :class="homePage+1 == 10 ? 'active': ''" @click="goClickPage($event)">10</span>
      <transition name="move">
        <span v-show="homePage <= 8" @click="nextPage">下页</span>
      </transition>
    </div>
</div>
</template>
<script>
    export default {
      name: 'Navigation',
      props: ['caricature', 'homePage', 'goTop'],
      methods: {
        prePage() {
          this.$emit('update:homePage', this.homePage - 1)
        },
        nextPage() {
          this.$emit('update:homePage', this.homePage + 1)
        },
        goClickPage(e) {
          const pageNum = parseInt(e.target.innerHTML)
          if (pageNum) {
            this.$emit('update:homePage', pageNum - 1)
            this.$emit('update:goTop', !this.goTop)
          }
        }
      },
      watch: {
        homePage(newVal) {
          if (newVal + 1 < 3) {
              this.$refs.span1.style.cssText = 'background: #fff;color: #666;border-color: #ccc;'
              this.$refs.span2.style.cssText = 'background: #fff;color: #666;border-color: #ccc;'
            }
            if (newVal + 1 === 3) {
              this.$refs.span1.innerHTML = '3'
              this.$refs.span2.innerHTML = '...'
              this.$refs.span1.style.cssText = 'background: #282828;color: #fff;border-color: #282828;'
              this.$refs.span2.style.cssText = 'background: #fff;color: #666;border-color: #ccc;'
            }
            if (newVal + 1 > 3) {
              this.$refs.span1.innerHTML = '...'
              this.$refs.span2.innerHTML = `${newVal + 1}`
              this.$refs.span1.style.cssText = 'background: #fff;color: #666;border-color: #ccc;'
              this.$refs.span2.style.cssText = 'background: #282828;color: #fff;border-color: #282828;'
            }
            if (newVal + 1 === 10) {
              this.$refs.span2.style.cssText = 'background: #fff;color: #666;border-color: #ccc;'
              this.$refs.span1.innerHTML = '3'
              this.$refs.span2.innerHTML = '...'
            }
        }
      }
    }
</script>
<style lang="scss" scoped>
.navigation {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px 60px 20px;
    background: #f4f4f4;
    .content{
      width: 90%;
      margin: 0 auto;
      .fade-enter,.fade-leave-to{
        transform: translateY(-100%) translateX(-100%);
        opacity: 0.3;
      }
      .fade-enter-active,.fade-leave-active{
        transition: all .5s;
      }
      .move-enter,.move-leave-to{
        transform: translateY(-100%);
        opacity: 0.2;
      }
      .move-enter-active,.move-leave-active{
        transition: all .5s;
      }
      &>span{
        margin-left: 2px;
        padding:0 10px;
        background: #fff;
        border-radius: 3px;
        display: inline-block;
        line-height: 28px;
        text-align: center;
        border: 1px solid #ccc;
        color: #666;
        font-size: 13px;
        &.active{
          background: #282828;
          color: #fff;
          border-color: #282828;
        }
      }
    }

  }
</style>
