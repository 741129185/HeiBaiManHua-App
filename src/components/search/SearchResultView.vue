<template>
  <div class="result-box">
    <div class="result-box-res" v-if="$route.query.matchList.length > 0" >
      <div class="result-text">
        <span>搜索到{{$route.query.matchList.length}}篇相关的文章</span>
      </div>
      <div class="result-demo" v-for="(item,index) in $route.query.matchList" :key="index" @click=toDetailPage(item,index)>
        <div class="demo-title">{{item.title}}</div>
        <div class="demo-imgList">
          <ul :class="{twoPic:item.imgList.length==2}">
            <li :class="{only:item.imgList.length === 1}"><img :src="item.imgList[0]"></li>
            <li v-show="item.imgList.length>=2"><img :src="item.imgList[1]"></li>
            <li v-show="item.imgList.length>=3"><img :src="item.imgList[2]"></li>
          </ul>
        </div>
        <div class="demo-info">
          <div class="category"><span class="icon"></span><span>{{currentName[index]}}</span></div>
          <div class="update-time"><span class="icon"></span><span>{{item.updateTime}}</span></div>
        </div>
      </div>
    </div>
    <div class="result-box-none" v-if="$route.query.matchList.length === 0">
      <div class="null-img"><img src="../../assets/img/resultNull.png"></div>
      <p>该栏目暂无内容</p>
    </div>
    <Footer class="foot" v-show="$route.query.matchList.length>3 || $route.query.matchList.length === 0"></Footer>
  </div>
</template>
<script>
  import Footer from '../public/Footer.vue'
    export default{
      name: 'SearchResultView',
      props: ['caricature'],
      components: {
        Footer
      },
      methods: {
        toDetailPage(item, index) {
            this.$router.push({
              name: 'DetailView',
              params: {
                id: this.$route.query.matchList[index].id,
                itemDetail: item
              }
            })
        }
      },
      computed: {
        currentName() {
            let resArr = []
            for (let i in this.caricature) {
                for (let j = 0; j < this.caricature[i].detail.length; j++) {
                    for (let k in this.$route.query.matchList) {
                      if (this.$route.query.matchList[k].title === this.caricature[i].detail[j].title) {
                        resArr.push(this.caricature[i].name)
                      }
                    }
                }
            }
            return resArr
        }
      }
    }
</script>
<style lang="scss" scoped>
.result-box{
  width: 100%;
  height: 100%;
  .result-box-res{
    height: 100%;
    width: 100%;
    .result-text{
      width: 100%;
      height: 70px;
      box-sizing: border-box;
      padding:10px 25px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 3.2;
      &>span{
        font-size: 20px;
        font-weight: 700;
        color: #273746;
      }
    }
    .result-demo{
      padding: 15px;
      width: 100%;
      height: 184px;
      box-sizing: border-box;
      .demo-title{
        margin-bottom: 10px;
        padding-left: 10px;
        width: 100%;
        height: 20px;
        box-sizing: border-box;
        line-height: 20px;
        font-size: 15px;
        font-weight: 700;
        color:#273746;
        white-space : nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .demo-imgList{
        width: 100%;
        height: 88px;
        margin-bottom: 15px;
        &>ul{
          li{
            float: left;
            width: 33%;
            height: 88px;
            line-height: 88px;
            overflow: hidden;
            &.only{ // 图片数组中只有一张图片
              width: 305px;
              margin-left: 20px;
              &>img{
                width: 305px;
                height: 88px;
              }
            }
            &:nth-child(2),
            &:nth-child(3){
              margin-left: 1px;
            }
            img{
              z-index: 1;
              width: 100%;
              height: 100%;
            }
          }
          &.twoPic{ // 图片数组中只有两种图片
            li{
              width: 150px;
              margin-left: 15px;
            }
          }
        }
      }
      .demo-info{
        width: 100%;
        height: 20px;
        &>div{
          float: left;
          color: #748594;
          font-size: 12px;
        }
        .category{
          .icon{
            margin: 0 2px;
            transform: translateY(2px);
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url("../../assets/img/icon-name.png") no-repeat;
            background-size: 100%;
          }
        }
        .update-time{
          margin-left: 8px;
          .icon{
            margin: 0 2px;
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
  }
  .result-box-none{
    width: 100%;
    height: 170px;
    background: #fff;
    padding-top: 200px;
    padding-bottom: 300px;
    text-align: center;
    .null-img{
      height: 100px;
      margin-bottom: 20px;
      img{
        margin-top: 15px;
      }
    }
    p{
      font-size: 28px;
      color: #DDD;
    }
  }
}
</style>
