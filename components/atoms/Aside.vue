<template>
  <aside
    id="sidebar"
    class="
      fixed
      z-30
      h-full
      top-0
      left-0
      pt-16
      flex
      lg:flex
      flex-shrink-0 flex-col
      w-64
      transition-width
      duration-75
      hidden
      aside
    "
    aria-label="Sidebar"
  >
    <div
      class="
        relative
        flex-1 flex flex-col
        min-h-0
        border-r border-gray-200
        bg-teal
        pt-0
      "
    >
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-1 px-3 bg-teal space-y-1">
          <ul class="space-y-2 py-4 border-t border-gray-500">
            <div class="logo absolute aside-header">
              <Hyperlink to="/" class="font-bold flex items-center lg:ml-2.5">
                <img
                  src="~/assets/img/dashboard_logo.svg"
                  class="img-fluid"
                  alt="contentr Logo"
                />
                <!-- <span class="self-center whitespace-nowrap">contentr</span> -->
              </Hyperlink>
            </div>
            <li>
              <Hyperlink
                to="/app/"
                class="
                  text-base text-gray-500
                  font-normal font-roboto
                  rounded-lg
                  hover:text-white
                  flex
                  items-center
                  p-2
                  group
                "
              >
                <span class="text-white">
                  <DashboardIcon />
                </span>
                <span class="ml-3 flex-1 whitespace-nowrap">Dashboard</span>
              </Hyperlink>
            </li>
            <li>
              <Hyperlink
                to="app/analytics"
                class="
                  text-base text-gray-500
                  font-normal font-roboto
                  rounded-lg
                  hover:text-white
                  flex
                  items-center
                  p-2
                  group
                "
              >
                <AnalyticIcon />
                <span class="ml-3 flex-1 whitespace-nowrap">Analytics</span>
              </Hyperlink>
            </li>
            <li>
              <a
                href="#"
                class="
                  text-base text-gray-500
                  font-normal font-roboto
                  rounded-lg
                  hover:text-white
                  flex
                  items-center
                  p-2
                  group
                "
              >
                <ClientIcon />
                <span class="ml-3 flex-1 whitespace-nowrap">Clients</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="
                  text-base text-gray-500
                  font-normal font-roboto
                  rounded-lg
                  hover:text-white
                  flex
                  items-center
                  p-2
                  group
                "
              >
                <PorfolioIcon />
                <span class="ml-3 flex-1 whitespace-nowrap">Portfolio</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="
                  text-base text-gray-500
                  font-normal font-roboto
                  rounded-lg
                  hover:text-white
                  flex
                  items-center
                  p-2
                  group
                "
              >
                <ContentIcon />
                <span class="ml-3 flex-1 whitespace-nowrap">Content</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="
                  text-base text-gray-500
                  font-normal font-roboto
                  rounded-lg
                  hover:text-white
                  flex
                  items-center
                  p-2
                  group
                "
              >
                <ProfileIcon />
                <span class="ml-3 flex-1 whitespace-nowrap">Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="
                  text-base text-gray-500
                  font-normal font-roboto
                  rounded-lg
                  hover:text-white
                  flex
                  items-center
                  p-2
                  group
                "
              >
                <SettingIcon id="settings-icon" />
                <span class="ml-3 flex-1 whitespace-nowrap">Settings</span>
              </a>
            </li>

            <!-- Aside Footer -->

            <div
              class="
                aside-footer
                relative
                bottom-0
                overflow-hidden
                rounded-lg
                shadow-lg
                py-2
                px-2
              "
            >
              <div class="flex justify-between items-center py-2 px-2">
                <div class="">
                  <p class="text-white font-roboto text-base">Storage</p>
                </div>
                <div class="">
                  <p class="font-roboto">Upgrade</p>
                </div>
              </div>

              <div class="aside-footer-footer px-2 pb-2">
                <p class="text-white font-roboto pb-4">
                  3.4 GB <span class="text-light">of 15 GB</span>
                </p>
                <div class="w-full h-2 progress-bg rounded-full">
                  <div class="w-1/6 h-full progress rounded-full"></div>
                </div>
              </div>
            </div>
            <!-- End -->
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import DashboardIcon from '~/assets/icons/dashboard.svg?inline'
import AnalyticIcon from '~/assets/icons/analytic.svg?inline'

import ContentIcon from '~/assets/icons/content.svg?inline'
import PorfolioIcon from '~/assets/icons/porfolio.svg?inline'
import ProfileIcon from '~/assets/icons/profile.svg?inline'
import ClientIcon from '~/assets/icons/client.svg?inline'
import SettingIcon from '~/assets/icons/setting.svg?inline'

export default {
  name: 'AsideBar',
  components: {
    DashboardIcon,
    AnalyticIcon,
    ContentIcon,
    PorfolioIcon,
    ProfileIcon,
    ClientIcon,
    SettingIcon
  }
}
</script>

<style scoped>
ul svg {
  fill: #6b8583;
}

ul svg#settings-icon {
  fill: none;
  color: #6b8583;
}

ul li > a:hover svg {
  fill: white;
}

ul li > a:hover svg#settings-icon {
  fill: none;
  color: white;
}
</style>
