<template>
  <div class="login-container">
    <el-card class="card" :body-style="{ padding: '0px' }">
      <div class="header-container">
        <div class="img-container">
        </div>
        <span class="header-title">管理员登录</span>
      </div>
      <div style="padding: 14px;">
        <el-form :model="loginForm" ref="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <md-input
              type="text"
              name="username"
              max="20"
              v-model="loginForm.username"
              icon="user"
              placeholder="请输入帐号">
              帐号
            </md-input>
          </el-form-item>

          <el-form-item prop="password">
            <md-input
              type="password"
              placeholder="请输入密码"
              name="password"
              max="16"
              v-model="loginForm.password"
              icon="pwd">
              密码
            </md-input>
          </el-form-item>
          <el-button v-loading="loading" type="primary" @click.native.prevent="handleLogin" class="btn-submit">
            登录
          </el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {setToken} from '@/utils/auth'
  import mdinput from '@/components/MDinput/index'

  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', message: '账号不能为空'}],
          password: [{required: true, trigger: 'blur', message: '密码不能为空'}]
        },
        loading: false
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleLogin () {
        let _this = this
        this.$refs.loginForm.validate(flag => {
          if (flag) {
            this.loading = true
            let param = {
              username: this.loginForm.username,
              password: this.loginForm.password
            }
            _this.$fetch.commonApi.login(param).then(resp => {
              setToken(resp.data)
              _this.$router.push({path: this.redirect || '/'})
            }).finally(() => {
              _this.loading = false
            })
          }
        })
      }
    },
    components: {
      mdInput: mdinput
    }
  }
</script>

<style scoped>
  .card {
    width: 370px;
    height: 430px;
    margin: 0 auto;
    position: relative;
    top: 10%;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.22);
  }

  .login-container {
    background-image: url('./images/sign_bg.png');
    background-repeat: no-repeat;
    background-color: #b8e5f8;
    background-size: cover;
    height: 100vh;
    min-height: 550px;
    width: 100%;
    margin: 0;
  }

  .login-form {
    background-color: white;
    text-align: center;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 4px;
    width: 250px;
  }

  .btn-submit {
    width: 220px;
    margin: 15px auto 0 auto;
  }

  .img-container {
    width: 370px;
    height: 170px;
    overflow: hidden;
    background-image: url("./images/sign_bg.png");
    background-size: cover;
    filter: blur(15px);
  }

  .header-container {
    height: 170px;
    overflow: hidden;
    position: relative;
  }

  .header-title {
    position: absolute;
    top: 80px;
    left: 40px;
    font-size: 24px;
    color: white;
    user-select: none;
    font-weight: 700;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.44);
  }

</style>
