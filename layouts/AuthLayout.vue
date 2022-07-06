<template>
  <div class="relative lg:flex">
    <!-- <NavBar /> -->
    <div class="relative w-full lg:flex lg:absolute lg:top-8 lg:pl-10">
      <div
        id="auth-navbar"
        class="flex justify-between py-4 pr-4 w-full text-white lg:w-80vw"
      >
        <a href="https://contentre.io?source=app">
          <Logo width="50" height="50" />
        </a>
      </div>
    </div>
    <div
      class="
        hidden
        justify-center
        items-center
        p-4
        w-1/2
        min-h-80vh
        bg-center bg-no-repeat bg-cover bg-auth-background
        md:flex
        lg:flex-1 lg:items-start lg:pt-20 lg:pl-10 lg:min-h-screen
      "
    >
      <div class="flex flex-col w-full">
        <div class="lg:pt-20 lg:mt-20">
          <h1
            class="
              mb-6
              font-gilroy
              text-xl
              font-bold
              tracking-wide
              text-white
              sm:text-3xl
            "
          >
            Stay Organized.<br />
            <span class="font-bold">Create Personalized Portfolios.</span>
            <br />
            Gain more Clients.
          </h1>
          <p class="font-gilroy font-medium tracking-wide text-white">
            Organize all your content, manage clients, share samples, and
            publish your work to various platforms, all on Contentre.
          </p>
        </div>

        <section class="mt-20 w-full">
          <Testimonial />
        </section>
      </div>
    </div>
    <div class="w-full lg:flex-1 lg:pt-20 lg:pr-10vw lg:pl-7 lg:min-h-screen">
      <Nuxt />
    </div>
    <Toast />
  </div>
</template>

<script>
import Logo from '~/assets/img/icon.svg?inline'
export default {
  name: 'AuthLayout',

  components: {
    Logo
  }
}
</script>

<style scoped>
</style>
