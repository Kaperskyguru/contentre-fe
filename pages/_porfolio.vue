<template>
  <div class="lg:mx-24 bg-white">
    <section class="my-8 pt-3">
      <h1 class="text-3xl font-bold text-gray-900">Solomon Eseme</h1>
    </section>

    <div class="relative bg-teal-100">
      <div
        class="py-40 bg-center bg-cover"
        :style="{ backgroundImage: `url(${image})` }"
      >
        <div class="relative container px-6 mx-auto">
          <div class="lg:flex items-center">
            <section>
              <div class="text-black">
                <div class="container mx-auto">
                  <div
                    class="
                      flex flex-col
                      w-full
                      lg:w-1/2
                      justify-center
                      items-start
                      p-8
                    "
                  >
                    <h1 class="text-xl font-bold md:text-xl text-white mb-4">
                      Hi, I am Solomon Eseme, a freelance writer who creates
                      content that attracts, engages and converts customers.
                    </h1>
                    <a
                      href="#"
                      class="
                        form-btn
                        text-sm text-white
                        rounded
                        shadow
                        py-2
                        px-12
                      "
                      style="background: #00aeff"
                    >
                      Writing Services</a
                    >
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <section class="text-white text-center">
      <div class="container mx-auto flex pt-16 pb-8 md:flex-row flex-col">
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mr-2">
          <img
            class="object-cover object-center rounded"
            alt="hero"
            src="~/assets/img/temp-pic2.png"
          />
        </div>
        <div
          class="
            lg:flex-grow
            md:w-1/2
            ml-2
            flex flex-col
            px-10
            py-4
            text-center
          "
          style="background: #13142b"
        >
          <h1
            class="
              sm:text-2xl
              text-2xl
              mb-4
              mt-8
              font-bold
              text-white
              uppercase
            "
          >
            About Me
          </h1>
          <p class="mb-8 text-xs">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          <div class="flex justify-center pb-8">
            <button
              class="
                text-sm text-white
                rounded
                shadow
                py-2
                px-12
                font-bold
                form-btn
                mr-2
              "
              style="background: #00aeff"
            >
              Contact me
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-24">
      <div class="container mx-auto">
        <div class="flex items-center justify-between py-2">
          <h1 class="text-3xl font-bold text-gray-900 pt-4 uppercase">
            Portfolio
          </h1>
        </div>
        <div class="flex flex-wrap">
          <!-- Column -->
          <div class="w-full md:w-1/2 lg:my-2 lg:w-1/3 lg:pr-2 rounded-lg">
            <!-- Article -->

            <article class="overflow-hidden">
              <a href="#">
                <img
                  alt="Placeholder"
                  class="block h-auto w-full"
                  src="~/assets/img/portfolio-pic1.png"
                />
              </a>

              <header class="leading-tight py-4">
                <span class="text-sm sm:text-sm font-normal text-dark-900">
                  Market research and statistics for 2021 in the Fintech
                  industry.
                </span>
              </header>
            </article>
          </div>
          <!-- END Column -->

          <!-- Column -->
          <div class="w-full md:w-1/2 lg:my-2 lg:w-1/3 lg:px-2">
            <!-- Article -->

            <article class="overflow-hidden rounded-lg">
              <a href="#">
                <img
                  alt="Placeholder"
                  class="block h-auto w-full"
                  src="~/assets/img/portfolio-pic2.png"
                />
              </a>

              <header class="leading-tight py-4">
                <span class="text-sm sm:text-sm font-normal text-dark-900">
                  Market research and statistics for 2021 in the Fintech
                  industry.
                </span>
              </header>
            </article>
          </div>
          <!-- END Column -->

          <!-- Column -->
          <div class="w-full md:w-1/2 lg:my-2 lg:w-1/3 lg:pl-2">
            <!-- Article -->
            <article class="overflow-hidden">
              <a href="#">
                <img
                  alt="Placeholder"
                  class="block h-auto w-full"
                  src="~/assets/img/portfolio-pic3.png"
                />
              </a>
              <header class="leading-tight py-4">
                <span class="text-sm sm:text-sm font-normal text-dark-900">
                  Market research and statistics for 2021 in the Fintech
                  industry.
                </span>
              </header>
            </article>
          </div>
          <!-- END Column -->
        </div>
      </div>

      <div class="container mx-auto">
        <div class="flex flex-wrap">
          <!-- Column -->
          <div class="w-full md:w-1/2 lg:my-2 lg:w-1/3 lg:pr-2 rounded-lg">
            <!-- Article -->

            <article class="overflow-hidden">
              <a href="#">
                <img
                  alt="Placeholder"
                  class="block h-auto w-full"
                  src="~/assets/img/portfolio-pic4.png"
                />
              </a>

              <header class="leading-tight py-4">
                <span class="text-sm sm:text-sm font-normal text-dark-900">
                  Market research and statistics for 2021 in the Fintech
                  industry.
                </span>
              </header>
            </article>
          </div>
          <!-- END Column -->

          <!-- Column -->
          <div class="w-full md:w-1/2 lg:my-2 lg:w-1/3 lg:px-2">
            <!-- Article -->

            <article class="overflow-hidden rounded-lg">
              <a href="#">
                <img
                  alt="Placeholder"
                  class="block h-auto w-full"
                  src="~/assets/img/portfolio-pic5.png"
                />
              </a>

              <header class="leading-tight py-4">
                <span class="text-sm sm:text-sm font-normal text-dark-900">
                  Market research and statistics for 2021 in the Fintech
                  industry.
                </span>
              </header>
            </article>
          </div>
          <!-- END Column -->

          <!-- Column -->
          <div class="w-full md:w-1/2 lg:my-2 lg:w-1/3 lg:pl-2">
            <!-- Article -->
            <article class="overflow-hidden">
              <a href="#">
                <img
                  alt="Placeholder"
                  class="block h-auto w-full"
                  src="~/assets/img/portfolio-pic6.png"
                />
              </a>
              <header class="leading-tight py-4">
                <span class="text-sm sm:text-sm font-normal text-dark-900">
                  Market research and statistics for 2021 in the Fintech
                  industry.
                </span>
              </header>
            </article>
          </div>
          <!-- END Column -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ImageBG from 'assets/img/temp-pic1.png'
export default {
  layout: 'portfolio',
  data: () => ({
    image: ImageBG
  })
}
</script>

<style>
</style>