<template>
  <div class="nav-wrapper">
    <i class="icon-font"
       :class="{'el-jack-icon-show':!status.SideBarIsCollapse,'el-jack-icon-hide':status.SideBarIsCollapse}"
       @click="changeSideBarStatus"></i>
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item v-if="$route.path !== '/dashboard'" to="/">首页</el-breadcrumb-item>
      <div class="show-breadcrumb" v-else>首页</div>
      <transition-group name="transition-bread">
        <el-breadcrumb-item
          v-for="item in $route.matched"
          v-if="item.path !== '' && item.path !== '/dashboard'"
          :key="item.path"
          :to="typeof item.redirect === 'undefined' ? item.path : ''">
          {{item.meta.title}}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div class="nav-tool">
      <i class="full-devices" :class="{'el-jack-icon-full':!isFull,'el-jack-icon-not-full':isFull}"
         @click="changeFull"></i>
      <el-dropdown style="height: 55px;margin-left:15px;" @command="execute">
        <span>
          <img src="./image/default.gif" alt="User" class="user-photo">
          <i class="el-icon-arrow-down right-flag"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in dropdownItem" :key="index" :command="item.do">{{item.title}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {setToken} from '@/utils/auth'
  import ScreenFull from 'screenfull'

  export default {
    name: 'index',
    data () {
      return {
        status: this.$store.status,
        isFull: false,
        dropdownItem: [
          {
            title: '首页',
            do: () => {
              this.$router.push({path: '/'})
            }
          },
          {
            title: '退出',
            do: () => {
              this.$fetch.apiBuilding.logout().then(resp => {
                this.$message({
                  type: "success",
                  message: resp.data.msg
                })
                setToken("")
                window.location = '/login'
              }).catch(
                this.$message({
                  type: "warning",
                  message: "退出失败!"
                })
              )

            }
          }
        ]
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      changeSideBarStatus () {
        this.$store.actions.changeSideBarStatus()
      },
      changeFull () {
        if (!ScreenFull.enabled) {
          this.$message({
            message: '你的浏览器不支持全屏!',
            type: 'warning'
          })
          return false
        }
        ScreenFull.toggle()
        this.isFull = !this.isFull
      },
      execute (command) {
        command()
      },
      init () {
        if (ScreenFull.enabled) {
          ScreenFull.on('change', () => {
            this.isFull = ScreenFull.isFullscreen
          })
        }
      }
    },
  }
</script>

<style scoped>
  .icon-font {
    font-size: 24px;
    cursor: pointer;
  }

  .breadcrumb {
    display: inline-block;
    padding-left: 30px;
  }

  .nav-wrapper {
    height: 60px;
    line-height: 60px;
  }

  .show-breadcrumb {
    display: inline-block;
    position: relative;
    top: -2px;
  }

  .nav-tool {
    float: right;
    width: 120px;
    height: 100%;
  }

  .full-devices {
    font-size: 25px;
    font-weight: 700;
    position: relative;
    top: -15px;
  }

  .user-photo {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-top: 5px;
  }

  .right-flag {
    position: relative;
    top: -20px;
  }

  /*breadcrumb transition*/
  .transition-bread-enter-active,
  .transition-bread-leave-active {
    transition: all .5s;
  }

  .transition-bread-enter,
  .transition-bread-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .transition-bread-move {
    transition: all .5s;
  }

  .transition-bread-leave-active {
    position: absolute;
  }
</style>
