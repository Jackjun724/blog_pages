<template>
  <section>
    <el-col :span="8">
      <el-card>
        <template v-slot:header>
          模拟请求工具
        </template>
        <label>
          行
          <el-input-number class="number-input" :min="1" :max="10" v-model="row" label="行"></el-input-number>
        </label>
        <label>
          列
          <el-input-number class="number-input" :min="1" :max="10" v-model="col" label="列"></el-input-number>
        </label>
        <el-button @click="submit" type="primary">提交</el-button>
      </el-card>
    </el-col>
  </section>
</template>

<script>
  import {Submit} from '@/api/modules/system'

  export default {
    data () {
      return {
        row: null,
        col: null
      }
    },
    methods:{
      submit(){
        let param = {
          params: {
            col:this.col,
            row:this.row
          }
        }
        Submit(param).then(resp=>{
          window.open(resp.data.data)
        })
      }
    }
  }
</script>

<style scoped>
  section{
    padding:20px;
  }

  .number-input{
    margin-bottom:20px;
    display: block;
  }
</style>
