<template>
<div id="app">
  <Loading v-if="isLoading"></Loading>
  <div class="app-over" ref="overbox" v-else>
    <!--分类菜单组件-->
      <category-list
        :class="{active:showBlack}"
        :caricature="caricature"
        :currentIndex.sync="currentIndex"
        :showBlack.sync="showBlack"
        :isDetailPage.sync="isDetailPage"
        :titleText.sync="titleText"
        :top.sync="top">
      </category-list>

      <main-view
        :caricature="caricature"
        :currentIndex.sync="currentIndex"
        :showBlack.sync="showBlack"
        :isDetailPage.sync="isDetailPage"
        :titleText.sync="titleText"
        :top.sync="top">
      </main-view>
  </div>
</div>
</template>

<script>
import Loading from './components/public/Loading'
import CategoryList from './components/main/CategoryList'
import MainView from './components/main/MainView'
export default {
  name: 'App',
  data () {
    return {
      titleText: '黑白漫话，分享新鲜事！',
      caricature: {},
      currentIndex: 0,
      showBlack: false,
      scrollLog: 0,
      clickEleDetail: {},
      isDetailPage: false,
      isLoading: true,
      top: false
    }
  },
  components: {
    CategoryList,
    MainView,
    Loading
  },
  methods: {},
  created () {
    this.$axios.get('/api/caricature')
      .then(res => {
        res = res.data
        if (res.errno === 0) { // 模仿真实开发,判断当前数据是否有权限获取
          this.caricature = res.data
          this.isLoading = false
        }
      })
  }
}
</script>

<style lang="scss">
  #app{
    /*display: flex;*/
    position: fixed;
    flex-direction: row;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow:hidden;
    .app-over{
      width: 180%;
      height: 100%;
    }

  }
</style>
