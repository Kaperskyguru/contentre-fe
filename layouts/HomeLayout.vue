<template>
  <div
    class="
      bg-white
      rounded-t
      shadow-2xl
      nav-line
      fixed
      top-0
      left-0
      right-0
      m-6
    "
  >
    <header>
      <nav
        class="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-gray-700
        "
      >
        <div>
          <a href="#">
            <img
              class="pl-3 icon"
              src="~/assets/img/Logo.svg"
              width="60"
              alt="logo"
            />
            <span class="text logo-text">Contentr.io</span>
          </a>
        </div>

        <svg
          id="menu-button"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <div id="menu" class="hidden w-full md:flex md:items-center md:w-auto">
          <ul
            class="
              uppercase
              pt-4
              text-gray-700
              md:flex md:justify-between md:pt-0
            "
          >
            <li>
              <a
                class="
                  md:p-4
                  py-2
                  block
                  hover:text-purple-400
                  transition
                  ease-in
                  duration-150
                "
                href="dashboard.html"
              >
                <img
                  class="icon"
                  src="https://cdn2.iconfinder.com/data/icons/neutro-essential/32/dashboard-256.png"
                  width="20"
                  alt="image"
                />

                <span class="text">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                class="
                  md:p-4
                  py-2
                  block
                  hover:text-purple-400
                  transition
                  ease-in
                  duration-150
                "
                href="#"
              >
                <img
                  class="icon"
                  src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-256.png"
                  width="20"
                  alt="image"
                />

                <span class="text">Profile</span>
              </a>
            </li>
            <li>
              <a
                class="
                  md:p-4
                  py-2
                  block
                  hover:text-purple-400
                  transition
                  ease-in
                  duration-150
                "
                href="index.html"
              >
                <img
                  class="icon"
                  src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png"
                  width="20"
                  alt="image"
                />

                <span class="text">Sign up</span>
              </a>
            </li>
            <li>
              <a
                class="
                  md:p-4
                  py-2
                  block
                  hover:text-purple-400
                  transition
                  ease-in
                  duration-150
                "
                href="sign-in.html"
              >
                <img
                  class="icon"
                  src="https://cdn0.iconfinder.com/data/icons/zondicons/20/key-256.png"
                  width="20"
                  alt="image"
                />

                <span class="text">Sign in</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>