<template>
  <div class="p-5"/>
</template>

<script>
import {GET_CURRENT_USER, USE_EMAIL_CODE} from '~/graphql'

export default {
  name: 'VerifyEmail',

  async mounted() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('token');
      console.log(code)
      await this.$apollo.mutate({
        mutation: USE_EMAIL_CODE,
        variables: {
          code,
        },
        update: (cache, {data: {loginUser}}) => {
          cache.writeQuery({
            query: GET_CURRENT_USER,
            data: {getCurrentUser: loginUser}
          })

          // this.$pusher.subscribe(`presence-online-${loginUser?.id}`)
        }
      })

      alert('Verified successfully!')

      await this.$router.push('/dashboard')
    } catch (error) {
      this.$toast.negative(error.message)
      this.sending = false
    }
  },

  data: () => ({
    sending: false,
  }),
}
</script>

<style scoped>
</style>
