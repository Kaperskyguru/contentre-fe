<template>
  <div class="relative w-full lg:flex lg:absolute lg:top-8 lg:justify-center">
    <div
      id="auth-navbar"
      class="flex justify-between items-center py-4 pr-4 pl-2 w-full lg:w-80vw"
    >
      <NuxtLink to="/">
        <img src="~/assets/img/Logo.svg" :alt="appName" />
      </NuxtLink>
      <div class="lg:hidden" @click.prevent="toggleDropdown">
        <div class="mb-1 w-6 h-1 bg-body-text-color"></div>
        <div class="mb-1 w-6 h-1 bg-body-text-color"></div>
        <div class="w-6 h-1 bg-body-text-color"></div>
      </div>
      <div
        id="navDropdown"
        class="
          flex
          absolute
          top-full
          left-0
          flex-col
          px-3
          pt-3
          w-full
          bg-white
          lg:flex
          lg:static
          lg:flex-row
          lg:pt-0
          lg:pr-4
          lg:w-max
          lg:bg-transparent
        "
      >
        <NuxtLink
          v-for="link in links"
          :key="link.text"
          :to="link.to"
          class="pb-3 first:mt-5 lg:pb-0 lg:pl-3 lg:first:pl-0 lg:mt-0"
        >
          <div class="flex">
            <img class="pr-1" :src="link.icon" :alt="link.text" />
            <span class="text-xs text-helvetica text-bold">{{
              link.text.toUpperCase()
            }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardIcon from '~/assets/img/auth-nav/Dashboard.svg'
import ProfileIcon from '~/assets/img/auth-nav/Profile.svg'
import SignUpIcon from '~/assets/img/auth-nav/Sign_up.svg'
import SignInIcon from '~/assets/img/auth-nav/Sign_in.svg'

export default {
  name: 'NavBarTW',
  data: () => ({
    appName: '',
    links: [
      {
        text: 'Dashboard',
        to: '/dashboard',
        icon: DashboardIcon
      },
      {
        text: 'Profile',
        to: '/profile',
        icon: ProfileIcon
      },
      {
        text: 'Sign Up',
        to: '/auth/register',
        icon: SignUpIcon
      },
      {
        text: 'Sign In',
        to: '/auth/login',
        icon: SignInIcon
      }
    ]
  }),
  mounted() {
    this.appName = process.env.NUXT_APP
  },
  methods: {
    toggleDropdown() {
      const dropdown = document.getElementById('navDropdown')
      dropdown.classList.toggle('hidden')
    }
  }
}
</script>

<style scoped>
#auth-navbar {
  background: linear-gradient(
    112.83deg,
    rgba(255, 255, 255, 0.82) 0%,
    rgba(255, 255, 255, 0.8) 110.84%
  );
  border: 2px solid #ffffff;
  box-shadow: 0 7px 23px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(21px);
}

@media screen and (max-width: 1024px) {
  #navDropdown {
    background: linear-gradient(
      112.83deg,
      rgba(255, 255, 255, 0.82) 0%,
      rgba(255, 255, 255, 0.8) 110.84%
    );
  }
}
</style>
