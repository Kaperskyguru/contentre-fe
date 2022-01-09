<template>
  <div class="flex pt-16">
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
                <a href="#" class="font-bold flex items-center lg:ml-2.5">
                  <img
                    src="~/assets/img/Logo.svg"
                    class="img-fluid"
                    alt="contentr Logo"
                  />
                  <span class="self-center whitespace-nowrap">contentr</span>
                </a>
              </div>
              <li>
                <a
                  href="dashboard.html"
                  class="
                    text-base text-gray-500
                    font-normal
                    rounded-lg
                    hover:text-white
                    flex
                    items-center
                    p-2
                    group
                  "
                >
                  <svg
                    class="
                      w-6
                      h-6
                      text-gray-500
                      flex-shrink-0
                      group-hover:text-gray-900
                      transition
                      duration-75
                      hover:text-white
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path
                      d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                    ></path>
                  </svg>
                  <span class="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="analytics.html"
                  class="
                    text-base text-gray-500
                    font-normal
                    rounded-lg
                    hover:text-white
                    flex
                    items-center
                    p-2
                    group
                  "
                >
                  <svg
                    class="
                      w-6
                      h-6
                      text-gray-500
                      flex-shrink-0
                      group-hover:text-gray-900
                      transition
                      duration-75
                      hover:text-white
                    "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      class="pf ma"
                      :class="page === 'analytics' &amp;&amp; 'text-gray-500'"
                      d="M0 20h24v2H0z"
                    ></path>
                    <path
                      class="pf ml"
                      :class="page === 'analytics' &amp;&amp; 'text-gray-500'"
                      d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                    ></path>
                  </svg>
                  <span class="ml-3 flex-1 whitespace-nowrap">Analytics</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="
                    text-base text-gray-500
                    font-normal
                    rounded-lg
                    hover:text-white
                    flex
                    items-center
                    p-2
                    group
                  "
                >
                  <svg
                    class="
                      w-6
                      h-6
                      text-gray-500
                      flex-shrink-0
                      group-hover:text-gray-900
                      transition
                      duration-75
                      hover:text-white
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    ></path>
                  </svg>
                  <span class="ml-3 flex-1 whitespace-nowrap">Groupings</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="
                    text-base text-gray-500
                    font-normal
                    rounded-lg
                    hover:text-white
                    flex
                    items-center
                    p-2
                    group
                  "
                >
                  <svg
                    class="
                      h-6
                      w-6 w-6
                      h-6
                      text-gray-500
                      flex-shrink-0
                      group-hover:text-gray-900
                      transition
                      duration-75
                      hover:text-white
                    "
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11 12h2v2h9s-.149-4.459-.2-5.854C21.75 6.82 21.275 6 19.8 6h-3.208l-1.197-2.256C15.064 3.121 14.951 3 14.216 3H9.783c-.735 0-.847.121-1.179.744-.165.311-.7 1.318-1.196 2.256H4.199c-1.476 0-1.945.82-2 2.146C2.145 9.473 2 14 2 14h9v-2zM9.649 4.916c.23-.432.308-.516.817-.516h3.067c.509 0 .588.084.816.516L14.924 6h-5.85l.575-1.084zM13 17h-2v-2H2.5s.124 1.797.199 3.322c.031.633.218 1.678 1.8 1.678H19.5c1.582 0 1.765-1.047 1.8-1.678.087-1.568.2-3.322.2-3.322H13v2z"
                      fill-rule="nonzero"
                    />
                  </svg>
                  <span class="ml-3 flex-1 whitespace-nowrap">Portfolio</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="
                    text-base text-gray-500
                    font-normal
                    rounded-lg
                    hover:text-white
                    flex
                    items-center
                    p-2
                    group
                  "
                >
                  <svg
                    class="
                      w-6
                      h-6
                      text-gray-500
                      flex-shrink-0
                      group-hover:text-gray-900
                      transition
                      duration-75
                      hover:text-white
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-3 flex-1 whitespace-nowrap">Content</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="
                    text-base text-gray-500
                    font-normal
                    rounded-lg
                    hover:text-white
                    flex
                    items-center
                    p-2
                    group
                  "
                >
                  <svg
                    class="
                      w-6
                      h-6
                      text-gray-500
                      flex-shrink-0
                      group-hover:text-gray-900
                      transition
                      duration-75
                      hover:text-white
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-3 flex-1 whitespace-nowrap">Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="
                    text-base text-gray-500
                    font-normal
                    rounded-lg
                    hover:text-white
                    flex
                    items-center
                    p-2
                    group
                  "
                >
                  <svg
                    class="
                      h-8
                      w-8 w-6
                      h-6
                      text-gray-500
                      flex-shrink-0
                      group-hover:text-gray-900
                      transition
                      duration-75
                      hover:text-white
                    "
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
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
                    <p class="text-white text-base">Storage</p>
                  </div>
                  <div class="">
                    <p>Upgrade</p>
                  </div>
                </div>

                <div class="aside-footer-footer px-2 pb-2">
                  <p class="text-white pb-4">
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
  </div>
</template>

<script>
export default {
  name: 'AsideBar'
}
</script>

<style>
</style>