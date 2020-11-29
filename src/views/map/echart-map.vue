<!-- echart-map -->
<template>
  <div class="contentCommon">
    <Row>
      <Col span="24">
      <div ref="myEchart" :style="{ width: '100%',height:'750px' }"></div>
      </Col>
    </Row>
    <Modal
      v-model="mapModal.show"
      :title="mapModal.title"
      >
      <img width="100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602737714874&di=7df3d39632c2aa94540fb7a4ad69c211&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F56%2F12%2F01300000164151121576126282411.jpg" alt="">
      <p>这里是一些信息</p>
      <p>这里是一些信息</p>
      <p>这里是一些信息</p>

    </Modal>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js'

export default {
  data () {
    return {
      chart: null,
      // 散列点位置
      geoCoordMap: {
        /** 山东 */
        济南:[117, 36.67],
        青岛:[120, 36],
        聊城:[115.991890, 36.462682],
        菏泽:[115.461028, 35.248422],
        枣庄:[117.557964, 34.856424],
        济宁:[116.587245, 35.415393],
        泰安:[117.129063, 36.194968],
        曲阜:[116.98645, 35.58091],
        滨州:[118.016974, 37.383542],

        /** 湖南 */
        长沙:[112.982279, 28.19409],

        /** 黑龙江 */
        哈尔滨:[126.642464, 45.756967],

        /** 湖北 */
        武汉:[114.31667, 30.51667],
        孝感:[113.926655, 30.926423],

        /** 江西 */
        婺源:[117.86105, 29.24841],

        /** 江苏 */
        苏州:[120.619585, 31.299379],

        /** 广东 */
        广州:[113.275995, 23.117055],
        深圳:[114.085947, 22.547],

        /** 云南 */
        昆明:[102.712251, 25.040609],
        丽江:[100.233026, 26.872108],
        大理:[100.22998, 25.59157],

        /** 河南 */
        平顶山:[113.307718, 33.735241],
        漯河:[114.026405, 33.575855],

        /** 青海 */
        西宁:[101.778916, 36.623178],

        /** 西藏 */
        拉萨:[91.132212, 29.660361],
        山南:[91.766529, 29.236023],

        /** 四川 */
        成都:[104.065735, 30.659462],
        南充:[106.082974, 30.795281],

        /** 河北 */
        张家口:[114.884091, 40.811901],

        北京: [116.40, 39.912],
      },
      mapModal: {
        title: '',
        show: false
      }
    }
  },
  mounted () {
    this.chinaConfigure()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    chinaConfigure () {
      const myChart = echarts.init(this.$refs.myEchart) // 这里是为了获得容器所在位置
      window.onresize = myChart.resize
      myChart.setOption({ // 进行相关配置
        backgroundColor: '#02AFDB',
        title: {
          text: '我的足迹',
          subtext: '足迹地图',
          sublink: 'http://www.pm25.in',
          x: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            // const a = params.name + ' : ' + '我来过这里的次数 ' + params.value[2] + '<br/>' + 'fdaf'
            const a = params.name + ' : ' + '我去过 ' + params.value[2] + '个地方'
            return a
          }
        }, // 鼠标移到图里面的浮动提示框
        legend: {
          orient: 'vertical',
          top: 'bottom',
          left: 'right',
          data: ['pm2.5'],
          textStyle: {
            color: '#fff'
          }
        },
        // dataRange: {
        //   show: false,
        //   min: 0,
        //   max: 1000,
        //   text: ['High', 'Low'],
        //   realtime: true,
        //   calculable: true,
        //   color: ['orangered', 'yellow', 'lightskyblue']
        // },
        visualMap: {
          min: 0,
          max: 200,
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']  //去过的地方 圆点颜色
            // color: ['red']  //去过的地方 圆点颜色
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: 'yellow',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [{
          name: 'pm2.5',
          type: 'scatter',
          coordinateSystem: 'geo', // 对应上方配置
          data: this.convertData([
            // { name: '海门', value: 9 },
            // { name: '鄂尔多斯', value: 8 },

            /** 山东 */
            { name: '济南', value: 1 },
            { name: '青岛', value: 1 },
            { name: '聊城', value: 1 },
            { name: '菏泽', value: 1 },
            { name: '枣庄', value: 1 },
            { name: '济宁', value: 1 },
            { name: '泰安', value: 1 },
            { name: '曲阜', value: 1 },
            { name: '滨州', value: 1 },

            /** 湖南 */
            { name: '长沙', value: 1 },

            /** 黑龙江 */
            { name: '哈尔滨', value: 1 },

            /** 湖北 */
            { name: '武汉', value: 1 },
            { name: '孝感', value: 1 },

            /** 江西 */
            { name: '婺源', value: 1 },

            /** 江苏 */
            { name: '苏州', value: 1 },

            /** 广东 */
            { name: '广州', value: 1 },
            { name: '深圳', value: 1 },

            /** 云南 */
            { name: '昆明', value: 1 },
            { name: '丽江', value: 1 },
            { name: '大理', value: 1 },

            /** 河南 */
            { name: '平顶山', value: 1 },
            { name: '漯河', value: 1 },

            /** 青海 */
            { name: '西宁', value: 1 },

            /** 西藏 */
            { name: '拉萨', value: 1 },
            { name: '山南', value: 1 },

            /** 成都 */
            { name: '成都', value: 1 },
            { name: '南充', value: 1 },

            /** 河北 */
            { name: '张家口', value: 1 },

            { name: '北京', value: 1 }
          ]),
          symbolSize: 8,
          emphasis: {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            }
          }
        }

        // {
        //   name: '启动次数', // 浮动框的标题
        //   type: 'map',
        //   geoIndex: 0,
        //   data: [{
        //     name: '北京',
        //     value: 599
        //   }, {
        //     name: '上海',
        //     value: 142
        //   }, {
        //     name: '黑龙江',
        //     value: 44
        //   }, {
        //     name: '深圳',
        //     value: 92
        //   }, {
        //     name: '湖北',
        //     value: 810
        //   }, {
        //     name: '四川',
        //     value: 453
        //   }]
        // }
        ]
      })
      myChart.on('click', (params) => {
        console.log(params)
        if (params.componentSubType === 'scatter') {
          // this.$set(this.mapModal, 'title', params.data.name)
          this.mapModal.title = params.data.name
          this.mapModal.show = true
        }
      })
    },
    // 处理数据 给散列点补上 名字和值
    convertData (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    }
  }

}
</script>

<style>
</style>