<template>
  <header class="flex items-center py-1 px-4 bg-white md:px-6">
    <div
      class="
        inline-flex
        py-2
        px-0.5
        -m-0.5
        leading-none
        rounded
        outline-none
        focus-visible:ring-2
        ring-offset-2
        transition-all
      "
    >
      <Hyperlink to="/" class="flex items-center font-bold lg:ml-2.5">
        <img
          src="~/assets/img/Concentre.io-iconpng.png"
          class="h-12"
          alt="contentre logo"
        />
        <span class="self-center whitespace-nowrap">Contentre</span>
      </Hyperlink>
    </div>
    <template v-if="user">
      <nav
        class="
          hidden
          flex-1
          items-center
          md:flex md:mx-6 md:space-x-1
          lg:mx-16 lg:space-x-4
          xl:space-x-6
        "
      ></nav>

      <div class="flex-auto pl-3 md:hidden" />

      <!-- <NotificationDropdown
        class="mr-1 md:mr-3 lg:mr-5"
        :items="notifications"
        @item-click="$emit('notification-click', $event)"
        @clear-all-notifications="$emit('clear-all-notifications')"
      /> -->

      <UserDropdown :user="user" @logout="$emit('logout')" />
    </template>
  </header>
</template>

<script>
export default {
  name: 'MyHeader',
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
</style>