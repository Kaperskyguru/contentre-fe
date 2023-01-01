<template>
  <main class="overflow-auto">
    <nuxt />
    <Toast />
    <!-- ------------------------------------------TESTIMONIAL------------------------ -->
    <section class="mx-auto mt-20 max-w-[80%] bg-[#FAFAFA]">
      <Testimonial />
    </section>
    <!-- -------------------------------END---OF--------TESTIMONIAL------------------------ -->

    <!-- ===========================================FAQ SECTION================================= -->
    <section>
      <FAQ />
    </section>
    <!-- ===========================================FAQ SECTION================================= -->
  </main>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Payment'
}
</script>

<style>
:root {
  --color-white: #fff;
  --color-primary-1: hsl(205, 86%, 17%);
  --color-grey-3: hsl(54, 35%, 30%);
  --color-primary-5: hsl(320, 78%, 69%);
  --color-primary-7: hsl(55, 28%, 91%);
  --color-primary-8: hsl(51, 15%, 83%);
  --color-grey-10: hsla(44, 35%, 92%, 0.705);
  --color-grey-5: hsl(51, 3%, 55%);
  --spacing: 0.1rem;

  --ff-secondary: 'Open Sans', sans-serif;
  --transition: all 0.3s linear;
}

/* ==================Navbar====================== */

nav {
  background: var(--color-white);
  box-shadow: var(--light-shadow);
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.nav-toggle {
  font-size: 1.5rem;
  color: var(--color-primary-5);
  background: transparent;
  border-color: transparent;
  transition: var(--transition);
  cursor: pointer;
  display: block;
}

.nav-toggle:hover {
  color: var(--color-primary-1);
  /* transform: rotate(90deg); */
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.links-container {
  display: flex;
  justify-content: center;
}

.links {
  height: 0;
  overflow: hidden;
  transition: var(--transition);
}

.links a {
  color: var(--color-grey-3);
  transition: var(--transition);
}

.links a:hover {
  background: var(--color-primary-8);
  color: var(--color-primary-5);
  padding-left: 1.5rem;
}

.social-icons {
  display: none;
}

.show-links {
  height: 10rem;
}
html,
body,
#__nuxt,
#__layout,
#__app {
  @apply h-auto overflow-auto;
}

/* ============End======Navbar====================== */

/* ===============media querry============================*/

@media screen and (min-width: 800px) {
  .nav-center {
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .logo {
    font-size: 1.8rem;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .nav-header {
    padding: 0;
  }

  .nav-toggle {
    display: none;
  }

  .links {
    height: auto;
    display: flex;
  }

  .links a {
    /* padding: 0;
    margin: 0 0.5rem; */
  }

  .links a:hover {
    padding: 0;
    background: transparent;
  }

  .social-icons {
    display: flex;
  }

  .social-icons a {
    margin: 0 0.5rem;
    color: var(--color-primary-5);
    transition: var(--transition);
  }

  .social-icons a:hover {
    color: var(--color-primary-7);
  }
}
</style>