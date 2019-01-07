<template>
  <div class="content">
      <div class="exp" v-for="(item,index) in caricature" :key="index" >
         <div @click="goThisPage(item, homePageCurrent, index)" class="link">
           <div class="content-title">{{item.detail[homePageCurrent].title}}</div>
           <div class="img-box">
             <ul :class="{twoPic:item.detail[homePageCurrent].imgList.length==2}">
               <li :class="{only:item.detail[homePageCurrent].imgList.length === 1}"><img :src="item.detail[homePageCurrent].imgList[0]"></li>
               <li v-show="item.detail[homePageCurrent].imgList.length>=2"><img :src="item.detail[homePageCurrent].imgList[1]"></li>
               <li v-show="item.detail[homePageCurrent].imgList.length>=3"><img :src="item.detail[homePageCurrent].imgList[2]"></li>
             </ul>
           </div>
           <div class="info">
             <div class="category"><span class="icon"></span><span>{{item.name}}</span></div>
             <div class="update-time"><span class="icon"></span><span>{{item.detail[homePageCurrent].updateTime}}</span></div>
           </div>
         </div>
      </div>
    <navigation-bottom :goTop.sync="goTop" :homePage.sync="homePage" :caricature="caricature"></navigation-bottom>
    <Footer></Footer>
  </div>
</template>
<script>
  import Footer from '../public/Footer'
  import NavigationBottom from '../public/NavigationBottom'
    export default{
      name: 'HomePageView',
      props: ['caricature', 'caricatureIndex', 'homePageCurrent', 'isGoTop'],
      data() {
          return {
                homePage: 0,
                goTop: false
          }
      },
      watch: {
        homePage(newVal) {
              this.$emit('update:homePageCurrent', newVal)
        },
        homePageCurrent(newVal) {
              this.homePage = newVal
        },
        goTop(newVal) {
              this.$emit('update:isGoTop', newVal)
        }
      },
      components: {
        Footer,
        NavigationBottom
      },
      methods: {
        goThisPage(item, homePageCurrent, index) {
            this.$router.push({
              name: 'DetailView',
              params:
                    {
                      id: item.detail[homePageCurrent].id,
                      categoryNum: index,
                      category: item.category,
                      num: homePageCurrent
                    }
                })
          this.$emit('update:isGoTop', !this.goTop)
        }
      }
    }

</script>
<style lang="scss" scoped>
  .content{
    width: 100%;
    .exp{
      padding: 15px;
      width: 100%;
      height: 184px;
      box-sizing: border-box;
      .content-title{
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
      .img-box{
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
      .info{
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
</style>
