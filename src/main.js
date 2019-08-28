import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import item_input from '@/components/item_input.vue';
import item_list from '@/components/item_list.vue';
Vue.component('item_input',item_input);
Vue.component('item_list',item_list);

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
