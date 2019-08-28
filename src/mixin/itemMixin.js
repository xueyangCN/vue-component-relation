export default{
    created(){
        this.watchs = {};//所有监听对象
        this.alias = {};
        this.eventRelation = {};//事件关联
    },
    methods: {
        __setEventRelation(eventName,methodName){//设置事件关联(本组件调用)
            this.eventRelation[eventName] = methodName;//之后组件在事件中调用 this__emit(methodName,msg)来关联事件
        },
        __setDataRelation(key){//设置属性关联公共数据
            key = this.alias[key]?this.alias[key]:key;//将key转别名
            this.$emit('__setDataRelation',{
                key,
                target: this
            })
            // this.__watch(key);
        },
        __setData(key){//发布一个私有数据(本组件调用)
            let value = this[key];
            key = this.alias[key]?this.alias[key]:key;//将key转别名
            this.$emit('__setPublicData',{
              key,
              value
            });
        },
        __setPublicMethod(methodName){//发布公共方法
            methodName = this.alias[methodName]?this.alias[methodName]:methodName;//将eventName转别名
            this.$emit('__setPublicMethod',{
                methodName,
                target: this
            });
        },
        __setAlias(key,alias){//设置私有数据、方法别名
            this.alias[key] = alias;
        },
        __onDataChange(key,newVal,oldval){//监听已关联属性改变
            for(let i in this.alias){//获取真实的eventName
                if(key === this.alias[i]){
                    key = i;
                }
            }
            if(this[key] === newVal){
                return;
            }else{
                this[key] = newVal;
            }
        },
        __watch(key){//监听本组件一个私有数据(本组件调用)
            this.watchs[key] = this.$watch(key,(newVal,oldVal) => {
                key = this.alias[key]?this.alias[key]:key;//将key转别名
                this.$emit('__publicDataChange',{
                    key,
                    newVal,
                    oldVal
                },{deep: true,immediate: true})
            })
        },
        __unwatch(key){//解除监听(本组件调用)
            this.watchs[key]();
            this.watchs[key] = null;
        },
        __emit(methodName,msg){//发送调用其他组件方法(本组件调用)
            this.$emit('__triggerMethod',{
                methodName,
                msg
            });
        },
        __triggerMethod(methodName,data){//执行方法(容器组件调用)
            for(let i in this.alias){//获取真实的eventName
                if(methodName === this.alias[i]){
                    methodName = i;
                }
            }
            this[methodName]&&this[methodName](data);
        }
    },
    props: {
        publicData: Object
    }
}