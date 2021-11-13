<template>
  <footer>
    <div class="icons">
      <a href="https://www.instagram.com/don_rigoberto/" rel="noopener">
        <mdicon name="instagram" size="18" class="icon" />
      </a>
    </div>
    <p>
      Made with love by
      <a href="https://www.claudiaengelsman.com/" rel="noopener" class="credit">Claudia Engelsman</a>
    </p>
  </footer>
</template>

<script>
  export default {
    name: "FooterComponent",
    components: {},
  };
</script>

<style scoped lang="scss">
  footer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: rgba(0, 0, 0, 1);
    &:hover {
      .icon {
        color: rgba(0, 0, 0, 0.35);
        &:hover {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    .icons {
      display: flex;
      justify-content: center;
      margin: 40px 0;
    }
    .icon {
      margin: 4px;
      color: rgba(0, 0, 0, 1);
      transition: all 0.25s ease-in-out;
    }
    p {
      font-family: "Josefin Sans", Arial, sans-serif;
      color: rgba(0, 0, 0, 0.75);
      text-align: center;
      font-size: 12px;
      margin: 48px;
    }
    .credit {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }
  }
</style>
