<template>
  <div class="file-upload-container">
      <el-row :gutter="40">
        <el-col :lg="12" :md="24" style="border-right:1px solid #e8e8e8">
          <el-card style="margin-bottom:50px" v-loading="loading">
          <el-table :data="tableData">
            <el-table-column prop="id" label="编号">

            </el-table-column>

            <el-table-column prop="title" label="名称">

            </el-table-column>
            <el-table-column prop="url" label="URL">
              <template slot-scope="scope"><a :href="scope.row.url" target="_blank">{{scope.row.url}}</a></template>
            </el-table-column>
          </el-table>

          <el-pagination
            style="text-align: center;margin-top: 30px"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="count">
          </el-pagination>
          </el-card>
        </el-col>
        <el-col :lg="12" :md="24">
          <el-card style="min-height:500px;">
          <el-form label-position="right" label-width="80px">
            <el-form-item label="文件名">
              <el-input type="text" style="max-width:250px;" maxlength="20" v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="URL">
              <el-input type="text" style="max-width:250px;" maxlength="200" v-model="formData.url"></el-input>
            </el-form-item>
            <el-form-item label="文件">
              <el-upload
                drag
                action="http://www.luckyvv.cn/admin/api/upload.do"
                :headers="{Authorization:token}"
                :multiple="false"
                :limit='1'
                ref="uploadComponent">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">文件大小不得超过10M</div>
              </el-upload>
            </el-form-item>
            <el-button type="button" @click="submitForm"  style="max-width: 300px;margin-left:50px;">提交</el-button>
          </el-form>
          </el-card>
        </el-col>
      </el-row>

  </div>
</template>

<script>
  import store from '@/store'
  export default {
    name: 'file',
    data(){
      return {
        tableData:[],
        pageNum:1,
        pageSize:10,
        count:10,
        formData:{
          title:'',
          url:''
        },
        loading:true,
        token:''
      }
    },
    methods: {
      submitForm(){
        if(this.formData.url.trim().length<=0 || this.formData.title.trim().length<=0){
          this.$message({
            message:'请填写完整!',
            type:'warning'
          })
        }else{
          let _this =this
          this.$fetch.apiBuilding.submitFileForm(this.formData).then(
            resp => {
              _this.$message({
                message: resp.data.msg,
                type: "success"
              })
              _this.getTableData()
              _this.formData = {
                title: '',
                url: ''
              }
              _this.$refs.uploadComponent.clearFiles()
            }
          )
        }
      },
      handleCurrentChange(val){
        this.pageNum=val
        this.getTableData()
      },
      getTableData(){
        this.loading=true
        let _this = this
        this.$fetch.apiBuilding.getFileList({pageSize:this.pageSize,pageNum:this.pageNum}).then(resp=>{
          _this.tableData=resp.data.data.tableData
          _this.count=resp.data.data.count
          this.loading=false
        })
      }
    },
    created () {
      this.getTableData()
      this.token=store.getter.getToken()
    }
  }
</script>

<style scoped>
  a{
    color:#999;
  }
  .file-upload-container{
    padding:20px;
  }
</style>
