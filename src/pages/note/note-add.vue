<template>
  <div class="add-note-container">
    <el-card :key="this.$route.params.id||'note-add.vue'" class="form-card" v-loading="loading">
      <h1 slot="header">{{cardTitle}}</h1>
      <el-form :inline="true" :model="noteForm" :rules="rule" label-position="top" ref="noteForm">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="title" style="width: 100%">
              <md-input
                  icon="user"
                  max="50"
                  name="title"
                  placeholder="请输入标题"
                  type="text"
                  v-model="noteForm.title">
                标题
              </md-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="displayContent" style="width: 100%">
              <md-input
                  icon="user"
                  max="1000"
                  name="title"
                  placeholder="请输入摘要"
                  type="text"
                  v-model="noteForm.displayContent">
                摘要
              </md-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :lg="8" :sm="12" :xl="8">
            <el-form-item label="发布时间" v-if="!this.$route.params.id">
              <el-date-picker
                  placeholder="选择日期"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="noteForm.publishTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="12" :xl="8">
            <el-form-item label="类型" prop="displayType">
              <el-radio-group v-model="noteForm.displayType">
                <el-radio-button :label="1">置顶</el-radio-button>
                <el-radio-button :label="2">正常</el-radio-button>
                <el-radio-button :label="3">草稿</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :sm="24" :xl="8">
            <el-form-item label="标签" prop="tags" style="width: 100%">
              <el-select
                  allow-create
                  default-first-option
                  filterable
                  multiple
                  placeholder="请选择文章标签"
                  style="width: 100%;margin-bottom:0"
                  v-model="noteForm.tags">
                <el-option
                    :key="item.id"
                    :value="item.value"
                    v-for="item in tagsData">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="content" style="width: 100%;">
              <mavon-editor
                  :toolbars="toolbar"
                  @imgAdd="$uploadImg"
                  @save="saveContent"
                  ref="md"
                  style="height:500px;margin:30px 0;"
                  v-model="noteForm.content"></mavon-editor>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button :boxShadow="true" @click="submitNote" round style="width:250px;display:block;margin:auto"
                   type="primary">上传
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import mdInput from '@/components/MDinput/index'

  export default {
    name: 'noteAdd',
    data () {
      return {
        cardTitle: '',
        loading: false,
        noteForm: {
          id: null,
          title: '',
          publishTime: '',
          displayType: 2,
          tags: [],
          content: '',
          displayContent: ''
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
        },
        rule: {
          title: [
            {required: true, trigger: 'blur', message: '请输入标题'},
            {max: 50, trigger: 'blur', message: '标题长度不能超过50个字符'}
          ],
          displayContent: [{required: true, trigger: 'blur', message: '请输入摘要内容'}],
          displayType: [{required: true, trigger: 'blur', message: '请选择类型'}],
          tags: [{required: true, trigger: 'change', message: '请选择标签'}],
          content: [{required: true, trigger: 'blur', message: '请输入正文内容'}]
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

        this.$refs.noteForm.validate().then(() => {
          if (this.$route.params.id) {
            // 路由中存在ID属性  更新文章
            _this.noteForm.id = _this.$route.params.id
            _this.$fetch.noteApi.updateNote(_this.noteForm).then(resp => {
              _this.$notify.success('修改成功!')
              //清空保存记录 返回列表
              localStorage.setItem('SaveDraft', '')
              this.$router.push({path: '/note/list'})
            })
          } else {
            _this.$fetch.noteApi.publishNote(_this.noteForm).then(resp => {
              _this.$notify.success('提交成功!')
              localStorage.setItem('SaveDraft', '')
              this.$router.push({path: '/note/list'})
            })
          }
        })
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
      this.$fetch.tagApi.getAllTags().then(resp => {
        _this.tagsData = resp.data.data
      })

      if (this.$route.params.id) {
        _this.loading = true
        this.cardTitle = '修改文章'
        let param = {
          params: {
            id: this.$route.params.id
          }
        }
        this.$fetch.noteApi.getNoteInfoById(param).then(resp => {
          _this.noteForm = resp.data
          let tagData = resp.data.tags
          _this.noteForm.tags = []
          tagData.forEach(e => {
            _this.noteForm.tags.push(e.title)
          })
        }).finally(() => _this.loading = false)
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
