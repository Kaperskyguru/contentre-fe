<template>
  <!-- Column -->
  <div
    class="
      w-full
      md:w-1/2
      lg:my-2 lg:w-1/3 lg:px-2
      bg-white
      rounded-lg
      pt-4
      shadow-lg
    "
  >
    <!-- Article -->

    <article class="overflow-hidden">
      <a href="#">
        <img
          alt="Placeholder"
          class="block h-auto w-full"
          src="~/assets/img/Graph.png"
        />
      </a>

      <header class="leading-tight py-8 px-2">
        <span class="text-xl sm:text-xl font-bold text-gray-900"
          >Fintech Solutions</span
        >
        <h3 class="text-normal font-normal text-gray-500 pb-8">
          <span class="text-green-500 text-base">(+23)</span> than last week
        </h3>
      </header>

      <footer class="flex items-center justify-around md:px-4">
        <a class="flex items-center text-black" href="#">
          <div class="analyticsfooter-footer"></div>
          <p class="mx-2 text-sm">Views</p>
        </a>
        <a class="flex items-center text-black" href="#">
          <div class="analyticsfooter-footer"></div>
          <p class="mx-2 text-sm">Clicks</p>
        </a>
        <a class="flex items-center text-black" href="#">
          <div class="analyticsfooter-footer"></div>
          <p class="mx-2 text-sm">Likes</p>
        </a>
        <a class="flex items-center text-black" href="#">
          <div class="analyticsfooter-footer"></div>
          <p class="mx-2 text-sm">Comments</p>
        </a>
      </footer>

      <!-- footer 2 -->
      <footer class="flex items-center justify-around mt-4 mb-8">
        <a class="text-black font-bold" href="#">
          <p class="text-base">32,984</p>
          <div class="w-full h-1 footer2-progress rounded-full">
            <div class="w-2/3 h-full footer2-progressball rounded-full"></div>
          </div>
        </a>
        <a class="text-black font-bold" href="#">
          <p class="text-base">2,42m</p>
          <div class="w-full h-1 footer2-progress rounded-full">
            <div class="w-4/5 h-full footer2-progressball rounded-full"></div>
          </div>
        </a>
        <a class="text-black font-bold" href="#">
          <p class="text-base">12,340</p>
          <div class="w-full h-1 footer2-progress rounded-full">
            <div class="w-2/5 h-full footer2-progressball rounded-full"></div>
          </div>
        </a>
        <a class="text-black font-bold" href="#">
          <p class="text-base">320</p>
          <div class="w-full h-1 footer2-progress rounded-full">
            <div class="w-3/4 h-full footer2-progressball rounded-full"></div>
          </div>
        </a>
      </footer>
      <!-- footer 2 -->
    </article>
    <!-- END Article -->
  </div>
  <!-- END Column -->
</template>

<script>
export default {
  name: 'ChartColumn'
}
</script>

<style scoped>
.analyticsfooter-footer {
  width: 12px;
  height: 26px;
  background: rgb(79, 209, 197);
  border-radius: 5px;
}

.footer2-progress {
  margin-top: 10px;
  background: rgb(226, 232, 240);
}
</style>