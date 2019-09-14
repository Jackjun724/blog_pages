<template>
  <div class="note-list-container">
    <el-card>
      <h1 slot="header" style="margin: 7px;line-height: 1">
        文章列表
      </h1>
      <el-table
          :data="tableData"
          :fit="true"
          @filter-change="filterTags"
          @sort-change="sortColumn"
          style="width: 100%"
          v-loading="loading">
        <el-table-column
            fixed
            label="编号"
            prop="id"
            sortable
            width="100">
        </el-table-column>
        <el-table-column
            :show-overflow-tooltip="true"
            label="标题"
            prop="title"
            width="300">
        </el-table-column>
        <el-table-column
            label="发布时间"
            prop="publishTime"
            sortable="custom"
            width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.publishTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="最后更新时间"
            prop="lastUpdateTime"
            sortable="custom"
            width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.lastUpdateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            :filters="tagsList"
            label="标签"
            prop="tags">
          <template slot-scope="scope">
            <transition-group name="tagsTransition">
              <el-tag :key="item.id" style="margin-left:5px;margin-bottom:5px;margin-top:5px" type="info"
                      v-for="item in scope.row.tags">{{item.title}}
              </el-tag>
            </transition-group>
          </template>
        </el-table-column>
        <el-table-column
            label="状态"
            prop="displayType"
            width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.displayType === 1? 'warning':(scope.row.displayType===2?'primary':'success')">
              {{scope.row.displayType === 1? '置顶':(scope.row.displayType===2?'正常':'草稿')}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="editNote(scope.row.id)" circle icon="el-icon-edit" type="primary"></el-button>
            <el-button @click="delNote(scope.row.id)" circle icon="el-icon-delete" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          :current-page="pageNum"
          :page-size="pageSize"
          :page-sizes="[5, 10, 20, 40]"
          :total="count"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
          style="text-align: center;margin-top: 30px">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

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
        this.$router.push({name: 'edit-note', params: {id: id}})
      },
      delNote (id) {
        let _this = this
        this.$confirm('此操作将删除笔记, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$fetch.noteApi.delNoteById(id).then(_ => {
            _this.$notify.success('删除成功!')
            _this.getTableData()
          })
        })
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
          this.orderType = map.order === 'descending'
          this.orderByColumn = map.prop
        } else {
          this.orderByColumn = ''
          this.orderType = false
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
        let param = {
          params: {
            filters: this.filters,
            orderByColumn: this.orderByColumn,
            orderType: this.orderType,
            size: this.pageSize,
            page: this.pageNum
          }
        }
        this.$fetch.noteApi.getNoteList(param).then(resp => {
          _this.tableData = resp.data.data.data
          _this.count = resp.data.data.total
          _this.pageNum = resp.data.data.page || 1
          _this.pageSize = resp.data.data.pageSize || 10
        }).finally(_ => {
          _this.loading = false
        })
      }
    },
    created () {
      let _this = this
      this.$fetch.tagApi.getAllTags().then(resp => {
        _this.tagsData = resp.data.data
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
