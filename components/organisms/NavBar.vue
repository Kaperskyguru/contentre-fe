<template>
  <div id="auth-nav-bar__wrapper">
    <div id="auth-nav-bar">
      <img src="~/assets/img/Logo.svg" :alt="appName"/>
      <div class="links">
        <NuxtLink v-for="link in links" :key="link.text" :to="link.to" class="helvetica-bold navbar-link">
          <div>
            <img :src="link.icon" :alt="link.text"/>
            <span>{{ link.text.toUpperCase() }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardIcon from "~/assets/img/auth-nav/Dashboard.svg";
import ProfileIcon from "~/assets/img/auth-nav/Profile.svg";
import SignUpIcon from "~/assets/img/auth-nav/Sign_up.svg";
import SignInIcon from "~/assets/img/auth-nav/Sign_in.svg";

export default {
  name: "NavBar",
  data: () => ({
    appName: "",
    links: [
      {
        text: "Dashboard",
        to: "/dashboard",
        icon: DashboardIcon,
      },
      {
        text: "Profile",
        to: "/profile",
        icon: ProfileIcon,
      },
      {
        text: "Sign Up",
        to: "/",
        icon: SignUpIcon,
      },
      {
        text: "Sign In",
        to: "/sign-in",
        icon: SignInIcon,
      },
    ]
  }),
  mounted() {
    this.appName = process.env.NUXT_APP
  }
}
</script>

<style scoped>
#auth-nav-bar__wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: 30px;
  left: 0;
}
.navbar-link {
  font-size: 10px;
  color: #2D3748;
  text-decoration: none;
}
.links {
  display: flex;
  align-items: center;
}
.navbar-link > div {
  display: inline-flex;
  align-items: center;
  margin-right: 30px;
}
.links img {
  margin-right: 5px;
}
#auth-nav-bar {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%);
  border: 1.5px solid #FFFFFF;
  box-shadow: 0px 7px 23px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(21px);
  /* Note: backdrop-filter has minimal browser support */
  padding: 30px 20px 30px 20px;
  width: 80vw;
  max-width: 980px;
  min-width: 500px;
  border-radius: 15px;
}
</style>
