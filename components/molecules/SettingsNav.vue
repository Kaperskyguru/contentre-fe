<template>
  <div class="px-4 my-8 pt-4 space-y-6">
    <Hyperlink
      :to="{ name: 'settings' }"
      class="
        flex
        items-center
        justify-between
        font-semibold
        text-gray-900 text-sm text-center
        py-2
        px-4
        hover:shadow-lg
        bg-white
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-10
            w-10
            text-black text-2xl
            bg-blue-100
            mr-2
          "
        >
          <i class="fas fa-shield-alt"></i>
        </div>
        <div>
          <span class="flex">Security</span>
          <span class="block text-teal-600 text-xs"
            >Login, Change Password,2FA</span
          >
        </div>
      </div>
      <span class="text-black">
        <i class="fas fa-chevron-right"></i>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/notifications' }"
      class="
        flex
        items-center
        justify-between
        font-semibold
        text-gray-900 text-sm text-center
        py-2
        px-4
        hover:shadow-lg
        bg-white
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-10
            w-10
            text-black text-2xl
            bg-blue-100
            mr-2
          "
        >
          <i class="far fa-bell"></i>
        </div>
        <div>
          <span class="flex">Notification</span>
          <span class="block text-teal-600 text-xs"
            >Control your notifications</span
          >
        </div>
      </div>
      <span class="text-black">
        <i class="fas fa-chevron-right"></i>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/apps' }"
      class="
        flex
        items-center
        justify-between
        font-semibold
        text-gray-900 text-sm
        py-2
        px-4
        hover:shadow-lg
        bg-white
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-10
            w-10
            text-black text-2xl
            bg-blue-100
            mr-2
          "
        >
          <i class="fas fa-th-large"></i>
        </div>
        <div>
          <span class="flex">Connected Apps</span>
          <span class="block text-teal-600 text-xs"
            >You can connect directly and upload comments at once</span
          >
        </div>
      </div>
      <span class="text-black">
        <i class="fas fa-chevron-right"></i>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/connects' }"
      class="
        flex
        items-center
        justify-between
        font-semibold
        text-gray-900 text-sm text-center
        py-2
        px-4
        hover:shadow-lg
        bg-white
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-10
            w-10
            text-black text-2xl
            bg-blue-100
            mr-2
          "
        >
          <i class="fas fa-share-alt"></i>
        </div>
        <div>
          <span class="flex">Connect</span>
          <span class="block text-teal-600 text-xs"
            >Share and invite friends</span
          >
        </div>
      </div>
      <span class="text-black">
        <i class="fas fa-chevron-right"></i>
      </span>
    </Hyperlink>

    <Hyperlink
      :to="{ name: 'settings/accounts' }"
      class="
        flex
        items-center
        justify-between
        font-semibold
        text-gray-900 text-sm text-center
        py-2
        px-4
        hover:shadow-lg
        bg-white
      "
    >
      <div class="flex items-center">
        <div
          class="
            inline-flex
            flex-shrink-0
            items-center
            justify-center
            h-10
            w-10
            text-black text-2xl
            bg-blue-100
            mr-2
          "
        >
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div>
          <span class="flex">Account Settings</span>
          <span class="flex text-teal-600 text-xs">Delete account</span>
        </div>
      </div>
      <span class="text-black">
        <i class="fas fa-chevron-right"></i>
      </span>
    </Hyperlink>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>