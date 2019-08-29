<template>
  <div>
    <div>
      <el-button @click = 'refresh'>刷新</el-button>
    </div>
    <div class="hello">
      <div :key = 'index' v-for = '(item,index) in configList'>
        <div style = 'text-align: left;'>
          <a href = 'javascript:;' @click = 'setConf(index)'>设置</a>
        </div>
        <component 
          v-if = 'toShow'
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
      <div style = 'margin:10px;padding:10px;border:1px solid #ccc;'>
        <b>共有资源</b>
        <div style = 'padding:10px;border:1px solid #ccc;'>
          <b>已发布的属性：</b>
          <div :key = 'index' v-for = '(item,index) in configList'>
            <div>
              <span style = 'margin:0 5px;' :key = '`q${index}`' v-for = '(item1,index) in item.publicData'>{{item.alias[item1]?item.alias[item1]:item1}}</span>
            </div>
          </div>
        </div>
        <div style = 'padding:10px;border:1px solid #ccc;'>
          <b>已监听的属性：</b>
          <div :key = 'index' v-for = '(item,index) in configList'>
            <div>
              <span style = 'margin:0 5px;' :key = '`q${index}`' v-for = '(item1,index) in item.watchData'>{{item.alias[item1]?item.alias[item1]:item1}}</span>
            </div>
          </div>
        </div>
        <div style = 'padding:10px;border:1px solid #ccc;'>
          <b>已发布的方法：</b>
          <div :key = 'index' v-for = '(item,index) in configList'>
            <div>
              <span style = 'margin:0 5px;' :key = '`q${index}`' v-for = '(item1,index) in item.methods'>{{item.alias[item1]?item.alias[item1]:item1}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class = 'item'>
        <b>组件名：</b>{{conf.name}}
      </div>
      <div class = 'item'>
        <b>data：</b>
        <span style = 'padding:5px;cursor:pointer;margin:0 5px;' :key = 'index' v-for = '(item,index) in conf.datas' >
          {{item}}
          <a style = 'font-size:12px;margin:0 5px;' @click = '_addWatchDatas(item,conf)' href = 'javascript:;'>监听</a>
          <a style = 'font-size:12px;margin:0 5px;' @click = '_addPublicDatas(item,conf)' href = 'javascript:;'>发布</a>
          <a style = 'font-size:12px;margin:0 5px;' @click = '_addDataRealtion(item,conf)' href = 'javascript:;'>订阅</a>
        </span>
        <!-- <a href = 'javascript:;' ng-if = 'conf.'>发布</a> -->
      </div>
      <div class = 'item'>
        <b>已发布data：</b>
        <span style = 'border:1px solid #ccc;padding:5px;cursor:pointer;margin:0 5px;' :key = 'index' v-for = '(item,index) in conf.publicData' >
          {{item}}
          <a href = 'javascript:;' @click = '_delePublicData(index,conf)' >x</a>
        </span>
      </div>
      <div class = 'item'>
        <b>已监听的data：</b>
        <span style = 'border:1px solid #ccc;padding:5px;cursor:pointer;margin:0 5px;' :key = 'index' v-for = '(item,index) in conf.watchData' >
          {{item}}
          <a href = 'javascript:;' @click = '_dele(index,conf)' >x</a>
        </span>
      </div>
      <div class = 'item'>
        <b>已订阅的data：</b>
        <span style = 'border:1px solid #ccc;padding:5px;cursor:pointer;margin:0 5px;' :key = 'index' v-for = '(item,index) in conf.dataRealtion' >
          {{item}}
          <a href = 'javascript:;' @click = '_deleDataRealtion(index,conf)' >x</a>
        </span>
      </div>
      <div class = 'item'>
        <b>属性&方法别名</b>
        <el-input v-model = 'conf.alias[item]' :key = 'index' v-for = '(item,index) in conf.datas'  >
          <template slot="prepend">{{item}}</template>
        </el-input>
        <el-input v-model = 'conf.alias[item]' :key = '`p${index}`' v-for = '(item,index) in conf.methods'  >
          <template slot="prepend">{{item}}</template>
        </el-input>
      </div>
      <div class = 'item'>
        <b>事件&方法关联</b>
        <el-input v-model = 'conf.eventRelation[item]' :key = 'index' v-for = '(item,index) in conf.events'  >
          <template slot="prepend">{{item}}</template>
        </el-input>
      </div>
      <div class = 'item'>
        <b>methods：</b>
        <span :key = 'index' v-for = '(item,index) in conf.methods' >
          {{item}}
          <a style = 'font-size:12px;margin:0 5px;' @click = '_addPublicMethod(item,conf)' href = 'javascript:;'>发布method</a>
        </span>
        
      </div>
      <div class = 'item'>
        <b>已发布的method：</b>
        <span style = 'border:1px solid #ccc;padding:5px;cursor:pointer;margin:0 5px;' :key = 'index' v-for = '(item,index) in conf.publicMethods' >
          {{item}}
          <a href = 'javascript:;' @click = '_delePublicMethods(index,conf)' >x</a>
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
    events: ['btn_submit'],//静态
    eventRelation: {//事件关联
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
      conf: {},
      toShow: false,
    }
  },
  mounted(){
    this.configList = configList;
    this.init();
    this.conf = this.configList[0];
  },
  methods: {
    setConf(index){
      this.conf = this.configList[index];
    },
    refresh(){
      this.toShow = false;
      this.__mixInit();
      this.$nextTick(() => {
        this.init();
      })
    },
    init(){
      console.log(this.configList);
      this.toShow = true;
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
    },
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
    _delePublicData(index,conf){//删除data发布
      this.conf.publicData.splice(index,1);
    },
    _dele(index,conf){//删除绑定
      this.conf.watchData.splice(index,1);
    },
    _deleDataRealtion(index,conf){//删除data订阅
      this.conf.dataRealtion.splice(index,1);
    },
    _delePublicMethods(index,conf){//删除公开的methods
      this.conf.publicMethods.splice(index,1);
    },
    _addPublicDatas(item,conf){
      for(let i in conf.publicData){
        if(item === conf.publicData[i]){
          return
        }
      }
      conf.publicData.push(item);
    },
    _addWatchDatas(item,conf){
      for(let i in conf.watchData){
        if(item === conf.watchData[i]){
          return
        }
      }
      conf.watchData.push(item);
    },
    _addDataRealtion(item,conf){
      for(let i in conf.dataRealtion){
        if(item === conf.dataRealtion[i]){
          return
        }
      }
      conf.dataRealtion.push(item);
    },
    _addPublicMethod(item,conf){
      for(let i in conf.publicMethods){
        if(item === conf.publicMethods[i]){
          return
        }
      }
      conf.publicMethods.push(item);
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
