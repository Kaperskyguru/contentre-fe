<template>
  <div>
    <AuthNavBar />
    <b-container id="auth_wrapper" fluid>
      <b-row>
        <b-col id="backdrop__container">
          <div class="backdrop__container__text__wrapper">
            <b-container>
              <h1 class="gilroy-bold">
                Paste your Author Link and get all your contents in one place.
              </h1>
              <p class="gilroy-medium">
                Save all your writings and articles in one platform and view the
                statistics.
              </p>
            </b-container>
          </div>
        </b-col>
        <b-col id="auth__content">
          <b-container>
            <b-row>
              <b-col lg="9">
                <Nuxt />
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style>
@font-face {
  src: url('~assets/fonts/Helvetica/Helvetica-Bold.ttf');
  font-family: 'Helvetica-Bold';
}

@font-face {
  src: url('~assets/fonts/Gilroy/Gilroy-Bold.ttf');
  font-family: 'Gilroy-Bold';
}

@font-face {
  src: url('~assets/fonts/Gilroy/Gilroy-Medium.ttf');
  font-family: 'Gilroy-Medium';
}

@font-face {
  src: url('~assets/fonts/Gilroy/Gilroy-Regular.ttf');
  font-family: 'Gilroy-Regular';
}

.helvetica-bold {
  font-family: 'Helvetica-Bold', sans-serif;
}

.gilroy-bold {
  font-family: 'Gilroy-Bold', sans-serif;
}

.gilroy-medium {
  font-family: 'Gilroy-Medium', sans-serif;
}

.gilroy-regular {
  font-family: 'Gilroy-Regular', sans-serif;
}
</style>
<style scoped>
#auth_wrapper {
  min-height: 100vh;
  width: 100%;
}

#backdrop__container {
  background: url('~assets/img/auth-nav/backdrop.svg') no-repeat center;
  background-size: cover;
  min-height: 100vh;
}

.backdrop__container__text__wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40vh;
  padding-left: 10%;
  padding-right: 10%;
}

.backdrop__container__text__wrapper h1 {
  font-size: 40px;
  line-height: 52px;
  color: white;
}

.backdrop__container__text__wrapper p {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 1px;
  color: white;
}

#auth__content {
  margin-top: 150px;
}
</style>
