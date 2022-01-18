<template>
  <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
    <div class="line-chart-wrapper pt-3 pb-3">
      <div id="actual-wrapper" class="line-chart__actual-wrapper">
        <BarChart :chartdata="chartData" :options="options"/>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="overflow-x-auto rounded-lg">
        <div class="align-middle inline-block min-w-full">

        </div>
      </div>
    </div>
    <div class="mb-4 flex items-center justify-between">
      <div class="flex-shrink-0">
        <span class="text-2xl sm:text-2xl font-helvetica font-bold text-gray-900"
        >Fintech Solutions</span
        >
        <h3 class="text-base font-gilroy font-medium text-gray-500">
          <span class="text-green-500 text-base font-bold">(+23)</span> than last week
        </h3>
      </div>
    </div>
    <div class="flex mt-3">
      <div class="flex">
        <div class="flex">
          <div class="header-icon"></div>
          <h6>Views</h6>
        </div>
        <div class="flex">
          <p>32,984</p>
        </div>
        <div class="flex">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  computed: {
    calculatedHeight() {
        if(this.mounted) {
          const elem = document.getElementById('actual-wrapper');
          const height = window.getComputedStyle(elem, null).getPropertyValue('height')
          return height - 60;
        } else {
          return 300;
        }
    }
  },
  mounted() {
      this.mounted = true;
  },
  data: () => ({
    styles: {
      height: 300
    },
    mounted: false,
    chartData: {
      labels: ['', '', '', '', '', '', '',],
      datasets: [{
        label: '',
        data: [9, 18, 8, 4, 1, 3, 9,],
        backgroundColor: "#fff",
        barPercentage: 1,
        borderWidth: 700,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        categoryPercentage: 1,
      },
      ],
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: '#fff'
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
}
</script>

<style scoped>
.line-chart-wrapper {
  /*height: 300px;*/
  width: 100%;
  /*max-height: 300px;*/
  border-radius: 12px;
  position: relative;
  background: linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%);
  display: flex;
  justify-content: center;
  align-items: center;

}

.line-chart__actual-wrapper {
  /*width: calc(100% - 30px);*/
  /*height: calc(100% - 30px);*/
  position: relative;
}
</style>
