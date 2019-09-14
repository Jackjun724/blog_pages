<template>
  <div class="note-list-container">
    <el-card>
      <h1 slot="header" style="margin: 7px;line-height: 1">
        文章列表
      </h1>
      <el-table
        :data="tableData"
        style="width: 100%"
        :fit="true"
        v-loading="loading"
        @sort-change="sortColumn"
        @filter-change="filterTags">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="300"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="publishtime"
          label="发布时间"
          width="200"
          sortable="custom">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.publishtime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastupdatetime"
          label="最后更新时间"
          width="200"
          sortable="custom">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.lastupdatetime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          :filters="tagsList">
          <template slot-scope="scope">
            <transition-group name="tagsTransition">
              <el-tag type="info" v-for="(item,index) in scope.row.tags" :key="item.id" style="margin-left:5px;margin-bottom:5px;margin-top:5px">{{item.title}}</el-tag>
            </transition-group>
          </template>
        </el-table-column>
        <el-table-column
          prop="displaytype"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.displaytype === 1? 'warning':(scope.row.displaytype===2?'primary':'success')">
              {{scope.row.displaytype === 1? '置顶':(scope.row.displaytype===2?'正常':'草稿')}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="editNote(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delNote(scope.row.id)"></el-button>
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
  </div>
</template>

<script>
  import {setToken} from '@/utils/auth'

  export default {
    name: 'noteList',
    data () {
      return {
        tableData: [[], [], [], [], [], [], [], [], [], []],
        tagsData: [],
        filters: [],
        orderByColumn: '',
        orderType: '',
        pageSize: 10,
        pageNum: 1,
        count: 20,
        loading: true
      }
    },
    computed: {
      tagsList () {
        let res = []
        this.tagsData.forEach(e => {
          res.push({text: e.value, value: e.value})
        })
        return res
      }
    },
    methods: {
      editNote (id) {
        this.$router.push({name:'edit-note',params:{id:id}})
      },
      delNote (id) {
        let _this = this
        this.$confirm('此操作将删除笔记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$fetch.apiBuilding.delNoteById(id).then(resp => {
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
      filterTags (value) {
        let filter = []
        for (let a in value) {
          filter.push(value[a])
        }
        this.filters = filter[0]

        this.getTableData()
      },
      getTableData () {
        this.loading = true
        let _this = this
        this.$fetch.apiBuilding.getNoteList({
          filters: this.filters,
          orderByColumn: this.orderByColumn,
          orderType: this.orderType,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }).then(resp => {
          if (resp.data.code === 0) {
            _this.tableData = resp.data.data.tableData
            _this.count = resp.data.data.count
            _this.pageNum = resp.data.data.pageNum || 1
            _this.pageSize = resp.data.data.pageSize || 10
            _this.loading = false
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

      this.getTableData()
    }
  }
</script>

<style scoped>
  .note-list-container {
    padding: 20px;
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
