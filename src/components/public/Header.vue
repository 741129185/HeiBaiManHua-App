<template>
<div class="header" :class="{hidden:headHidden}">
  <div class="category">
    <button class="categoryBtn" @click="showCategoryList">
      <span class="icon-bar" ref="bar1" ></span>
      <span class="icon-bar" ref="bar2" ></span>
      <span class="icon-bar" ref="bar3" ></span>
    </button>
  </div>
  <router-link to="/" tag="div" class="logo">
    <span class="logo-img" @click="toHomePage"></span>
  </router-link>
  <div class="search">
      <button class="searchBtn" @click="showSearchView">
        <i class="search-icon"></i>
      </button>
  </div>
  <transition name="fade">
    <SearchView v-if="searchPage" :searchPage.sync="searchPage" :searchResult.sync="searchResult" :caricature="caricature"></SearchView>
  </transition>
</div>
</template>
<script>
import SearchView from '../search/SearchView'
export default {
  name: 'Header',
  props: ['show', 'headHidden', 'isDetailPage', 'homeText', 'caricature', 'homePageCurrent', 'search', 'isGoTop'],
  data () {
      return {
        searchPage: false,
        searchResult: false
      }
  },
  components: {
    SearchView
  },
  watch: {
    show(newVal) {
        if (newVal === false) {
          this.$refs.bar1.style.cssText = 'transform: translate3d(0,0,0) rotate(0)'
          this.$refs.bar2.style.cssText = 'opacity: 1'
          this.$refs.bar3.style.cssText = 'transform: translate3d(0,0,0) rotate(0)'
        }
        if (newVal === true) {
          this.$refs.bar1.style.cssText = 'transform: translate3d(0,6px,0) rotate(45deg)'
          this.$refs.bar2.style.cssText = 'opacity: 0'
          this.$refs.bar3.style.cssText = 'transform: translate3d(0,-6px,0) rotate(-45deg)'
        }
    },
    searchResult(newVal) {
          this.$emit('update:search', newVal)
    }
  },
  methods: {
    showCategoryList() {
        this.searchResult = false
        this.$emit('update:show', !this.show)
      },
    showSearchView() {
      this.searchPage = true
    },
    toHomePage() {
      this.searchResult = false
      this.$emit('update:homeText', '黑白漫话，分享新鲜事！')
      this.$emit('update:detailPage', false)
      this.$emit('update:search', false)
      this.$emit('update:homePageCurrent', 0)
      this.$emit('update:isGoTop', !this.isGoTop)
    }
  }
  }
</script>
<style lang="scss" scoped>
.header{
  display: flex;
  width: 100%;
  height: 66px;
  border-bottom: 1px solid #d4d4d4;
  box-shadow: 0 0 12px #BEBEBE;
  transition: all 0.3s;
  &.hidden{
    transform: translateY(-66px);
  }
  .category{
    position: relative;
    width: 30%;
    height: 100%;
    background: #fff;
    .categoryBtn{
      padding:15px 13px;
      margin: 0;
      border: none;
      position: absolute;
      display: block;
      width: 48px;
      height: 44px;
      left: 10px;
      top: 12px;
      background-color: #fff;
      .icon-bar{
        display: block;
        width: 22px;
        height: 2px;
        background-color: #282828;
        border-radius: 1px;
        transition:all,0.5s;
        &:nth-child(2),
        &:nth-child(3){
          margin-top: 4px;
        }
      }
    }
  }
  .logo{
    width: 40%;
    height: 100%;
    background: #fff;
    .logo-img{
      display: inline-block;
      width: 150px;
      height: 100%;
      background: url("../../assets/img/logo.png") no-repeat;
      background-size: 75%;
      background-position: center
    }
  }
  .search{
    position: relative;
    width: 30%;
    height: 100%;
    background-color: #fff;
    .searchBtn{
        padding: 0;
        margin: 0;
        display: block;
        width: 50px;
        height: 50px;
        line-height: 60;
        position: absolute;
        right: 12px;
        top: 10px;
        background-color: #fff;
        border: 0;
        .search-icon{
          margin:0 auto;
          display: block;
          height: 16px;
          width: 16px;
          background: url("../../assets/img/search.png") no-repeat;
          background-size: 100%;
        }
      }
  }
  .fade-enter-active,.fade-leave-active{
    transition: all .5s;
  }
  .fade-enter{
    transform: scale(2);
    opacity: 0.5;
  }
  .fade-leave-to{
    transform: translateX(100%);
    opacity: 0.5;
  }
}
</style>
