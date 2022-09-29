<template>
  <main class="w-full min-h-screen">
    <div id="hero" class="sticky top-0 z-10 px-2 pt-2 w-full bg-white">
      <header class="container px-2 mx-auto" style="max-width: 1300px">
        <nav
          class="
            flex
            z-30
            flex-wrap
            justify-between
            items-center
            py-4
            w-full
            md:py-0
          "
        >
          <div>
            <a href="/" class="inline-flex justify-center items-center">
              <span>
                <img
                  class="pl-3 icon"
                  src="~/assets/img/icon.png"
                  width="60"
                  alt="logo"
                />
              </span>
              <span class="hidden md:block logo-text">Contentre</span>
            </a>
          </div>

          <div class="py-3">
            <a
              href="https://app.contentre.io/auth/register?source=portfolio"
              class="p-2 text-white rounded-lg border form-btn"
            >
              Create a Portfolio
            </a>
          </div>
        </nav>
      </header>
    </div>
    <section class="container px-2 mx-auto bg-white" style="max-width: 1300px">
      <Nuxt />

      <Toast />
    </section>

    <footer
      class="py-8 mt-20 text-gray-600 sm:px-10 md:px-20"
      style="background: #102a27"
    >
      <div class="grid grid-cols-2 p-2">
        <div class="justify-items-start grid-span-1">
          <a href="/" class="">
            <img
              class="p-2 w-10 h-10 bg-white rounded-full icon"
              src="~/assets/img/icon.png"
              alt="logo"
              width="60"
            />
            <span class="ml-3 text-xl text-white">Contentre</span>
          </a>
          <p class="pt-2 text-sm text-white">
            Portfolio Builder for Tech Writers.
          </p>
        </div>
        <div class="justify-items-end text-right sm:pt-4">
          <a
            class="text-white hover:text-teal-300"
            href="https://contentre.io?source=portfolio"
            >Home</a
          >

          <a
            class="pl-2 text-white hover:text-teal-300"
            href="https://app.contentre.io/auth/register?source=portfolio"
            >Get a Page</a
          >

          <a
            class="pl-2 text-white hover:text-teal-300"
            href="https://blog.contentre.io?source=portfolio"
            >Blog</a
          >
        </div>
      </div>
      <div class="mt-10 bg-transparent border-t-2">
        <div class="container flex flex-col flex-wrap py-4 px-5 mx-auto">
          <p class="text-sm text-center text-white">
            Copyright ® {{ new Date().getFullYear() }} All Copyrights Belong to
            Their Respective Owners.
          </p>
        </div>
      </div>
    </footer>
  </main>
</template>

<script>
export default {
  name: 'PortfolioL',

  data: () => ({
    toggle: false
  }),

  methods: {
    toggleDropdown() {
      this.toggle = !this.toggle
    }
  }
}
</script>

<style scoped>
#hero {
  background: #dcf6f3;
}
</style>