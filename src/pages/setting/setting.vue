<template>
  <section>
    <el-col :xs="24" :md="8" :xl="8">
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
        <a :href="href" target="_blank" v-show="href" id="target-buy"><el-button type="danger">Go</el-button></a>
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
        col: null,
        href: ''
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
        let _this = this
        Submit(param).then(resp=>{
          _this.href = resp.data.data
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

  #target-buy{
    text-decoration: none;
    display: inline-block;
  }
</style>
