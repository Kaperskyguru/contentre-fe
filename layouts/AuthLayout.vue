<template>
  <div class="relative lg:flex">
    <NavBar />
    <div
      class="
        bg-auth-background
        lg:min-h-screen
        bg-center bg-no-repeat bg-cover
        w-full
        py-4
        px-4
        min-h-80vh
        flex
        justify-center
        items-center
        lg:flex-1 lg:items-start lg:pt-20 lg:pl-10vw
      "
    >
      <div class="lg:pt-20 lg:mt-20">
        <h1
          class="
            text-white text-xl
            mb-6
            font-gilroy font-bold
            tracking-wide
            sm:text-3xl
          "
        >
          Paste your Author Link and get all your contents in one place.
        </h1>
        <p class="font-gilroy text-white font-medium tracking-wide">
          Save all your writings and articles in one platform and view the
          statistics.
        </p>
      </div>
    </div>
    <div class="lg:flex-1 lg:pt-20 lg:pl-7 lg:min-h-screen lg:pr-10vw">
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
