<script>
import { Doughnut } from 'vue-chartjs'

export default {
  name: 'DoughnutChart',
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style>
</style>
