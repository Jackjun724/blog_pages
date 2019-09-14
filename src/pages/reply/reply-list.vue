<template>
  <div class="reply-list-container">
    <el-card>
      <div slot="header">
        <h1 style="margin: 7px;line-height: 1;display: inline-block;width:300px;">
          回复列表
        </h1>
        <!--<md-input-->
          <!--type="text"-->
          <!--max="50"-->
          <!--icon="search"-->
          <!--placeholder="请输入回复内容"-->
          <!--style="width: 200px;display: inline-block;float: right;margin-top:17px;">-->
          <!--搜索回复内容-->
        <!--</md-input>-->
      </div>


      <el-table
        :data="tableData"
        style="width: 100%"
        :fit="true"
        v-loading="loading"
        @sort-change="sortColumn">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="noteTitle"
          label="标题"
          width="300"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="reply"
          label="回复内容"
          width="200"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="date"
          label="回复时间"
          width="200"
          sortable="custom">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="回复人"
          width="200"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="replyid"
          label="回复评论的ID"
          width="200">
          <template slot-scope="scope">
            <span style="cursor: pointer;border-bottom:1px solid black;" @click="getReplyInfo(scope.row.id)">{{scope.row.replyid}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1? 'warning':(scope.row.status===2?'primary':'info')">
              {{scope.row.status === 1? '置顶':(scope.row.status===2?'正常':'隐藏')}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="delReply(scope.row.id)" :disabled="scope.row.status==3"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: center;margin-top: 30px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </el-card>


    <!-- Dialog -->
    <el-dialog
      title="回复详情"
      :visible.sync="dialogVisible">
      <div v-loading="dialogLoading">
        <div class="reply-info" v-for="item in replyInfo">
          <span class="author">{{item.name}}</span>
          {{item.reply}}
          <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="delReply(item.id)" style="position: absolute; right:20px;top:30%;"></el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {setToken} from '@/utils/auth'
  import mdInput from '@/components/MDinput/index'

  export default {
    name: 'replyList',
    data () {
      return {
        tableData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
        orderByColumn: '',
        orderType: '',
        pageSize: 10,
        pageNum: 1,
        count: 20,
        loading: true,
        dialogVisible:false,
        replyInfo:[
          {
            id:2,
            author:'Jack',
            reply:'This is Content.'
          }
        ],
        dialogLoading:true
      }
    },
    components:{
      mdInput
    },
    methods: {
      delReply (id) {
        let _this = this
        this.$confirm('此操作将删除回复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(_this.dialogVisible){_this.getReplyData(id)}
          _this.$fetch.apiBuilding.delReplyById(id).then(resp => {
            if (resp.data.code === 0) {
              this.$message({
                type: 'success',
                message: resp.data.msg
              });
              _this.getTableData()
            } else if (resp.data.code === 10) {
              _this.$message({
                message: '身份信息已过期!请重新登录!',
                type: 'warning'
              })
              setToken('')
              this.$router.push({path: '/login'})
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          });
        });
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getTableData()
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.getTableData()
      },
      sortColumn (map) {
        if (map) {
          this.orderType = map.order === 'descending' ? 'desc' : 'asc'
          this.orderByColumn = map.prop
        } else {
          this.orderByColumn = ''
          this.orderType = ''
        }
        this.getTableData()
      },
      getReplyInfo(id){
        this.dialogVisible=true
        this.getReplyData(id)
      },
      getReplyData(id){
        this.dialogLoading=true
        let _this = this
        _this.$fetch.apiBuilding.getReplyInfo(id).then(resp => {
          _this.dialogLoading=false
          if (resp.data.code === 0) {
            _this.replyInfo = resp.data.data
          } else if (resp.data.code === 10) {
            _this.$message({
              message: '身份信息已过期!请重新登录!',
              type: 'warning'
            })
            setToken('')
            this.$router.push({path: '/login'})
          }
        })
      },
      getTableData () {
        this.loading = true
        let _this = this
        this.$fetch.apiBuilding.getReplyList({
          orderByColumn: this.orderByColumn,
          orderType: this.orderType,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }).then(resp => {
          _this.loading = false
          if (resp.data.code === 0) {
            _this.tableData = resp.data.data.tableData
            _this.count = resp.data.data.count
            _this.pageNum = resp.data.data.pageNum || 1
            _this.pageSize = resp.data.data.pageSize || 10
          } else if (resp.data.code === 10) {
            _this.$message({
              message: '身份信息已过期!请重新登录!',
              type: 'warning'
            })
            setToken('')
            this.$router.push({path: '/login'})
          }
        })
      }
    },
    created () {
      this.getTableData()
    }
  }
</script>

<style scoped>
  .reply-list-container {
    padding: 20px;
  }

  .reply-info{
    background-color: #efefef9c;
    padding: 10px 60px 10px 10px;
    color: #333;
    margin-bottom:10px;
    position: relative;
  }

  .author{
    padding: 5px;
    background: #67676799;
    color: white;
    border-radius: 5px;
    margin-right:20px;
  }

  .tagsTransition-enter-active,
  .transition-bread-leave-active {
    transition: all .8s;
  }

  .tagsTransition-enter,
  .tagsTransition-leave-active {
    opacity: 0;
  }

  .tagsTransition-move {
    transition: all 0.3s;
  }

  .tagsTransition-leave-active {
    position: absolute;
  }
</style>
