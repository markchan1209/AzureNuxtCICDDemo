<template>
  <client-only placeholder="Loading...">
    <v-chart ref="LineChart" :options="options" :style="chartStyle" v-on="$listeners" />
  </client-only>
</template>

<script>
import resize from './mixins/resize'
export default {
  name: 'LineChart',
  mixins: [resize],
  props: {
    chartStyle: {
      type: Object,
      default: () => ({
        width: '100%'
      })
    },
    options: {
      type: Object,
      default: () => ({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['週一', '週二', '週三', '週四', '週五', '週六', '週日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
