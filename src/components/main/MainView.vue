<template>
  <div class="app-main" :class="{active:showBlack}">
    <div class="black-box" :class="{active:showBlack}" @click="close"></div>
    <Header class="header"
            :homePageCurrent.sync="homePageCurrent"
            :caricature="caricature"
            :detailPage.sync="detailPage"
            :show.sync="show"
            :homeText.sync="homeText"
            :headHidden="headHidden"
            :search.sync="search"
            :isGoTop.sync="isGoTop">
    </Header>
    <div class="scroll-box" ref="main">
      <ul>
          <div class="title" v-show="!$route.params.id && !this.search">
            <div class="category">
              <h1 :class="{active:this.$route.params.name}">{{currentTitleText}}</h1>
            </div>
            <div class="skip">
              <span>第</span>
              <input type="text" ref="inputVal">
              <span>页</span>
              <button class="skipBtn" @click="toPage">转到</button>
            </div>
          </div>
          <router-view
            :homePageCurrent.sync="homePageCurrent"
            :caricature="caricature"
            :currentIndex="currentIndex"
            :isGoTop.sync="isGoTop">
          </router-view>
      </ul>
    </div>
    <div class="go-top" ref="top"><img src="../../assets/img/top.png" @click="goTop"></div>
  </div>
</template>
<script>
  import Header from '../public/Header'
  import BScroll from 'better-scroll'
    export default {
      name: 'MainView',
      props: ['caricature', 'currentIndex', 'isDetailPage', 'titleText', 'showBlack', 'top'],
      data() {
        return {
          headHidden: false,
          show: false,
          homeText: true,
          search: false,
          detailPage: false,
          homePageCurrent: 0,
          isGoTop: false
        }
      },
      computed: {
          currentTitleText() {
            let res = ''
            if (this.$route.params.name) {
              for (let i in this.caricature) {
                if (this.caricature[i].category === this.$route.params.name) {
                  res = this.caricature[i].name
                }
              }
            } else {
              res = this.titleText
            }
            return res
          }
      },
      components: {
        Header
      },
      watch: {
        showBlack(newVal) {
            this.show = newVal
        },
        show(newVal) {
          this.$emit('update:showBlack', newVal)
        },
        titleText(newVal) {
          this.homeText = newVal
        },
        homeText(newVal) {
          this.$emit('update:titleText', newVal)
        },
        isDetailPage(newVal) {
          this.detailPage = newVal
        },
        homePageCurrent(newVal) {
          this.$refs.inputVal.value = newVal + 1
        },
        top(newVal) {
            this.isGoTop = newVal
        },
        isGoTop(oldVal, newVal) {
            if (oldVal !== newVal) {
                this.goTop()
            }
        }
      },
      methods: {
        _initMainScroll() {
          // 注意 这里最好写个判断,保证不引起内存泄漏
          if (!this.mainScroll) {
            this.mainScroll = new BScroll(this.$refs.main, {
              click: true, // 允许点击
              probeType: 3 // 滑动监听
            })
            // 添加滑动监听
            this.mainScroll.on('scroll', ({y}) => {
              if (y === 0) {
                this.$refs.top.style.cssText = 'opacity:0;display:none;'
              }
              if (y < -66 && y < this.scrollLog) {
                this.$refs.top.style.cssText = 'opacity:0.8;display:block;'
                this.headHidden = true
              }
              if (y > this.scrollLog) {
                this.headHidden = false
              }
              this.scrollLog = y
            })
          } else {
            this.mainScroll.refresh() // 更新滚动组件
          }
        },
        goTop() {
          this.mainScroll.scrollTo(0, 0, 500)
        },
        toPage() {
          let num = parseInt(this.$refs.inputVal.value)
          if (num) {
              if (num > 0 && num <= 10) {
                this.homePageCurrent = (num - 1)
              } else if (num < 0 || num > 10) {
                  alert('超出页数，已为您切换至最后一页')
                this.homePageCurrent = 9
                this.$refs.inputVal.value = 10
              }
          } else {
              alert('请输入正确的页数')
          }
        },
        close() {
            this.$emit('update:showBlack', !this.showBlack)
        }
      },
      updated: function () { // 滚动组件要复用 页面有更新
        this.$nextTick(function() {
          this._initMainScroll()
        })
      }
    }
</script>
<style lang="scss" scoped>
  .app-main {
    float: left;
    width: 55.5%;
    height: 100%;
    overflow: hidden;
    z-index: 60;
    .black-box{
      display: block;
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 21%;
      height: 100%;
      transition: all .5s;
      &.active{
        left: 79%;
        z-index: 55;
        background: rgba(0,0,0,.8);
      }
    }
    .header{
      position: absolute;
      background: #fff;
      z-index: 50;
    }
    .scroll-box{
      width: 100%;
      height: 100%;
      overflow: hidden;
      &>ul{
        height: auto;
        &::before{
          content: '';
          display: block;
          width: 100%;
          height: 66px;
        }
      }
      .title{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        color:#273746;
        padding:10px 25px;
        .category{
          display: inline-block;
          height: 100%;
          line-height: 50px;
          &>h1{
            margin: 0;
            display: block;
            width: 100%;
            height: 100%;
            font-weight: bold;
            font-size: 14px;
            line-height: 60px;
            color:#273746;
            z-index: 1;
            &.active{
              font-size: 20px;
            }
          }
        }
        .skip{
          display: inline-block;
          float: right;
          position: absolute;
          top: 25px;
          right: 25px;
          &>span{
            color:#a5aeb5;
            font-size: 14px;
          }
          &>input{
            display: inline-block;
            box-sizing: border-box;
            width: 50px;
            height: 25px;
            border: 1px solid #e5e7ec;
            padding:0 10px;
            text-align: center;
          }
          .skipBtn{
            display: inline-block;
            width: 40px;
            height: 21px;
            border:0;
            color:#a5aeb5;
          }
        }
      }
    }
    .go-top{
      transition: all .3s ease;
      padding: 10px;
      background: #282828;
      position: fixed;
      box-sizing: border-box;
      bottom: 38px;
      right: 8px;
      width: 35px;
      height: 35px;
      z-index: 70;
      border-right: 2px;
      opacity: 0;
      display: none;
    }
  }
</style>
