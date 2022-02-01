<template>
  <main class="w-full min-h-screen">
    <div id="hero" class="bg-white w-full px-2 pt-2 z-10 sticky top-0">
      <header>
        <nav
          class="
            flex flex-wrap
            items-center
            justify-between
            py-4
            md:py-0
            z-30
            w-full
          "
        >
          <div>
            <a href="/">
              <img
                class="pl-3 icon"
                src="~/assets/img/icon.png"
                width="60"
                alt="logo"
              />
              <span class="text logo-text">Contentre</span>
            </a>
          </div>

          <svg
            id="menu-button"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click.prevent="toggleDropdown"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <div
            id="navDropdown1"
            class="w-full hidden md:flex md:items-center md:w-auto"
          >
            <ul class="pt-4 text-gray-700 md:flex md:justify-between md:pt-0">
              <li class="pr-5">
                <a
                  href="https://contentre.io/portfolio"
                  class="
                    inline-flex
                    px-20
                    py-3
                    text-white
                    form-btn
                    border
                    rounded-md
                    mb-3
                  "
                >
                  <span class="">Create A Portfolio</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
    <section class="container md:px-12 lg:mx-24 bg-white px-2">
      <Nuxt />

      <Toast />
    </section>

    <footer
      class="text-gray-600 body-font sm:px-10 md:px-20 py-8 mt-20"
      style="background: #102a27"
    >
      <div class="grid p-2 grid-cols-2">
        <div class="justify-items-start grid-span-1">
          <a href="/" class="">
            <img
              class="icon w-10 h-10 p-2 bg-white rounded-full"
              src="~/assets/img/icon.png"
              alt="logo"
              width="60"
            />
            <span class="ml-3 text-xl text-white">Contentre</span>
          </a>
          <p class="text-sm text-white pt-2">
            Manage all your contents from one place.
          </p>
        </div>
        <div class="justify-items-end text-right sm:pt-4">
          <a class="text-white hover:text-teal-300" href="https://contentre.io"
            >Home</a
          >

          <a
            class="text-white hover:text-teal-300 pl-2"
            href="https://contentre.io/portfolio"
            >Get a Page</a
          >

          <a
            class="text-white hover:text-teal-300 pl-2"
            href="https://blog.contentre.io"
            >Blog</a
          >
        </div>
      </div>
      <div class="bg-transparent border-t-2 mt-10">
        <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col">
          <p class="text-white text-sm text-center">
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
  name: 'PortfolioL'
}
</script>

<style scoped>
#hero {
  background: #dcf6f3;
}
</style>