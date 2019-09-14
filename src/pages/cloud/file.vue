<template>
  <div class="file-upload-container">
    <el-row :gutter="40">
      <el-col :lg="12" :md="24" style="border-right:1px solid #e8e8e8">
        <el-card style="margin-bottom:50px" v-loading="loading">
          <el-table :data="tableData">
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="名称" prop="title"></el-table-column>
            <el-table-column label="文件类型" prop="status">
              <template slot-scope="scope">{{scope.row.status===0?'图片':'其他'}}</template>
            </el-table-column>

            <el-table-column :show-overflow-tooltip="true" label="URL" prop="url">
              <template slot-scope="scope"><a :href="scope.row.url" target="_blank">{{scope.row.url}}</a></template>
            </el-table-column>
          </el-table>

          <el-pagination
              :current-page="pageNum"
              :page-size="pageSize"
              :page-sizes="[5, 10, 20, 40]"
              :total="count"
              @current-change="handleCurrentChange"
              layout="total, prev, pager, next, jumper"
              style="text-align: center;margin-top: 30px">
          </el-pagination>
        </el-card>
      </el-col>
      <el-col :lg="12" :md="24">
        <el-card style="min-height:500px;">
          <el-form :model="formData" :rules="formRule" label-position="right" label-width="80px" ref="formComponent">
            <el-form-item label="名称" prop="title">
              <el-input type="text" style="max-width:250px;" maxlength="20" v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="URL" prop="url">
              <el-input type="text" style="max-width:250px;" maxlength="200" v-model="formData.url"></el-input>
            </el-form-item>
            <el-form-item label="文件">
              <el-upload
                  :action="uploadUrl"
                  :headers='{"Authorization":token}'
                  :limit='1'
                  :multiple="false"
                  :on-success="uploadCallback"
                  drag
                  ref="uploadComponent">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">文件大小不得超过10M</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="formData.status">
                <el-option label="图片" value="0"></el-option>
                <el-option label="其他" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-button @click="submitForm" style="max-width: 300px;margin-left:50px;" type="button">提交</el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import store from '@/store'
  import Constants from '@/const/index'

  export default {
    name: 'file',
    data () {
      return {
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        count: 10,
        formData: {
          title: '',
          url: '',
          status: '1'
        },
        loading: true,
        token: '',
        uploadUrl: '',
        formRule: {
          title: [
            {required: true, trigger: 'blur', message: '请输入名称'},
            {max: 50, trigger: 'blur', message: '名称长度不能超过50个字符'}
          ],
          url: {required: true, trigger: 'blur', message: '请上传文件或输入文件URL'},
        }
      }
    },
    methods: {
      submitForm () {
        let _this = this
        this.$refs.formComponent.validate().then(() => {
          let param = {
            title: this.formData.title,
            url: this.formData.url,
            status: this.formData.status
          }
          this.$fetch.fileApi.add(param).then(
            resp => {
              _this.$notify.success('保存成功！')
              _this.getTableData()
              _this.formData = {
                title: '',
                url: '',
                status: '1'
              }
              _this.$refs.uploadComponent.clearFiles()
            }
          )
        })
      },
      uploadCallback (resp) {
        this.formData.url = Constants.getHomeUrl() + 'api/file/download?key=' + resp.data
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.getTableData()
      },
      getTableData () {
        this.loading = true
        let _this = this
        let param = {
          params: {
            page: this.pageNum,
            size: this.pageSize
          }
        }
        this.$fetch.fileApi.getFileList(param).then(resp => {
          _this.tableData = resp.data.data.data
          _this.count = resp.data.data.total
        }).finally(() => _this.loading = false)
      }
    },
    created () {
      this.getTableData()
      this.token = store.getter.getToken()
      this.uploadUrl = Constants.getHomeUrl() + 'api/file/upload'
    }
  }
</script>

<style scoped>
  a {
    color: #999;
  }

  .file-upload-container {
    padding: 20px;
  }
</style>
