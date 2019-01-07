import Vue from 'vue'
import Router from 'vue-router'
import CurrentPageView from '../components/main/CurrentPageView.vue'
import HomePageView from '../components/main/HomePageView.vue'
import DetailView from '../components/main/DetailView.vue'
import SearchResultView from '../components/search/SearchResultView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePageView',
      component: HomePageView
    },
    {
      path: '/:name',
      name: 'CurrentPageView',
      component: CurrentPageView
    },
    {
      path: '/:id',
      name: 'DetailView',
      component: DetailView
    },
    {
      path: '/result',
      name: 'SearchResultView',
      component: SearchResultView
    }
  ]
})
