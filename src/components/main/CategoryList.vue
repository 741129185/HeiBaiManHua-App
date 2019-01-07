<template>
  <div class="category-list" ref="menu">
    <ul class="list-main">
      <li v-for="(item,index) in caricature" :key="index" @click="changPage(index)">
        <router-link tag="span" :to="{name:'CurrentPageView', params:{name:item.category, nameCN:item.name, currentNum:index}}" >
          {{item.name}}
        </router-link>
      </li>
    </ul>
    <!--<div class="category-right" @click="close" ref="closeDiv"></div>-->
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
    export default {
      name: 'CategoryList',
      data() {
          return {
              scrollTop: false
          }
      },
      props: ['caricature', 'currentIndex', 'isDetailPage', 'titleText', 'showBlack', 'top', 'mainScroll'],
      methods: {
        _initMenuScroll() {
          // 注意 这里最好写个判断,保证不引起内存泄漏
          if (!this.menuScroll) {
            this.menuScroll = new BScroll(this.$refs.menu, {
              click: true // 允许点击
            })
          } else {
            this.menuScroll.refresh() // 更新滚动组件
          }
        },
        changPage(index) {
          this.$emit('update:currentIndex', index)
          this.$emit('update:isDetailPage', false)
          this.$emit('update:titleText', this.caricature[index].name)
          this.close()
          this.$emit('update:top', !this.top)
        },
        close() {
          this.$emit('update:showBlack', false)
        }
//        close() {
//          this.$refs.overbox.style.cssText = 'transform: translateX(-300px)'
//          this.$refs.closeDiv.style.cssText = 'display:none'
//          this.showBlack = false
//        }
      },
      created () {
        this.$nextTick(() => {
          this._initMenuScroll()
        })
      }
    }
</script>
<style lang="scss" scoped>
  .category-list{
    position: relative;
    float: left;
    /*width: 300px;*/
    width: 0;
    height: 100%;
    overflow: hidden;
    transition: all 0.5s;
    &.active{
      width: 44%;
    }

    .list-main{
      width: 100%;
      padding:20px 0;
      height: auto;
      &>li{
        width:100%;
        height:60px;
        border-bottom: 1px solid #f5f5f5;
        &>span{
          display: block;
          width: 100%;
          height: 100%;
          line-height: 60px;
          box-sizing: border-box;
          padding:0 30px 0 70px;
          font-size: 16px;
          color: #45494c;
        }
      }
    }
  }
</style>
