<template>
  <div>
    <NavigationComponent />
    <main class="about">
      <div class="content">
        <section class="text">
          <h1>{{ fields.title }}</h1>
          <prismic-rich-text :field="fields.richContent" />
        </section>
        <prismic-image :field="fields.photo" class="img" />
      </div>
    </main>
  </div>
</template>

<script>
import NavigationComponent from "@/components/Navigation.vue";

export default {
  name: "AboutPage",
  data() {
    return {
      fields: {
        title: "",
        richContent: [],
        photo: {},
      },
    };
  },
  components: {
    NavigationComponent,
  },
  methods: {
    getContent() {
      this.$prismic.client.getSingle("about").then((document) => {
        this.fields.title = document.data.title[0].text;
        this.fields.richContent = document.data.content;
        this.fields.photo = document.data.photo;
      });
    },
  },
  created() {
    this.getContent();
  },
};
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  align-content: center;
  justify-content: center;
  background-color: #fcfcfc;
}
.content {
  max-width: 1200px;
  padding: 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "text img";
  column-gap: 80px;
  @media only screen and (max-width: 900px) {
    padding: 80px 48px;
    column-gap: 64px;
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "text"
      "img";
  }
}

.text {
  grid-area: text;
  max-width: 100%;
  font-size: 18px;
  padding: 20px;
  padding-left: 0;
  h1 {
    margin-top: 64px;
    margin-bottom: 24px;
  }
}

.img {
  grid-area: img;
  max-width: 100%;
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    margin: 0 24px;
  }
}
</style>
