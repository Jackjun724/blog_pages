<template>
  <el-container>
    <el-aside :style="style">
      <side-bar/>
    </el-aside>
    <el-container style="height: 100vh">
      <el-header style="box-shadow: 1px 1px 10px #A8A8A8;height:auto;position: relative;z-index:10;">
        <nav-bar/>
      </el-header>
      <el-main style="overflow-x: hidden;padding:0;background-color: #f0f2f5">
        <el-scrollbar style="height: 100%">
          <app-main/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {sideBar, navBar, appMain} from './components'

  export default {
    name: 'index',
    components: {
      sideBar,
      navBar,
      appMain
    },
    data(){
      return {
        style:{
          'box-shadow':'0px 0px 10px #A8A8A8',
          'width':'auto',
          'position':'relative',
          'z-index':'11'
        }
      }
    }
  }
</script>

<style scoped>

</style>
