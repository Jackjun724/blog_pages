<template>
  <div class="dashboard-container">
    <el-row :gutter="40" style="margin:20px">
      <el-col :xs="24" :md="8" :xl="8">
        <el-card class="card-data" v-loading="loading">
          <label class="reply">
            <i
              class="el-jack-icon-reply"
              style="font-size: 50px;margin-left:10%;cursor: pointer"
              @click="$router.push({path:'/reply/list'})">
            </i>
          </label>
          <div class="display">
            <span class="title">今日回复</span><br>
            <span class="numbers">{{replyNum}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8" :xl="8">
        <el-card class="card-data" v-loading="loading">
          <label class="visits-day">
            <i class="el-icon-user" style="font-size: 50px;margin-left:10%;margin-top:25px"></i>
          </label>
          <div class="display">
            <span class="title">今日访问</span><br>
            <span class="numbers">{{dayVisitsNum}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8" :xl="8">
        <el-card class="card-data" v-loading="loading">
          <label class="visits-week">
            <i class="el-icon-user" style="font-size: 50px;margin-left:10%;margin-top:25px"></i>
          </label>
          <div class="display">
            <span class="title">本周访问</span><br>
            <span class="numbers">{{weekVisitsNum}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card shadow="never" style="margin: 0 40px 40px 40px;min-height:400px;" v-loading="loading">
          <div id="canvas-chart" style="height: 400px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="40" style="margin:0 20px;">
      <el-col :md="12" :sm="24" :xs="24">
        <el-card shadow="never" style="min-height:400px;margin-bottom:35px;" v-loading="loading">
          <div slot="header">
            <span class="card-title">标签热度</span>
          </div>
          <div style="position: relative" class="canvas-container">
            <div class="popper-tips" :style="popperStyle">
              Title: {{popperData.title}} <br>
              Click: {{popperData.click}}
            </div>
            <canvas id="word-cloud" height="287">
            </canvas>
          </div>
        </el-card>
      </el-col>
      <el-col :md="12" :sm="24" :xs="24">
        <el-card shadow="never" style="min-height:400px;margin-bottom:35px;" v-loading="loading">
          <el-table
            :data="tableData"
            style="width: 100%;cursor: pointer"
            @row-click="clickReply">
            <el-scrollbar>
              <el-table-column
                prop="date"
                label="最近回复日期"
                width="140"
                column-key="id"
                fixed
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="昵称"
                width="180"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="ip"
                label="IP"
                width="200"
                :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column
                prop="reply"
                label="内容"
                width="200"
                :show-overflow-tooltip="true">
              </el-table-column>
            </el-scrollbar>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import wordCloud from 'wordcloud'
  import echarts from 'echarts'
  import {setToken} from '@/utils/auth'

  export default {
    name: 'dashboard',
    data () {
      return {
        tableData: [],
        divisor: 100,
        popperStyle: {
          'left': '0',
          'top': '0',
          'opacity': '0'
        },
        popperData: {
          title: 'normal',
          click: '0'
        },
        chart: null,
        weekVisits: [],
        weekReply: [],
        wordCloudList: [],
        loading:true,
        dayVisitsNum:'',
        weekVisitsNum:'',
        replyNum:''
      }
    },
    methods: {
      clickReply () {
        this.$router.push({path: '/reply/list'})
      },
    },
    mounted () {
      let _this = this
      let _divisor = this.divisor
      //报表
      this.$fetch.apiBuilding.getDashboardData().then(resp => {
        let response = resp.data
        if (response.code === 0) {
          _this.weekVisits = response.data.charts.weekVisits[0]
          _this.weekReply = response.data.charts.weekReply[0]
          _this.wordCloudList = response.data.tags
          _this.tableData = response.data.reply
          _this.dayVisitsNum=response.data.dayVisitsNum
          _this.weekVisitsNum=response.data.weekVisitsNum
          _this.replyNum=response.data.replyNum

          //处理报表
          this.chart = echarts.init(document.querySelector('#canvas-chart'))
          this.chart.setOption({
            xAxis: {
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              boundaryGap: false,
              axisTick: {
                show: false
              }
            },
            grid: {
              left: 10,
              right: 10,
              bottom: 20,
              top: 30,
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
              padding: [5, 10]
            },
            yAxis: {
              axisTick: {
                show: false
              }
            },
            legend: {
              data: ['访问量', '回复量']
            },
            series: [{
              name: '访问量', itemStyle: {
                normal: {
                  color: '#FF005A',
                  lineStyle: {
                    color: '#FF005A',
                    width: 2
                  }
                }
              },
              smooth: true,
              type: 'line',
              data: _this.weekVisits,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
              {
                name: '回复量',
                smooth: true,
                type: 'line',
                itemStyle: {
                  normal: {
                    color: '#3888fa',
                    lineStyle: {
                      color: '#3888fa',
                      width: 2
                    },
                    areaStyle: {
                      color: '#f3f8ff'
                    }
                  }
                },
                data: _this.weekReply,
                animationDuration: 2800,
                animationEasing: 'quadraticOut'
              }]
          })

          //处理字符云
          let wordCloudExecute = function () {
            document.querySelector('#word-cloud').width = document.querySelector('.canvas-container').offsetWidth
            wordCloud(document.getElementById('word-cloud'), {
              list: _this.wordCloudList,
              weightFactor: e => {
                return e / _divisor * 20
              },
              hover: (item, dimension) => {
                try {
                  _this.popperStyle.opacity = '1'
                  _this.popperData.title = item[0]
                  _this.popperData.click = item[1]
                  _this.popperStyle.left = (dimension.x + 10) + 'px'
                  _this.popperStyle.top = (dimension.y - 65) + 'px'
                } catch (e) {
                  _this.popperStyle.opacity = '0'
                }
              }
            })
          }
          wordCloudExecute()

          //处理尺寸响应
          window.onresize = () => {
            _this.chart.resize()
            wordCloudExecute()
          }
          _this.loading=false
        }else if(response.code === 10){
          _this.$message({
            message:'身份信息已过期!请重新登录!',
            type:'warning'
          })
          setToken('')
          this.$router.push({path:'/login'})
        }
      })
    },
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .dashboard-container {
  }

  .popper-tips {
    padding: 5px 10px;
    background: #000000e0;
    border-radius: 5px;
    position: absolute;
    line-height: 1.4;
    font-family: Consolas, Arial, 'Microsoft YaHei', serif;
    color: white;
    transition: all .3s;
  }

  .popper-tips:before {
    content: '';
    display: block;
    border-top: 7px solid black;
    border-bottom: 7px solid transparent;
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
    bottom: -14px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.5);
    padding-left: 50px;
  }

  .card-data {
    height: 140px;
    margin-bottom: 20px;
    user-select: none;
    position: relative;

    label {
      font-size: 22px;
      font-weight: 900;
    }

    .reply {
      color: #40c9c6;
    }

    .visits-day {
      color: #36a3f7;
    }

    .visits-week {
      color: #f4516c;
    }

    .display {
      float: right;
      margin-top: 16px;
      margin-right: 10%;
    }

    .title {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      font-weight: bold;
    }

    .numbers {
      color: #666;
      text-rendering: optimizeLegibility;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
      font-size: 20px;
      font-weight: bold;
    }
  }
</style>
