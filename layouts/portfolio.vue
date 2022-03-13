<template>
  <main class="w-full min-h-screen">
    <div id="hero" class="sticky top-0 z-10 px-2 pt-2 w-full bg-white">
      <header>
        <nav
          class="
            z-30
            justify-between
            items-center
            py-4
            w-full
            md:py-0
            flex flex-wrap
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
            class="block w-6 h-6 cursor-pointer md:hidden"
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
            class="hidden w-full md:flex md:items-center md:w-auto"
          >
            <ul class="pt-4 text-gray-700 md:flex md:justify-between md:pt-0">
              <li class="pr-5">
                <a
                  href="https://app.contentre.io/auth/register?source=portfolio"
                  class="
                    inline-flex
                    py-3
                    px-20
                    mb-3
                    text-white
                    rounded-md
                    border
                    form-btn
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
    <section class="container px-2 bg-white md:px-12 lg:mx-24">
      <Nuxt />

      <Toast />
    </section>

    <footer
      class="py-8 mt-20 text-gray-600 sm:px-10 md:px-20 body-font"
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
            Manage all your contents from one place.
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
  name: 'PortfolioL'
}
</script>

<style scoped>
#hero {
  background: #dcf6f3;
}
</style>