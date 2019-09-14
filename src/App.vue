<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  ::selection {
    background-color: rgb(51, 51, 51);
    color: white;
  }

  body {
    line-height: 2;
    color: #555;
    margin: 0;
  }

  .el-form-item__error {
    margin-top: 2px;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-scrollbar__thumb {
    /*display: none;*/
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, .3);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(144, 147, 153, .5);
  }

  input:-webkit-autofill { box-shadow: 0 0 0 1000px white inset !important;}


  .v-note-wrapper{
    z-index:1 !important;
  }

  .v-note-wrapper .v-note-op{
    border: 1px solid #e0e0e0 !important;
    border-bottom: none !important;
    box-shadow: none !important;
  }

  .v-note-wrapper .v-note-panel{
    border: 1px solid #e0e0e0 !important;
    box-shadow: none !important;
  }
</style>
