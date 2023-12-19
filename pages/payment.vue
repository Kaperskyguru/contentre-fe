<template>
  <div>
    You're been redirected to the payment page. If not,
    <a href="#" @click.prevent="openPayment">click here.</a>
  </div>
</template>

<script>
export default {
  mounted() {
    Paddle.Setup({ vendor: Number(153088) })
    Paddle.Checkout.open({ product: 822998 })
  },

  methods: {
    openPayment() {
      Paddle.Checkout.open({ product: 822998 })
    }
  }
}
</script>

<style>
</style>
