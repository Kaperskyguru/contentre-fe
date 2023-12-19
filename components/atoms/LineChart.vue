<script>
import { Line } from 'vue-chartjs'
import { getDateLength, dateFormat, getDateRange } from '~/lib/date'

export default {
  name: 'LineChart',
  extends: Line,
  // eslint-disable-next-line vue/require-prop-types
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
      ...this.chartData,
      labels: this.chartData?.labels?.unit
        ? this.renderXLabel(
            this.chartData?.labels?.data,
            this.chartData?.labels?.unit
          )
        : this.chartData?.labels
    }

    if (this.chart.datasets.length > 0)
      this.chart.datasets[0].backgroundColor = gradient
    if (this.chart.datasets.length > 1) {
      this.chart.datasets[1].backgroundColor = gradient1
      this.chart.datasets[1].borderColor = '#2D3748'
    }

    this.renderChart(this.chart, this.options)
  },

  methods: {
    renderXLabel(data, unit) {
      if (!data || !unit) return ''

      const d = data.map((item, index) => {
        const d = new Date(item.t)

        const sw = this.$refs.canvas.width / window.devicePixelRatio

        switch (unit) {
          case 'minute':
            return index % 2 === 0 ? dateFormat(d, 'H:mm', this.locale) : ''
          case 'hour':
            return dateFormat(d, 'p', this.locale)
          case 'day':
            if (this.records(unit) > 25) {
              if (sw <= 275) {
                return index % 10 === 0 ? dateFormat(d, 'M/d', this.locale) : ''
              }
              if (sw <= 550) {
                return index % 5 === 0 ? dateFormat(d, 'M/d', this.locale) : ''
              }
              if (sw <= 700) {
                return index % 2 === 0 ? dateFormat(d, 'M/d', this.locale) : ''
              }

              return dateFormat(d, 'MMM d', this.locale)
            }
            if (sw <= 375) {
              return index % 2 === 0 ? dateFormat(d, 'MMM d', this.locale) : ''
            }
            if (sw <= 425) {
              return dateFormat(d, 'MMM d', this.locale)
            }

            return dateFormat(d, 'EEE M/d', this.locale)
          case 'month':
            if (sw <= 330) {
              return index % 2 === 0 ? dateFormat(d, 'MMM', this.locale) : ''
            }
            return dateFormat(d, 'MMM', this.locale)
          default:
            return dateFormat(d, 'MMM', this.locale)
        }
      })
      return d
    },

    records(unit) {
      const period =
        this.options?.period === 'all'
          ? '1year'
          : this.options?.period ?? '1week'

      const { startDate, endDate } = getDateRange(period)
      return getDateLength(startDate, endDate, unit ?? 'day')
    }
  }
}
</script>

<style>
</style>
