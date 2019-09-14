<template>
  <div class="dashboard-container">
    <el-row :gutter="40" style="margin:20px">
      <el-col :xs="24" :md="8" :xl="8">
        <el-card class="card-data" v-loading="loading">
          <label class="reply">
            <i @click="$router.push({path:'/reply/list'})"
               class="el-jack-icon-reply"
               style="font-size: 50px;margin-left:10%;cursor: pointer">
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
              @row-click="clickReply"
              style="width: 100%;cursor: pointer">
            <el-scrollbar>
              <el-table-column
                  :show-overflow-tooltip="true"
                  column-key="id"
                  fixed
                  label="最近回复日期"
                  prop="date"
                  width="140"
              >
              </el-table-column>
              <el-table-column
                  :show-overflow-tooltip="true"
                  label="昵称"
                  prop="name"
                  width="180">
              </el-table-column>
              <el-table-column
                  :show-overflow-tooltip="true"
                  label="IP"
                  prop="ip"
                  width="200">
              </el-table-column>
              <el-table-column
                  :show-overflow-tooltip="true"
                  label="内容"
                  prop="reply"
                  width="200">
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
  import ECharts from 'echarts'

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
        loading: true,
        dayVisitsNum: '',
        weekVisitsNum: '',
        replyNum: ''
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
      this.$fetch.commonApi.getDashboardData().then(resp => {
        let response = resp.data.data
        _this.weekVisits = response.charts.weekVisits[0]
        _this.wordCloudList = response.tags
        _this.dayVisitsNum = response.dayVisitsNum
        _this.weekVisitsNum = response.weekVisitsNum

        //处理报表
        this.chart = ECharts.init(document.querySelector('#canvas-chart'))
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
          if (_this.wordCloudList && _this.wordCloudList.length > 0) {
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
        }
        wordCloudExecute()

        //处理尺寸响应
        window.onresize = () => {
          _this.chart.resize()
          wordCloudExecute()
        }
      }).finally(() => _this.loading = false)
    },
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
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
