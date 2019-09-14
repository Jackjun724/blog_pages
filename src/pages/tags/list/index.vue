<template>
  <div class="tags-container">
    <el-card style="min-height:500px;" v-loading="loading">
      <h1 slot="header">标签墙</h1>
      <el-tag
        closable
        @close="delTag(tag)"
        v-for="tag in tags"
        :key="tag">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-card>
  </div>
</template>

<script>
  import {setToken} from '@/utils/auth'

  export default {
    name: 'tagsList',
    data () {
      return {
        inputVisible: false,
        inputValue: '',
        tags: [],
        loading:true
      }
    },
    methods: {
      showInput () {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm () {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.addTag(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      addTag (tag) {
        this.tags.push(tag)
        this.$fetch.apiBuilding.addTagByName(tag).then(resp => {
          if (resp.data.code === 10) {
            _this.$message({
              message: '身份信息已过期!请重新登录!',
              type: 'warning'
            })
            setToken('')
            this.$router.push({path: '/login'})
          }
        }).catch(() => {
          _this.$message({
            message: '网络超时或请求失败!',
            type: 'warning'
          })
        })
      },

      delTag (tag) {
        let _this = this
        this.$confirm('确定删除该标签吗？', '提示：').then(() => {
          this.tags.splice(this.tags.indexOf(tag), 1)
          this.$fetch.apiBuilding.delTagByName(tag).then(resp => {
            if (resp.data.code === 10) {
              _this.$message({
                message: '身份信息已过期!请重新登录!',
                type: 'warning'
              })
              setToken('')
              this.$router.push({path: '/login'})
            }
          }).catch(() => {
            _this.$message({
              message: '网络超时或请求失败!',
              type: 'warning'
            })
          })
        }).catch(() => {
        })
      }
    },
    created (){
      let _this = this
      this.$fetch.apiBuilding.getAllTags().then(resp => {
        if(resp.data.code === 0){
          resp.data.data.forEach(e=>{_this.tags.push(e.value)})
          _this.loading=false
        }else if (resp.data.code === 10) {
          _this.$message({
            message: '身份信息已过期!请重新登录!',
            type: 'warning'
          })
          setToken('')
          this.$router.push({path: '/login'})
        }
      })
    }
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .tags-container{
    padding:30px;
  }
</style>
