<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div class="shrink-0">
        <span
          class="font-helvetica text-2xl font-bold text-gray-900 sm:text-2xl"
          >{{ title }}</span
        >
        <h3 class="font-gilroy text-base font-medium text-gray-500">
          <span class="font-gilroy text-base font-bold text-green-500"
            >(+5) more</span
          >
          in 2021
        </h3>
      </div>
    </div>
    <div class="line-chart-wrapper" :style="computedStyles">
      <LineChart :styles="styles" :chartdata="chartData" :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  props: {
    title: {
      type: String,
      default: 'Content Overview'
    }
  },
  data: () => ({
    styles: {
      // height: 400
    },
    chartData: {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      datasets: [
        {
          data: [9, 18, 8, 4, 1, 3, 9, 18, 8, 4, 1, 3],
          pointRadius: 0,
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)'
          // ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          borderColor: '#2D3748',
          borderWidth: 3,
          backgroundColor: 'rgba(45, 55, 72, .36)',
          fill: 'start'
        },
        {
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          pointRadius: 0,
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)'
          // ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          borderColor: '#4FD1C5',
          borderWidth: 3,
          backgroundColor: 'rgba(79, 209, 197, .54)',
          fill: 'start'
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              borderDash: [3.5, 3.5],
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontColor: '#CBD5E0',
              fontWeight: 'bold'
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontColor: '#CBD5E0',
              fontWeight: 'bold'
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    computedStyles() {
      return {
        // height: `${this.styles.height}px`,
        position: 'relative',
        width: '100%'
      }
    }
  }
}
</script>

<style>
</style>
