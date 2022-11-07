<template>
  <div class="w-full h-full bg-white rounded-md">
    <div class="flex flex-col items-center p-6 h-[70%] bg-blue-50">
      <div class="p-10">
        <h1 class="text-3xl text-center"><slot /></h1>
      </div>
      <div class="">
        <img src="~/assets/img/upgrade_resume.png" alt="" />
      </div>
    </div>
    <div class="p-10">
      <div class="text-center">
        <small class="text-lg">
          To create unlimited contents, portfolios, proposals, content briefs,
          and cover letters please upgrade to Contentre Pro.</small
        >
      </div>

      <div class="grid flex-1 grid-cols-2 gap-3 mt-6 w-full">
        <Button
          appearance="outline"
          class="
            flex
            justify-center
            items-center
            font-medium
            rounded-lg
            transition
            duration-500
          "
          @click.prevent="$emit('back')"
          >Not Yet</Button
        >
        <Button
          :to="`/subscriptions?tab=Plan&source=${from}`"
          type="link"
          class="
            flex
            justify-center
            items-center
            py-2
            px-4
            font-medium
            rounded-lg
          "
          >Upgrade</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    from: {
      type: String,
      default: 'upgrade'
    }
  }
}
</script>

<style scoped>
</style>