<template>
  <div class="min-h-screen">
    <div id="hero" class="bg-transpaent w-full px-8 pt-2 z-10">
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
            <a href="#">
              <img
                class="pl-3 icon"
                src="~/assets/img/icon.png"
                width="60"
                alt="logo"
              />
              <span class="text logo-text">Contentre.io</span>
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

          <div id="menu" class="w-full md:flex md:items-center md:w-auto">
            <ul class="pt-4 text-gray-700 md:flex md:justify-between md:pt-0">
              <li>
                <a class="md:p-4 py-2 block" href="#">
                  <span class="">About</span>
                </a>
              </li>
              <li>
                <a class="md:p-4 py-2 block" href="#">
                  <span class="">Products</span>
                </a>
              </li>
              <li>
                <a class="md:p-4 py-2 block" href="#">
                  <span class="">Services</span>
                </a>
              </li>
              <li>
                <a class="md:p-4 py-2 block" href="#">
                  <span class="">Contact</span>
                </a>
              </li>
            </ul>
          </div>
          <div id="menu" class="w-full md:flex md:items-center md:w-auto">
            <ul class="pt-4 text-gray-700 md:flex md:justify-between md:pt-0">
              <li class="pr-5">
                <Button href="auth/login">
                  <span class="">Log In</span>
                </Button>
              </li>
              <li class="items-center">
                <Button class="" href="auth/login">
                  <span class="">Get Started</span>
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style>
#hero {
  background: #dcf6f3;
}

.absolute-imgtop {
  margin-bottom: -30rem;
}

.absolute-star {
  position: absolute;
  left: 40px;
  top: -41px;
}

.absolute-dotbottom {
  bottom: -30px;
  left: -100px;
}

.absolute-dottop {
  right: -80px;
  top: -30px;
}

.absolute-dotbr {
  right: -30px;
}

.absolute-circle {
  height: 17rem;
  left: -50px;
}
</style>