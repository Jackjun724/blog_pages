<template>
  <section>
    <el-col :xs="24" :md="8" :xl="8">
      <el-card>
        <template v-slot:header>
          模拟请求工具
        </template>
        <label>
          GOODS
          <el-select v-model="id" class="number-input">
            <el-option v-for="item in goods" :value="item.goods_id" :label="item.goods_name" :key="item.goods_id">
              {{item.goods_name}}
            </el-option>
          </el-select>
        </label>
        <label>
          PRICE
          <el-input-number class="number-input" :min="0.1" :max="10" :step="0.1" v-model="price"></el-input-number>
        </label>
        <el-button @click="submit" type="primary">提交</el-button>
        <a :href="href" target="_blank" v-show="href" id="target-buy"><el-button type="danger">Go</el-button></a>
      </el-card>
    </el-col>
  </section>
</template>

<script>
  import {Submit,GoodsList} from '@/api/modules/system'

  export default {
    data () {
      return {
        id: null,
        price: 2.0,
        href: '',
        goods:[]
      }
    },
    methods:{
      submit(){
        let param = {
          params: {
            id:this.id,
            price:this.price
          }
        }
        let _this = this
        Submit(param).then(resp=>{
          _this.href = resp.data.data
        })
      }
    },
    created () {
      let _this = this
      GoodsList().then(resp=>{
        _this.goods = resp.data.data
      })
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
