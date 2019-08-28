<template>
    <div class='inp'>
        <el-input v-model = 'name' placeholder="姓名" >
            <template slot="prepend">姓名</template>
        </el-input>
        <el-input style = 'margin:20px 0;' v-model = 'phone' placeholder="电话" >
            <template slot="prepend">电话</template>
        </el-input>
        <el-button @click = 'btn_submit'>提交</el-button>
    </div>
</template>
<script>
import mixin from '@/mixin/itemMixin.js'
export default {
    mixins: [mixin],
    data(){
        return {
            name: '1',
            phone: '2'
        }
    },
    mounted() {
    },
    methods:{
        btn_submit(){
            let {name,phone} = this;
            this.eventRelation.btn_submit&&this.__emit(this.eventRelation.btn_submit,{name,phone});
        }
    },
    props: {},
    components: {}
}
</script>
<style scoped>
.inp{
    width:500px;
    padding: 30px;
    border: 1px solid #ccc;
}
</style>