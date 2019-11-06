<template>
  <div>
    <el-card>
      <div solt="header">
        <bread-path>粉丝管理</bread-path>
      </div>
      <el-tabs style=" margin-top: 20px;" v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="fansList">
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="100" :src="item.photo||circleUrl"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain>+关注</el-button>
            </div>
          </div>
          <el-pagination
            @current-change="pager"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansPic">
          <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import circleUrl from './../../assets/images/avatar.jpg'
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 21
      },
      total: 0,
      circleUrl,
      activeName: 'fansPic',
      fansList: [],
      option: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    let dom = this.$refs.dom
    let myChart = echarts.init(dom)
    myChart.setOption(this.option)
  },
  methods: {
    async getFans () {
      const {
        data: { data }
      } = await this.$http.get('/followers', {
        params: this.reqParams
      })
      this.fansList = data.results
      this.total = data.total_count
    },
    pager (current) {
      this.reqParams.page = current
      this.getFans()
    }
  }
}
</script>

<style lang="less" scoped>
.fans_list {
  .fans_item {
    display: inline-block;
    width: 160px;
    height: 210px;
    padding: 10px;
    border: 1px dashed #ddd;
    text-align: center;
    margin-right: 40px;
    margin-bottom: 20px;
  }
}
</style>
