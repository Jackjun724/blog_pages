<template>
  <div class="add-note-container">
    <el-card class="form-card" v-loading="loading" :key="this.$route.params.id||'add'">
      <h1 slot="header">{{cardTitle}}</h1>
      <el-form :model="noteForm" :inline="true" label-position="top">
        <el-row>
          <el-col :span="24">
            <el-form-item style="width: 100%">
              <md-input
                type="text"
                name="title"
                max="50"
                v-model="noteForm.title"
                icon="user"
                placeholder="请输入标题">
                标题
              </md-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item style="width: 100%">
              <md-input
                type="text"
                name="title"
                max="1000"
                v-model="noteForm.displayContent"
                icon="user"
                placeholder="请输入摘要">
                摘要
              </md-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xl="8" :sm="24" :lg="8">
            <el-form-item label="发布时间" v-if="!this.$route.params.id">
              <el-date-picker
                v-model="noteForm.publishTime"
                type="datetime"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xl="8" :sm="24" :lg="8">
            <el-form-item label="类型">
              <el-radio-group v-model="noteForm.displayType">
                <el-radio-button :label="1">置顶</el-radio-button>
                <el-radio-button :label="2">正常</el-radio-button>
                <el-radio-button :label="3">草稿</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xl="8" :sm="24" :lg="8">
            <el-form-item label="标签" style="width: 100%">
              <el-select
                v-model="noteForm.tags"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签"
                style="width: 100%">
                <el-option
                  v-for="item in tagsData"
                  :key="item.id"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item style="width: 100%;">
              <mavon-editor
                @save="saveContent"
                :toolbars="toolbar"
                v-model="noteForm.content"
                style="height:500px;margin:30px 0;"
                @imgAdd="$uploadImg"
                ref="md"></mavon-editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button round type="primary" style="width:250px;display:block;margin:auto" :boxShadow="true"
                   @click="submitNote">上传
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import mdInput from '@/components/MDinput/index'
  import {setToken} from '@/utils/auth'

  export default {
    name: 'noteAdd',
    data () {
      return {
        cardTitle: '',
        loading: false,
        noteForm: {
          title: '',
          publishTime: '',
          displayType: 2,
          tags: [],
          content: '',
          displayContent:''
        },
        tagsData: [],
        toolbar: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          strikethrough: true, // 中划线
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      }
    },
    methods: {
      saveContent () {
        localStorage.setItem('SaveDraft', JSON.stringify(this.noteForm))
        this.$message({
          message: '保存成功!',
          type: 'success'
        })
      },
      submitNote () {
        let _this = this
        if (this.noteForm.author === '') {
          this.noteForm.author = 'JACK JUN'
        } else if (this.noteForm.title.trim().length === 0) {
          this.$message({
            message: '请输入标题!',
            type: 'warning'
          })
        } else if (this.noteForm.content.trim().length === 0) {
          this.$message({
            message: '请输入笔记内容!',
            type: 'warning'
          })
        } else {
          if(this.$route.params.id){
            this.noteForm.id=this.$route.params.id
            this.$fetch.apiBuilding.updateNote(this.noteForm).then(resp => {
              if (resp.data.code === 0) {
                _this.$message({
                  message: '修改成功!',
                  type: 'success'
                })
                localStorage.setItem('SaveDraft', '')
                this.$router.push({path: '/note/list'})
              } else if (resp.data.code === 10) {
                _this.$message({
                  message: '身份信息已过期!请重新登录!',
                  type: 'warning'
                })
                setToken('')
                this.$router.push({path: '/login'})
              }else{
                _this.$message({
                  message: resp.data.msg,
                  type: 'warning'
                })
              }
            })
          }else{
            this.$fetch.apiBuilding.publishNote(this.noteForm).then(resp => {
              if (resp.data.code === 0) {
                _this.$message({
                  message: '提交成功!',
                  type: 'success'
                })
                localStorage.setItem('SaveDraft', '')
                this.$router.push({path: '/note/list'})
              } else if (resp.data.code === 10) {
                _this.$message({
                  message: '身份信息已过期!请重新登录!',
                  type: 'warning'
                })
                setToken('')
                this.$router.push({path: '/login'})
              }else{
                _this.$message({
                  message: resp.data.msg,
                  type: 'warning'
                })
              }
            })
          }
        }
      },
      $uploadImg (fileName, file) {
        //TODO IMAGE UPLOAD
        this.$refs.md.$img2Url(fileName, 'https://tycoding.cn/author/avatar.png')
      }
    },
    components: {
      mdInput
    },
    created () {
      let _this = this
      this.$fetch.apiBuilding.getAllTags().then(resp => {
        if (resp.data.code === 0) {
          _this.tagsData = resp.data.data
        } else if (resp.data.code === 10) {
          _this.$message({
            message: '身份信息已过期!请重新登录!',
            type: 'warning'
          })
          setToken('')
          this.$router.push({path: '/login'})
        }
      })

      if (this.$route.params.id) {
        _this.loading = true
        this.cardTitle = '修改文章'
        this.$fetch.apiBuilding.getNoteInfoById(this.$route.params.id).then(resp => {
          if (resp.data.code === 0) {
            _this.noteForm = resp.data.data
            console.log(_this.noteForm)
            let tagData=resp.data.data.tags
            _this.noteForm.tags=[]
            tagData.forEach( e =>{
              _this.noteForm.tags.push(e.title)
            })
            _this.loading = false
          } else if (resp.data.code === 10) {
            _this.$message({
              message: '身份信息已过期!请重新登录!',
              type: 'warning'
            })
            setToken('')
            this.$router.push({path: '/login'})
          } else {
            _this.$message({
              message: resp.data.msg,
              type: 'warning'
            })
            _this.loading = false
          }
        })
      } else {
        this.cardTitle = '新增文章'
        let cache = ''
        try {
          cache = JSON.parse(localStorage.getItem('SaveDraft'))
        } catch (_) {
        }
        if (cache && cache.content) {
          this.noteForm = cache
          this.$message({
            message: '已加载上次保存记录!',
            type: 'success'
          })
        }
      }
    }
  }
</script>

<style scoped>
  .add-note-container {
    padding: 20px;
  }

  .form-card {
    padding: 20px 50px;
    min-width: 680px;
  }
</style>
