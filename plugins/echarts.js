import Vue from 'vue'

// 在 webpack 环境下指向 components/ECharts.vue
import ECharts from 'vue-echarts'

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/sunburst'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/polar'

// ECharts component
const component = {
  install: function(Vue) {
    Vue.component('v-chart', ECharts)
  }
}

Vue.use(component)
