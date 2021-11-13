<template>
  <div class="navbar">
    <router-link to="/" class="logo-section">
      <img src="../assets/Logo3.png" alt="the Bikes & I" class="logo" />
    </router-link>
    <nav class="nav-links" :class="showMenu ? 'show' : ''">
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/category/cameras" class="nav-link">Cameras</router-link>
      <router-link to="/category/film" class="nav-link">Film</router-link>
      <router-link to="/category/lenses" class="nav-link">Lenses</router-link>
      <router-link to="/category/instantcameras" class="nav-link">Instant Cameras</router-link>
      <router-link to="/category/repairs" class="nav-link">Repairs</router-link>
    </nav>
    <div class="social">
      <a href="https://www.instagram.com/don_rigoberto/" rel="noopener" target="_blank">
        <mdicon name="instagram" size="18" class="icon" />
      </a>
    </div>
    <div class="nav-icon" @click="toggleShowMobileMenu()" :class="showMenu ? 'open' : ''" title="toggle mobile menu">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "NavigationComponent",
    data() {
      return {};
    },
    components: {},
    methods: {
      ...mapActions(["toggleShowMobileMenu"]),
    },
    computed: {
      showMenu() {
        return this.$store.state.showMobileMenu;
      },
    },
  };
</script>

<style scoped lang="scss">
  .navbar {
    display: grid;
    grid-template-columns: auto 3fr auto;
    grid-template-areas: "logo links social";
    justify-content: flex-end;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 80px;
    background-color: #fcfcfc;
    z-index: 9000;
    @media only screen and (max-width: 768px) {
      grid-template-columns: 3fr auto;
      grid-template-rows: auto auto;
      grid-template-areas:
        "logo toggle"
        "links links";
      position: sticky;
      top: 0;
      background-color: white;
      padding: 4px 40px;
    }
  }

  .logo-section {
    grid-area: logo;
    margin-right: auto;
    @media only screen and (max-width: 768px) {
      margin-right: unset;
      text-align: center;
    }
  }

  .logo {
    width: 120px;
    height: auto;
    @media only screen and (max-width: 768px) {
      width: 72px;
      // offset the menu icon width for true centering of logo
      margin-left: 36px;
    }
  }

  nav {
    grid-area: links;
    font-family: "Josefin Sans", Arial, sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    a {
      margin: 6px 12px;
      text-decoration: none;
      color: rgba(0, 0, 0, 1);
      -webkit-transition: all 0.3s ease-out;
      -moz-transition: all 0.3s ease-out;
      -o-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
    }
    a:hover {
      color: rgba(0, 0, 0, 0.35);
    }
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      background-color: white;
      width: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: -100%;
      right: 0;
      transition: left, 0.4s ease-in-out;
      padding: 36px;
      box-sizing: border-box;
      &.show {
        left: 0;
      }
      a {
        margin: 12px;
      }
    }
  }

  .social {
    grid-area: social;
    color: rgba(0, 0, 0, 1);
    margin-left: 24px;
    // Padding bottom to get the svgs to vertically align with the rest of navbar
    padding-bottom: 5px;
    &:hover {
      .icon {
        color: rgba(0, 0, 0, 0.35);
        &:hover {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    a {
      display: inline-block;
      margin: 4px 0;
    }
    .icon {
      margin: 4px;
      color: rgba(0, 0, 0, 1);
      transition: all 0.3s ease-in-out;
    }
    @media only screen and (max-width: 768px) {
      display: none;
    }
  }

  .nav-icon {
    grid-area: toggle;
    width: 36px;
    height: 18px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
    display: none;
    @media only screen and (max-width: 768px) {
      display: block;
    }
  }

  .nav-icon span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #000000;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  .nav-icon span:nth-child(1) {
    top: 0px;
  }

  .nav-icon span:nth-child(2),
  .nav-icon span:nth-child(3) {
    top: 9px;
  }

  .nav-icon span:nth-child(4) {
    top: 18px;
  }

  .nav-icon.open span:nth-child(1) {
    top: 9px;
    width: 0%;
    left: 50%;
  }

  .nav-icon.open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .nav-icon.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .nav-icon.open span:nth-child(4) {
    top: 12px;
    width: 0%;
    left: 50%;
  }
</style>
