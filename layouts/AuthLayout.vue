<template>
  <div class="relative lg:flex">
    <NavBar />
    <div
      class="
        flex
        justify-center
        items-center
        p-4
        w-full
        min-h-80vh
        bg-auth-background
        lg:flex-1 lg:items-start lg:pt-20 lg:pl-10vw lg:min-h-screen
        bg-center bg-no-repeat bg-cover
      "
    >
      <div class="lg:pt-20 lg:mt-20">
        <h1
          class="
            mb-6
            tracking-wide
            sm:text-3xl
            text-white text-xl
            font-gilroy font-bold
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
export default {
  name: 'AuthLayout'
}
</script>

<style scoped>
</style>
