<template>
  <div class="note-container">
    <div class="note">
      <markdown v-html="markdownText"></markdown>
    </div>
  </div>
</template>

<script>
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'
  import markdownC from './markdown'
  import anchor from 'markdown-it-anchor'
  import list from 'markdown-it-table-of-contents'

  export default {
    name: 'showContent',
    props:['markdownValue'],
    data () {
      return {
        markdownText: ''
      }
    },
    components: {
      markdown: markdownC
    },
    mounted: function () {
      //添加行号
      document.querySelectorAll('code .code-pre').forEach((e) => {
        let lineArr = e.innerHTML.split('\n')
        let result = ''
        let len = lineArr.length
        for (let i = 0; i < len - 1; i++) {
          result += '<li>' + lineArr[i] + '</li>'
        }
        e.innerHTML = '<ol class=\'line-numbers\'>' + result + '</ol>'
      })
    },
    created () {
      /* format markdown context */
      this.markdownText = new MarkdownIt({
        highlight: (str, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<div class="code-pre">' + hljs.highlight(lang, str).value + '</div>'
            } catch (__) {
            }
          }
          return '' // use external default escaping
        }
      })
        .use(anchor,{
        permalink: true,
        permalinkBefore: true,
        permalinkSymbol: '¶'
      })
        .use(list,{
          includeLevel: [1,2,3],
          listType:'ol',
          format:function (title){
            return title.trim()
          }
        })
        .render(this.markdownValue)
    }
  }
</script>

<style scoped>
  .note {
    padding: 20px;
    margin: 0 auto;
    position: relative;
    box-sizing: border-box;
    width: 900px;
  }
  .note-container{
    width: 100%;
    padding-right:300px;
    box-sizing: border-box;
    transition: all 0.3s;
  }
</style>
