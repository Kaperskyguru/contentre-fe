<template>
  <div class="relative lg:flex">
    <!-- <NavBar /> -->
    <div class="relative w-full lg:flex lg:absolute lg:top-8 lg:justify-center">
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
        w-full
        min-h-80vh
        bg-center bg-no-repeat bg-cover bg-auth-background
        md:flex
        lg:flex-1 lg:items-start lg:pt-20 lg:pl-10vw lg:min-h-screen
      "
    >
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
          Paste your Author Link and get all your contents in one place.
        </h1>
        <p class="font-gilroy font-medium tracking-wide text-white">
          Save all your writings and articles in one platform and view the
          statistics.
        </p>
      </div>
    </div>
    <div class="lg:flex-1 lg:pt-20 lg:pr-10vw lg:pl-7 lg:min-h-screen">
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
