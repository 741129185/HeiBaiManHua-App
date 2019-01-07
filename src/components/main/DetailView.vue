<template>
  <div class="page-content">
    <div class="content">
      <div class="current-header">
        <h1>{{currentTitle}}</h1>
        <div class="info">
          <div class="category"><span class="icon"></span><span>{{currentCategory}}</span></div>
          <div class="update-time"><span class="icon"></span><span>{{currentUpdateTime}}</span></div>
        </div>
      </div>
      <div class="imgList">
        <img v-for="(item,index) in currentImgList" :key="index" :src="item">
      </div>
      <p class="text">
      <span style="color:#808080;font-size: 14px;">
        订阅我们的公众号：<strong style="font-weight: 700">黑白漫话</strong>&nbsp;&nbsp;&nbsp;微信ID：heibai_manhua<br>
        回复“<strong style="font-weight: 700">黑白漫话</strong>”可快速查看更多相关文章
      </span>
      </p>
    </div>
    <div class="all-category">
      <li v-for="(item, index) in caricature" :key="index">{{item.name}}</li>
    </div>
    <div class="nextOne" @click="nextOne">
      <div class="nextOne-box">
        <img :src="nextImg">
        <span class="msg"><span ref="msg">下一篇：</span><br>{{nextTitle}}</span>
      </div>
    </div>
    <div class="message-board">
      <div class="board-header">
        <div class="board-header-head">
          <div class="header-comment-number">
            <span class="num">0</span>
            <span class="rad"></span>
            <span class="text">条评论</span></div>
          <span class="login">登录</span>
        </div>
        <div class="msg"><input type="text" placeholder="来说两句吧..."></div>
      </div>
      <div class="message-content">
        <span>最新</span>
        <div class="message-list">NULL</div>
      </div>
    </div>
    <div class="others">
    </div>
    <Footer class="foot"></Footer>
  </div>
</template>
<script>
  import Footer from '../public/Footer'
  export default{
    name: 'DetailView',
    props: ['caricature', 'isGoTop'],
    data() {
      return {
        currentObj: null,
        thisId: '',
        thisImg: '',
        nextTitle: '',
        nextImg: '',
        nextObj: null,
        nextId: ''
      }
    },
    components: {
      Footer
    },
    computed: {
      currentTitle() {
        if (this.$route.params.category) {
          return this.caricature[this.$route.params.categoryNum].detail[this.$route.params.num].title
        } else if (this.$route.params.detail) {
          return this.$route.params.detail.title
        } else if (this.$route.params.itemDetail) {
          for (let i in this.caricature) {
            for (let j = 0; j < this.caricature[i].detail.length; j++) {
              if (this.$route.params.itemDetail.title === this.caricature[i].detail[j].title) {
                return this.caricature[i].detail[j].title
              }
            }
          }
        }
      },
      currentCategory() {
        if (this.$route.params.category) {
          return this.caricature[this.$route.params.categoryNum].name
        } else if (this.$route.params.detail) {
          return this.$route.params.name
        } else if (this.$route.params.itemDetail) {
          for (let i in this.caricature) {
            for (let j = 0; j < this.caricature[i].detail.length; j++) {
              if (this.$route.params.itemDetail.title === this.caricature[i].detail[j].title) {
                return this.caricature[i].name
              }
            }
          }
        }
      },
      currentUpdateTime() {
        if (this.$route.params.category) {
          return this.caricature[this.$route.params.categoryNum].detail[this.$route.params.num].updateTime
        } else if (this.$route.params.detail) {
          return this.$route.params.detail.updateTime
        } else if (this.$route.params.itemDetail) {
          for (let i in this.caricature) {
            for (let j = 0; j < this.caricature[i].detail.length; j++) {
              if (this.$route.params.itemDetail.title === this.caricature[i].detail[j].title) {
                return this.caricature[i].detail[j].updateTime
              }
            }
          }
        }
      },
      currentImgList() {
        if (this.$route.params.category) {
          return this.caricature[this.$route.params.categoryNum].detail[this.$route.params.num].imgList
        } else if (this.$route.params.detail) {
          return this.$route.params.detail.imgList
        } else if (this.$route.params.itemDetail) {
          for (let i in this.caricature) {
            for (let j = 0; j < this.caricature[i].detail.length; j++) {
              if (this.$route.params.itemDetail.title === this.caricature[i].detail[j].title) {
                return this.caricature[i].detail[j].imgList
              }
            }
          }
        }
      }
    },
    methods: {
      getNextOne() {
        this.thisId = this.$route.params.id
        for (let i in this.caricature) {
          for (let j = 0; j < this.caricature[i].detail.length; j++) {
            if (this.thisId === this.caricature[i].detail[j].id) {
                if (j + 1 === this.caricature[i].detail.length) {
                  this.$refs.msg.innerHTML = '这已经是该分类最后一篇了！'
                  this.$refs.msg.style.cssText = 'margin-left:40px;font-size:16px'
                  this.nextImg = this.caricature[i].detail[j].imgList[0]
                  this.nextId = this.caricature[i].detail[j].id
                  this.nextObj = this.caricature[i].detail[j]
                  this.nextTitle = ''
                } else {
                  this.nextId = this.caricature[i].detail[j + 1].id
                  this.nextTitle = this.caricature[i].detail[j + 1].title
                  this.nextImg = this.caricature[i].detail[j + 1].imgList[0]
                  this.nextObj = this.caricature[i].detail[j + 1]
                }
            }
          }
        }
      },
      nextOne() {
        this.$router.push(
          {
            name: 'DetailView',
            params: {
              id: this.nextId,
              detail: this.nextObj
            }
          })
        this.$emit('update:isGoTop', !this.isGoTop)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getNextOne()
      })
    },
    updated: function () { // 点击完下一篇
      this.getNextOne()
    }
  }
