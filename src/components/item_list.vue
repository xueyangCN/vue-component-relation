<template>
  <el-table
    :data="tableData"
    border
    style="width: 500px;margin:30px 0;">
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