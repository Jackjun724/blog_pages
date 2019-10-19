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
        <a :href="href" target="_blank" v-show="false" id="target-buy"></a>
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
        const el = document.querySelector('#target-buy span')
        Submit(param).then(resp=>{
          _this.href = resp.data.data
          el.click()
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