</script>
<style lang="scss" scoped>
  .page-content {
    width: 100%;
    height: auto;
    .content {
      width: 100%;
      padding: 20px 25px;
      box-sizing: border-box;
      border-bottom: 1px solid #e7e7e7;
      .current-header {
        margin: 0 0 30px;
        padding: 0 0 20px;
        width: 100%;
        border-bottom: 1px solid #e7e7e7;
        position: relative;
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 75px;
          height: 2px;
          background-color: #282828;
        }
        & > h1 {
          box-sizing: border-box;
          width: 100%;
          padding-right: 30px;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 2px;
          line-height: 1.4;
          margin-bottom: 30px;
          color: #273746;
        }
        .info {
          width: 100%;
          height: 28px;
          & > div {
            float: left;
            color: #748594;
            font-size: 12px;
          }
          .category {
            .icon {
              margin: 0 4px;
              transform: translateY(2px);
              display: inline-block;
              width: 12px;
              height: 12px;
              background: url("../../assets/img/icon-name.png") no-repeat;
              background-size: 100%;
            }
          }
          .update-time {
            margin-left: 8px;
            .icon {
              margin: 0 4px;
              transform: translateY(2px);
              display: inline-block;
              width: 12px;
              height: 12px;
              background: url("../../assets/img/icon-time.png") no-repeat;
              background-size: 100%;
            }
          }
        }
      }
      .imgList {
        margin: 0 -25px 0 -25px;
        & > img {
          max-width: 100%;
          margin: 0 auto;
          height: auto;
          display: block;
        }
      }
      .text {
        font-size: 18px;
        line-height: 1.68;
      }
    }
    .all-category {
      width: 100%;
      box-sizing: border-box;
      padding: 35px 25px;
      border-bottom: 1px solid #e7e7e7;
      & > li {
        display: inline-block;
        height: 27px;
        line-height: 30px;
        font-size: 14px;
        padding: 0 1rem;
        border: 1px solid #e6e6e6;
        border-radius: 2px;
        cursor: pointer;
        margin-bottom: 7px;
        margin-left: 2px;
        color: #808080;
        font-weight: bold;
      }
    }
    .nextOne {
      margin: 0 auto;
      padding-top: 40px;
      padding-bottom: 25px;
      border-bottom: 1px solid #e7e7e7;
      width: 100%;
      height: 100px;
      .nextOne-box {
        &::before {
          content: '';
          position: absolute;
          background-color: rgba(0, 0, 0, .46);
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: .65;
        }
        position: relative;
        margin: 0 auto;
        width: 86%;
        height: 100px;
        box-sizing: border-box;
        background: #fff;
        img {
          width: 100%;
          height: 100px;
        }
        .msg {
          line-height: 20px;
          width: 85%;
          position: absolute;
          color: #fff;
          left: 50%;
          top: 50%;
          transform: translateY(-50%) translateX(-50%);
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis
        }
      }
    }
    .message-board {
      margin-top: 25px;
      margin-bottom: 25px;
      width: 100%;
      padding: 0 25px;
      box-sizing: border-box;
      border-bottom: 1px solid #e7e7e7;
      .board-header {
        width: 100%;
        background-color: #f5f5f5;
        padding: 10px 0;
        .board-header-head {
          position: relative;
          box-sizing: border-box;
          padding-top: 25px;
          .header-comment-number {
            margin-left: 15px;
            .num {
              display: inline-block;
              width: 25px;
              height: 30px;
              background: #fca222;
              border-radius: 5px;
              text-align: center;
              line-height: 30px;
              font-weight: bold;
              color: #fff;
            }
            .rad {
              width: 0;
              height: 0;
              margin-top: -3px;
              margin-left: -5px;
              display: inline-block;
              border-top: 5px solid transparent;
              border-bottom: 5px solid transparent;
              border-left: 5px solid #fca222;
              vertical-align: middle;
            }
            .text {
              font-weight: 600;
              color: #000;
              font-size: 24px;
              vertical-align: middle;
            }
          }
          .login {
            position: absolute;
            right: 15px;
            bottom: 0;
            font-weight: 600;
            color: #000;
            font-size: 24px;
            vertical-align: middle;
          }
        }
        .msg {
          margin-top: 10px;
          padding: 0 12px;
          box-sizing: border-box;
          width: 310px;
          height: 50px;
          & > input {
            margin: 0;
            padding-left: 10px;
            box-sizing: border-box;
            display: inline-block;
            width: 300px;
            height: 40px;
            border: 2px solid #fca222;
            border-radius: 5px;
            font-size: 18px;
          }
        }
      }
      .message-content {
        width: 100%;
        margin-top: 22px;
        & > span {
          display: block;
          width: 100%;
          height: 36px;
          font-weight: 700;
          padding-left: 15px;
          border-left: 5px solid #fca222;
          font-size: 24px;
          line-height: 36px;
        }
        .message-list {
          box-sizing: border-box;
          margin-top: 20px;
          width: 100%;
          height: 120px;
          padding-left: 15px;
          line-height: 120px;
          color: #fca222;
          font-size: 20px;
          text-align: center;
        }
      }
    }
    .foot {
      margin-top: 10px;
    }
  }
</style>
