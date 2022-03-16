<template>
  <main class="mt-8 space-y-6 h-full sm:pr-5">
    <div class="mt-14">
      <PortfolioTopMenu />

      <div class="flex">
        <div class="flex-none w-16">
          <div
            class="z-50 mt-16 mb-2 ml-3 text-white cursor-pointer"
            @click.prevent="menu = !menu"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
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
          </div>

          <PortfolioAside />
        </div>
        <div class="flex flex-1 w-full h-full">
          <div class="grow pt-6 text-gray-800 sm:pt-16">
            <div
              class="
                gap-4
                md:grid-cols-3
                lg:grid-cols-3
                xl:grid-cols-2
                2xl:grid-cols-3
                grid grid-cols-1
              "
            >
              <div class="col-span-2">
                <!-- Panel -->
                <PortfolioPanel />
              </div>
              <div style="background: #083430" class="">
                <PortfolioCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'portfolioDesign',
  data: () => ({
    open: false,
    menu: false,
    panel: false
  }),

  computed: {
    window() {
      if (process.browser) {
        return window
      }
      return null
    }
  }
}
</script>

<style>
.form-btn {
  background: #4fd1c5;
}

.form-btn:hover {
  background: #4fd1c5;
}

.profilelink-a {
  font-size: 8px;
}

.text-unknown {
  color: #048fbb;
}

.card-arrow {
  top: 5px;
}

.card-header {
  font-size: 16px;
}

.calender-font li a {
  font-size: 20px;
}

.dot-color {
  background: #4f5cd1;
}

.dotlast-color {
  background: #ce4fd1;
}

.dotfont {
  font-size: 9px;
}
.dots {
  width: 12px;
  height: 12px;
}
.analyticsfooter-footer {
  width: 12px;
  height: 26px;
  background: #4fd1c5;
  border-radius: 5px;
}

.footer2-progress {
  background: #e2e8f0;
  margin-top: 10px;
}

.footer2-progressball {
  background: #4fd1c5;
}

.links {
  font-size: 12px;
}

/* settings page */

.pro-info {
  font-size: 15px;
}

.pro-check {
  font-size: 13px;
}

/* end of settings page */

/* portfolio aside */

.aside-icons:hover {
  color: white !important;
}

/* end of portfolio aside */

/* portfolio aside hover effect */

.child {
  display: none;
  padding-left: 2rem;
}

.parent:hover .child {
  display: block;
}

/* color-lines */

.first-line {
  position: relative;
  margin-left: -56px;
  margin-right: -8px;
  top: 0px;
}

.second-line {
  bottom: 25px;
  left: 47px;
}
/* end of color-lines */

/* end of portfolio aside hover effect */

@media (max-width: 640px) {
  body > aside,
  body > main {
    grid-area: stack;
  }
}

#sidenav-open {
  --easeOutExpo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration: 0.6s;
  display: grid;
  grid-template-columns: [nav] 1fr [escape] 2fr;
}

@media (max-width: 640px) {
  #sidenav-open {
    position: sticky;
    top: 0;
    max-height: 100vh;
    overflow: hidden auto;
    overscroll-behavior: contain;
    visibility: hidden;
    transform: translateX(-110vw);
    will-change: transform;
    transition: transform var(--duration) var(--easeOutExpo),
      visibility 0s linear var(--duration);
  }
}

@media only screen and (max-width: 640px) {
  #sidenav-open:target {
    visibility: visible;
    transform: translateX(0);
    transition: transform var(--duration) var(--easeOutExpo);
  }

  #sidenav-open:target ~ main {
    filter: blur(0.5em);
    z-index: -1;
  }
}

.grid-cols-auto-1fr-auto {
  grid-template-columns: auto 1fr auto;
}

#profile-progress {
  border: 1em solid white;
  border-right-color: #4a00e0;
  border-top-color: #4a00e0;
  border-bottom-color: #4a00e0;
  animation: thickening 1s 0.5s linear normal;
  border-left-color: white;
  border-radius: 50%;
}

@keyframes thickening {
  from {
    border-width: 0.2em;
  }
  to {
    border-width: 1em;
  }
}
</style>