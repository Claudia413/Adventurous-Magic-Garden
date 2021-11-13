<template>
  <div>
    <NavigationComponent />
    <div class="blog">
      <vue-headful
        :title="blog.seo_title"
        :description="blog.seo_description"
        :image="blog.seo_image"
        :url="'/blog' + blog.uid"
      />
      <article>
        <p class="publish-date">{{ blog.first_publication_date }}</p>
        <h1 class="title">{{ blog.title[0].text }}</h1>
        <section
          v-for="(slice, index) in slices"
          :key="'slice-' + index"
          :class="
            slice.slice_type +
            (slice.primary.image_on_right ? ' image-on-right' : '') +
            (slice.slice_type === 'carousel' ? ' full-image' : '')
          "
        >
          <template v-if="slice.slice_type === 'text1'">
            <prismic-rich-text :field="slice.primary.text" class="text" />
          </template>
          <template v-else-if="slice.slice_type === 'picture'">
            <prismic-image :field="slice.primary.picture" class="blog-image" />
            <prismic-rich-text :field="slice.primary.caption" class="blog-image-caption" />
          </template>
          <template v-else-if="slice.slice_type === 'text_with_image'">
            <prismic-image :field="slice.primary.image" class="blog-image-next-text" />
            <prismic-rich-text :field="slice.primary.text" class="blog-text-next-image" />
          </template>
          <template v-else-if="slice.slice_type === 'shoot_stats'">
            <span class="shoot-stat">
              <mdicon name="film" class="ride-stat-icon" />
              {{ slice.primary.film_stock[0].text }}
            </span>
            <span class="shoot-stat">
              <mdicon name="cameraIris" class="ride-stat-icon" title="My tip" />
              {{ slice.primary.lens[0].text }}
            </span>
            <span class="shoot-stat">
              <mdicon name="cameraBurst" class="ride-stat-icon" />
              {{ slice.primary.shots[0].text }}
            </span>
          </template>
          <template v-else-if="slice.slice_type === 'carousel'">
            <cat-carousel
              :items="slides"
              :item-per-page="1"
              :indicators-config="{
                activeColor: '#444',
                size: 10,
                color: '#eaeaea',
                hideIndicators: false,
              }"
            >
              <template slot="prev-navigation" slot-scope="{ prev }">
                <div class="custom-navigation" @click="prev">
                  <mdicon name="chevronLeft" />
                </div>
              </template>
              <template slot="item" slot-scope="{ data, index }">
                <div :key="index" class="item">
                  <prismic-image :field="data.slide_image" class="blog-image" />
                </div>
              </template>
              <template slot="next-navigation" slot-scope="{ next }">
                <div class="custom-navigation" @click="next">
                  <mdicon name="chevronRight" size="24" />
                </div>
              </template>
            </cat-carousel>
          </template>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import NavigationComponent from "@/components/Navigation.vue";

  export default {
    name: "BlogPost",
    data() {
      return {
        blog: {
          title: [{ text: "" }],
          labels: [],
          prismicID: "",
          uid: "",
          first_publication_date: "",
          seo_title: "",
          seo_description: "",
          seo_image: "",
        },
        slices: [],
        slides: [],
      };
    },
    components: {
      NavigationComponent,
    },
    methods: {
      getContent(uid) {
        this.$prismic.client.getByUID("blogpost", uid).then((document) => {
          console.log("what do we get back", document);
          // Can't simply put the result in an empty blog object without console erros about undefined before its done loading. So we set them individually with starting empty objects and arrays
          this.blog.title = document.data.blog_title;
          this.blog.first_publication_date = moment(document.first_publication_date).format("MMMM Do YYYY");
          this.blog.labels = document.tags;
          this.blog.seo_title = document.data.seo_title[0].text;
          this.blog.seo_description = document.data.seo_description[0].text;
          this.blog.seo_image = document.data.seo_image.url;
          this.slices = document.data.body;
          this.blog.prismicID = document.id;
          var that = this;
          this.slices.forEach(function (slice) {
            // find carousel slice if present and create data the carousel plugin will accept
            if (slice.slice_type === "carousel") {
              that.slides = slice.items;
            }
          });
        });
      },
    },
    created() {
      this.getContent(this.$route.params.uid);
      this.blog.uid = this.$route.params.uid;
    },
    beforeRouteUpdate(to, from, next) {
      //   This prevents blog page not updating upon route change
      this.getContent(to.params.uid);
      next();
    },
  };
</script>

<style lang="scss" scoped>
  .blog {
    padding: 80px;
    display: flex;
    justify-content: center;
  }

  article {
    max-width: 1200px;
  }

  .title,
  .publish-date {
    text-align: center;
    font-family: "Baskervville", Georgia, "Times New Roman", Times, serif;
  }

  .title {
    font-weight: 400;
    font-size: 42px;
    line-height: 50px;
  }

  .publish-date {
    color: RGBA(20, 20, 20, 0.5);
    font-size: 13px;
    font-style: italic;
  }
  .picture {
    display: flex;
    flex-direction: column;
    padding: 0 10%;
  }
  .blog-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-top: 20px;
  }

  .text {
    ul,
    ol {
      font-size: 16px;
    }
  }

  .blog-image-caption {
    font-size: 12px;
    line-height: 20px;
    padding-top: 8px;
    margin-bottom: 20px;
    p {
      margin: 0;
      padding: 0;
    }
  }

  .shoot_stats {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin: 64px 0;
  }

  .shoot-stat {
    margin: 8px;
    display: flex;
    align-items: center;
    &:nth-child(1) {
      margin: 8px 0;
    }
    .shoot-stat-icon {
      margin-right: 8px;
      height: 24px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 13px;
    }
  }

  .text_with_image {
    display: flex;
    justify-content: space-between;
    &.image-on-right {
      flex-direction: row-reverse;
      @media only screen and (max-width: 768px) {
        flex-direction: column;
      }
    }
    .blog-image-next-text {
      margin-top: 20px;
      max-width: 48%;
      height: auto;
      object-fit: cover;
    }
    .blog-text-next-image {
      max-width: 48%;
      height: auto;
      margin-top: 20px;
    }
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      .blog-image-next-text {
        max-width: 80%;
        margin-left: 10%;
        margin-bottom: 20px;
      }
      .blog-text-next-image {
        max-width: 100%;
      }
    }
  }

  .carousel {
    margin-top: 40px;
    .item {
      width: 100%;
      height: 500px;
      max-height: 800px;
      object-fit: cover;
      @media only screen and (max-width: 768px) {
        max-height: 320px;
      }
      img {
        height: 100%;
      }
    }
    .custom-navigation {
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      cursor: pointer;
    }
  }
</style>
