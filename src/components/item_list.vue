<template>
  <div>
    <el-input style = 'margin:20px 0;' v-model = 'phone' placeholder="电话" >
        <template slot="prepend">电话</template>
    </el-input>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin:30px 0;">
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mixin from '@/mixin/itemMixin.js'
export default {
    mixins: [mixin],
    data() {
      return {
        name: '',
        phone: ''
      }
    },
    computed: {
        tableData(){
            return [{
                name: this.name||this.publicData.name1,
                phone: this.phone||this.publicData.phone
            }]
        }
    },
    methods: {
      query(data){
        alert(JSON.stringify(data));
      }
    }
  }
</script>