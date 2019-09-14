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
      <el-button @click="showInput" class="button-new-tag" size="small" v-else>+ 添加新标签</el-button>
    </el-card>
  </div>
</template>

<script>

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
        let _this = this
        this.tags.push(tag)
        let param = {
          title: tag
        }
        this.$fetch.tagApi.addTagByName(param).then(resp => {
          _this.$notify.success('增加成功！')
        })
      },

      delTag (tag) {
        let _this = this
        this.$confirm('确定删除该标签吗？', '提示：').then(() => {
          this.$fetch.tagApi.delTagByName(tag).then(() => {
            _this.tags.splice(this.tags.indexOf(tag), 1)
            _this.$notify.success('删除成功！')
          })
        })
      }
    },
    created (){
      let _this = this
      this.$fetch.tagApi.getAllTags().then(resp => {
        resp.data.data.forEach(e => {
          _this.tags.push(e.value)
        })
      }).finally(() => {
        _this.loading = false
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
