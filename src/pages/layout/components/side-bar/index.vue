<template>
  <!-- 后期如需要可修改为 <组件递归写法> -->
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      class="el-menu-vertical"
      :default-active="$route.path"
      router
      :collapse="status.SideBarIsCollapse"
      style='height:100vh;border:none;'
      :collapse-transition="true"
    >
      <el-menu-item index="/dashboard">
        <i class="el-jack-icon-home"></i>
        <span>首页</span>
      </el-menu-item>

      <template v-for="route in mapper" v-if="!route.hidden">

        <el-menu-item v-if="typeof route.children === 'undefined'" :index="route.path">
          <i :class="route.icon ? route.icon : 'el-icon-menu'"></i>
          <span v-text="route.meta ? route.meta.title : route.name"></span>
        </el-menu-item>

        <el-submenu v-else :index="route.path">

          <template slot="title">
            <i :class="route.icon ? route.icon : 'el-icon-menu'"></i>
            <span v-text="route.meta ? route.meta.title : route.name"></span>
          </template>

          <el-menu-item v-for="item in route.children" :key="item.path" :index="item.path" v-if="!item.hidden">
            <i :class="item.icon ? item.icon : 'el-icon-menu'"></i>
            <span v-text="item.meta ? item.meta.title : item.name"></span>
          </el-menu-item>

        </el-submenu>

      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        mapper: [],
        status: this.$store.status,
      }
    },
    created () {
      this.mapper = this.$store.getter.getRouterMapper()
    },
  }
</script>

<style>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 210px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
</style>
