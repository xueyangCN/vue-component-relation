<template>
  <div>
    <div class="hello">
      <div :key = 'index' v-for = '(item,index) in configList'>
        <div style = 'text-align: left;'>
          <a href = 'javascript:;'>设置</a>
        </div>
        <component 
          @__setPublicData = '__setPublicData' 
          @__setPublicMethod = '__setPublicMethod' 
          @__setDataRelation = '__setDataRelation'
          @__publicDataChange = '__publicDataChange'
          @__triggerMethod = '__triggerMethod'
          :ref = 'item.name' :is = 'item.name'  
          :publicData = 'publicData' 
        />
      </div>
    </div>
    <div class = 'config'>
      <div class = 'item'>
        <b>组件名：</b>{{conf.name}}
      </div>
      <div class = 'item'>
        <b>data：</b>
        <span style = 'border:1px solid #ccc;padding:5px;cursor:pointer;margin:0 5px;' :key = 'index' v-for = '(item,index) in conf.datas' >{{item}}</span>
      </div>
      <div class = 'item'>
        <b>发布的data：</b>
        <span style = 'border:1px solid #ccc;padding:5px;cursor:pointer;margin:0 5px;' :key = 'index' v-for = '(item,index) in conf.publicData' >
          {{item}}
          <a href = 'javascript:;' @click = '_dele(item,conf)' >x</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin/boxMixin.js';
let configList = [
  {
    name: 'item_input',
    datas: ['name','phone'],
    alias: {'name':'name1'},
    publicData: ['name','phone'],
    dataRealtion: [],
    watchData:['name','phone'],
    methods: [],
    publicMethods: [],
    events: ['name_focus','name_change','phone_focus','phone_change','btn_submit'],//静态
    eventRelation: {//事件关联
      'name_focus':'input_name_focus',
      'btn_submit':'_query'
    },
  },
  {
    name: 'item_list',
    datas: ['name','phone'],
    alias: {
      'name': 'name1',
      'query': '_query'
    },
    publicData: [],
    dataRealtion: ['name1','phone'],
    watchData:[],
    methods: ['query'],//静态
    publicMethods: ['query'],
    events: [],
    eventRelation: {},
  },
]
export default {
  mixins: [mixin],
  data(){
    return {
      configList: [],
      conf: {}
    }
  },
  mounted(){
    this.configList = configList;
    for(let i in this.configList){
      this.$nextTick(() => {
        this.initConfig(this.configList[i]);
      })
    }
    this.$nextTick(() => {
      for(let i in this.publicData){
        this.__publicDataChange(i,this.publicData[i]);//初始化同步所有数据
      }
    })
    this.conf = this.configList[0];
  },
  methods: {
    initConfig({name,alias,publicData,dataRealtion,watchData,publicMethods,eventRelation}){
      let ctx = this.$refs[name][0];
      for(let i in alias){
        ctx.__setAlias(i,alias[i]);
      }
      if(publicData.length){
        publicData.map((item,index) => {
          ctx.__setData(item);
        })
        // console.log(this.publicData);
      }
      if(dataRealtion.length){
        dataRealtion.map((item,index) => {
          ctx.__setDataRelation(item);
        })
        // console.log(this.publicDataRelations);
      }
      if(watchData.length){
        watchData.map((item,index) => {
          ctx.__watch(item);
        })
      }
      if(publicMethods.length){
        publicMethods.map((item,index) => {
          ctx.__setPublicMethod(item);
        })
      }
      for(let i in eventRelation){
        ctx.__setEventRelation(i,eventRelation[i])
      }
    },
    _dele(conf,item){
      console.log(conf,item);
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  float:left;
}
.config{
  float:right;
  width:500px;
  margin:20px;
  border:1px solid #ccc;
  padding:20px;
}
.config .item{
  padding:10px 0;
}
</style>
