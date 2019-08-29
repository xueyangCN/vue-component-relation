export default{
    data(){
        return {
            publicData: {
            }
        }
    },
    created(){
        this. __mixInit();
    },
    methods: {
        __mixInit(){
            this.publicEventList = {};//发布的事件
            this.publicMethodList = {};//发布的方法
            this.publicDataRelations = {};//发布的属性关联
        },
        __setPublicData(data){
            let {key,value} = data;
            this.publicData[key] = value;
            if(this.publicData[key]){
                this.publicData[key] = value;
            }else{
                this.$set(this.publicData,key,value);
            }
        },
        __setDataRelation(data){
            let {key,target} = data;
            if(this.publicDataRelations[key]){
                this.publicDataRelations[key].push(target);
            }else{
                this.publicDataRelations[key] = [target];
            }
        },
        __publicDataChange(data){
            let {key,newVal,oldVal} = data;
            let watchTarget = this.publicDataRelations[key];
            if(this.publicData[key]){
                if(this.publicData[key] != newVal){
                    this.publicData[key] = newVal;
                }
            }else{
                this.$set(this.publicData,key,newVal);
            }
            if(watchTarget&&watchTarget.length){
                for(let i = 0;i<watchTarget.length;i++){
                    watchTarget[i].__onDataChange(key,this.publicData[key],oldVal);
                }
            }
        },
        __triggerMethod(data){//触发某个子组件方法
            let {methodName,msg} = data;
            this.publicMethodList[methodName]&&this.publicMethodList[methodName].__triggerMethod(methodName,msg);
        },
        __setPublicMethod(data){
            let {methodName,target} = data;
            this.publicMethodList[methodName] = target;
        }
    }
}