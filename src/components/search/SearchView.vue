<template>
<div class="search-view">
  <div class="search-box">
    <input type="text" placeholder="请输入搜索关键词" v-model="searchWorld">
    <button class="searchBtn" @click="search"><i></i></button>
    <div class="quite" @click="close()"><span></span></div>
  </div>
</div>
</template>
<script>
    export default {
        name: 'SearchView',
        props: ['searchPage', 'caricature', 'searchResult'],
        data() {
          return {
            searchWorld: '',
            allList: [],
            matchList: []
          }
        },
        methods: {
          close() {
              this.$emit('update:searchPage', false)
            },
          search() {
            if (this.searchWorld !== '') {
                this.$emit('update:searchPage', false)
                this.$emit('update:searchResult', true)
                this.dataHandle()
                for (let i = 0; i < this.allList.length; i++) {
                  if (this.allList[i].title.indexOf(this.searchWorld) !== -1) {
                    this.matchList.push(this.allList[i])
                  }
                }
                this.$router.push({
                        name: 'SearchResultView',
                        query: {
                            matchList: this.matchList
                        }
                })
              }
          },
          dataHandle() {
            for (let i in this.caricature) {
              for (let j = 0; j < this.caricature[i].detail.length; j++) {
                    this.allList.push(this.caricature[i].detail[j])
              }
            }
          }
        }
    }
</script>
<style lang="scss" scoped>
.search-view{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right:0;
  background-color:#fff;
  z-index: 60;
  box-sizing: border-box;
  padding: 75px 20px 0 20px;
  .search-box{
    position: relative;
    width: 100%;
    height: 45px;
    &>input{
      position: absolute;
      top: 0;
      left: 0;
      padding:0 0 0 20px;
      box-sizing: border-box;
      display: inline-block;
      width: 255px;
      height: 45px;
      border: 1px solid #e2e2e2;
      font-size: 15px;
      /*color:#e2e2e2;*/
    }
    .searchBtn{
      position: absolute;
      top: 0;
      right: 0;
      padding:0 25px;
      display: inline-block;
      width: 80px;
      height: 45px;
      background-color: #000;
      border: 0;
      text-align: center;
      &>i{
        margin: 0 auto;
        display: block;
        width: 15px;
        height: 15px;
        background: url("../../assets/img/search-white.png") no-repeat;
      }
    }
    .quite{
      box-sizing: border-box;
      padding: 15px;
      position: absolute;
      width: 50px;
      height: 50px;
      top: -60px;
      right: -10px;
      &>span{
        display: block;
        width: 20px;
        height: 20px;
        background: url("../../assets/img/quite-icon.png") no-repeat;
      }
    }
  }
}
</style>
