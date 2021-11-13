<template>
  <div id="app">
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import "./assets/main.scss";
import FooterComponent from "./components/Footer.vue";

export default {
  components: {
    FooterComponent,
  },
};
</script>

<style lang="scss"></style>
