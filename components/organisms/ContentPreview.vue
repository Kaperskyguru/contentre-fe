<template>
  <div id="modal" class="w-full">
    <!-- Modal content -->
    <div class="w-full">
      <div
        class="
          overflow-y-auto
          w-full
          h-screen
          bg-white
          transition
          duration-300
          ease-in
          border-r-2 border-gray-300
        "
      >
        <div class="flex flex-wrap justify-between py-4 pr-12 pl-8 w-full">
          <!--next page modal button-->
          <a href="next-page.html" type="button" class="text-gray-500">
            <i class="fas fa-expand-alt"></i>
            <span class="ml-2 md:ml-2">Open as page</span>
          </a>

          <!--Close modal button-->
          <button
            id="closebutton"
            type="button"
            class="focus:outline-none"
            @click.prevent="$emit('close')"
          >
            <!-- Hero icon - close button -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div class="p-12 bg-white">
          <div class="space-y-2 page-title">
            <div class="flex flex-wrap items-center mb-6 space-x-1 md:mb-0">
              <span class="relative top-2">
                <svg
                  class="mx-auto feather feather-image"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10=4"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </span>
              <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
                >Add Image Cover</span
              >
            </div>

            <h1 class="text-2xl font-bold">What exactly is Web 3?</h1>
          </div>

          <!-- Test content -->
          <div class="my-6 md:justify-between md:items-center">
            <div class="flex flex-wrap items-center mb-6 space-x-2 md:mb-0">
              <span class="relative text-gray-500">
                <i
                  class="bg-gray-400 fas fa-calendar-alt"
                  style="font-size: 12px"
                ></i>
              </span>
              <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
                >Created</span
              >
            </div>
            <div
              class="relative gap-2 text-xs"
              style="margin-left: 8rem; margin-top: -25px"
            >
              <div class="inline-flex items-center space-x-2 text-black">
                <span>November 13, 2021 | 04:39pm</span>
              </div>
            </div>
          </div>
          <div class="my-6 md:justify-between md:items-center">
            <div class="flex flex-wrap items-center mb-6 space-x-2 md:mb-0">
              <span class="relative text-gray-500">
                <i class="fas fa-tag" style="font-size: 12px"></i>
              </span>
              <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
                >Tags</span
              >
            </div>
            <div
              class="relative gap-2 text-xs"
              style="margin-left: 8rem; margin-top: -25px"
            >
              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-blue-200
                  rounded
                  text-dark
                "
              >
                <span>Tech</span>
              </div>

              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-gray-500
                  rounded
                  text-dark
                "
              >
                <span>Internet</span>
              </div>

              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-pink-200
                  rounded
                  text-dark
                "
              >
                <span>Web</span>
              </div>

              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-blue-100
                  rounded
                  text-dark
                "
              >
                <span>Blockchain</span>
              </div>

              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-gray-400
                  rounded
                  text-dark
                "
              >
                <span>Metaverse</span>
              </div>
            </div>
          </div>
          <div class="my-6 md:justify-between md:items-center">
            <div class="flex flex-wrap items-center mb-6 space-x-2 md:mb-0">
              <span class="relative text-gray-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-4 h-4"
                  style=""
                >
                  <g>
                    <path
                      d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"
                    ></path>
                    <path
                      d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"
                    ></path>
                  </g>
                </svg>
              </span>
              <span class="mr-4 text-sm font-normal text-gray-500 md:mr-6"
                >Channels</span
              >
            </div>
            <div
              class="relative gap-2 text-xs"
              style="margin-left: 8rem; margin-top: -25px"
            >
              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-blue-200
                  rounded
                  text-dark
                "
              >
                <span>Medium</span>
              </div>

              <div
                class="
                  inline-flex
                  items-center
                  px-2
                  space-x-2
                  bg-blue-100
                  rounded
                  text-dark
                "
              >
                <span>Zikoko</span>
              </div>
            </div>
          </div>
        </div>
        <div class="px-12">
          <p>
            To understand what Web 3 is, we first have to understand the
            previous versions of the Internet. The first phase of the Internet
            and can be characterized by the way users initially interacted with
            the web. Most users, during the first iteration of the web, were
            passive consumers of content. In other words, Web 1.0 was about
            reading and not writing. It was static instead of dynamic. This
            changed with Web 2.0. To understand what Web 3 is, we first have to
            understand the previous versions of the Internet. The first phase of
            the Internet and can be characterized by the way users initially
            interacted with the web. Most users, during the first iteration of
            the web, were passive consumers of content. In other words, Web 1.0
            was about reading and not writing. It was static instead of dynamic.
            This changed with Web 2.0. To understand what Web 3 is, we first
            have to understand the previous versions of the Internet. The first
            phase of the Internet and can be characterized by the way users
            initially interacted with the web. Most users, during the first
            iteration of the web, were passive consumers of content. In other
            words, Web 1.0 was about reading and not writing. It was static
            instead of dynamic. This changed with Web 2.0. To understand what
            Web 3 is, we first have to understand the previous versions of the
            Internet. The first phase of the Internet and can be characterized
            by the way users initially interacted with the web. Most users,
            during the first iteration of the web, were passive consumers of
            content. In other words, Web 1.0 was about reading and not writing.
            It was static instead of dynamic. This changed with Web 2.0. To
            understand what Web 3 is, we first have to understand the previous
            versions of the Internet. The first phase of the Internet and can be
            characterized by the way users initially interacted with the web.
            Most users, during the first iteration of the web, were passive
            consumers of content. In other words, Web 1.0 was about reading and
            not writing. It was static instead of dynamic. This changed with Web
            2.0. To understand what Web 3 is, we first have to understand the
            previous versions of the Internet. The first phase of the Internet
            and can be characterized by the way users initially interacted with
            the web. Most users, during the first iteration of the web, were
            passive consumers of content. In other words, Web 1.0 was about
            reading and not writing. It was static instead of dynamic. This
            changed with Web 2.0. To understand what Web 3 is, we first have to
            understand the previous versions of the Internet. The first phase of
            the Internet and can be characterized by the way users initially
            interacted with the web. Most users, during the first iteration of
            the web, were passive consumers of content. In other words, Web 1.0
            was about reading and not writing. It was static instead of dynamic.
            This changed with Web 2.0. To understand what Web 3 is, we first
            have to understand the previous versions of the Internet. The first
            phase of the Internet and can be characterized by the way users
            initially interacted with the web. Most users, during the first
            iteration of the web, were passive consumers of content. In other
            words, Web 1.0 was about reading and not writing. It was static
            instead of dynamic. This changed with Web 2.0.
          </p>
        </div>
      </div>
    </div>
    <!-- end of card title -->
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>