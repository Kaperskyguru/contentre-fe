<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  extends: Line,
  props: ['chartData', 'options'],
  data: () => ({ chart: null }),
  mounted() {
    const gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)

    gradient.addColorStop(0, 'rgba(79, 209, 197, 0.54)')
    gradient.addColorStop(1, 'rgba(79, 209, 197, 0)')

    const gradient1 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)

    gradient1.addColorStop(0, 'rgba(45, 55, 72, 0.36)')
    gradient1.addColorStop(1, 'rgba(45, 55, 72, 0)')

    this.chart = {
      ...this.chartData
    }

    this.chart.datasets[0].backgroundColor = gradient
    this.chart.datasets[1].backgroundColor = gradient1
    this.chart.datasets[1].borderColor = '#2D3748'

    this.renderChart(this.chart, this.options)
  }
}
</script>

<style>
</style>
