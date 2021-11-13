<template>
  <div class="home">
    <NavigationComponent />
    <section
      v-for="(slice, index) in slices"
      :key="'slice-' + index"
      :class="slice.slice_type"
    >
      <template v-if="slice.slice_type === 'most_recent_posts'">
        <div class="recent-reel">
          <div
            v-for="(post, index) in latestBlogs"
            :key="'post-' + index"
            class="post"
          >
            <router-link :to="'/blog/' + post.uid"
              ><prismic-image :field="post.data.cover_image" class="post-img"
            /></router-link>
            <p class="publish-date">
              {{ readableDate(post.first_publication_date) }}
            </p>
            <h3 class="title">
              <router-link :to="'/blog/' + post.uid">
                {{ post.data.blog_title[0].text }}
              </router-link>
            </h3>
          </div>
        </div>
      </template>

      <template v-else-if="slice.slice_type === 'parallax'">
        <Parallax
          :parallax="true"
          :speedFactor="0.35"
          breakpoint="(min-width: 250px)"
          :sectionHeight="40"
        >
          <prismic-image :field="slice.primary.photo" />
        </Parallax>
      </template>

      <template v-else-if="slice.slice_type === 'posts_per_category'">
        <h2
          v-if="slice.primary.category == 'instantcameras'"
          class="category-title"
        >
          Instant Cameras
        </h2>
        <h2 v-else class="category-title title">
          {{ slice.primary.category | capitalize }}
        </h2>
        <cat-carousel
          :items="previews[slice.primary.category]"
          :item-per-page="3"
          :indicators-config="{
            activeColor: '#444',
            size: 10,
            color: '#eaeaea',
            hideIndicators: true,
          }"
        >
          <template
            v-if="previews[slice.primary.category].length > 3"
            slot="prev-navigation"
            slot-scope="{ prev }"
          >
            <div class="custom-navigation" @click="prev">
              <mdicon name="chevronLeft" />
            </div>
          </template>

          <template slot="item" slot-scope="{ data, index }">
            <div :key="index" class="post">
              <router-link :to="'/blog/' + data.uid">
                <prismic-image
                  :field="data.data.cover_image"
                  class="post-img"
                />
              </router-link>
              <h3 class="title">
                <router-link :to="'/blog/' + data.uid">
                  {{ data.data.blog_title[0].text }}
                </router-link>
              </h3>
              <prismic-rich-text :field="data.data.teaser" class="teaser" />
              <p class="publish-date">
                {{ readableDate(data.first_publication_date) }}
              </p>
            </div>
          </template>

          <template slot="next-navigation" slot-scope="{ next }">
            <div class="custom-navigation" @click="next">
              <mdicon
                v-if="previews[slice.primary.category].length > 3"
                name="chevronRight"
                size="24"
              />
            </div>
          </template>
        </cat-carousel>
      </template>
    </section>
  </div>
</template>

<script>
import NavigationComponent from "@/components/Navigation.vue";
import moment from "moment";
import Parallax from "vue-parallaxy";

export default {
  name: "HomePage",
  components: {
    NavigationComponent,
    Parallax,
  },
  data() {
    return {
      slices: [],
      latestBlogs: {},
      previews: {
        cameras: [],
        film: [],
        lenses: [],
        instantcameras: [],
        repairs: [],
      },
    };
  },
  methods: {
    getContent() {
      this.$prismic.client.getSingle("homepage").then((document) => {
        this.slices = document.data.body;
        var that = this;
        this.slices.forEach(function (slice) {
          // for each category slice we'll need to get the content per category
          if (slice.slice_type === "posts_per_category") {
            that.getCategoryContent(slice.primary.category);
          } else if (slice.slice_type === "most_recent_posts") {
            that.getMostRecentContent();
          }
        });
      }),
        (reason) => {
          console.log(
            "uh-oh something went wrong retrieving content! =( , ",
            reason
          );
        };
    },
    getCategoryContent(category, pageNumber) {
      this.$prismic.client
        .query(
          [
            this.$prismic.Predicates.at("document.type", "blogpost"),
            this.$prismic.Predicates.at("document.tags", [category]),
          ],
          {
            orderings: "[document.first_publication_date desc]",
            pageSize: 5,
            page: pageNumber,
            fetch: [
              "blogpost.blog_title",
              "blogpost.teaser",
              "blogpost.cover_image",
            ],
          }
        )
        .then((response) => {
          if (response.results.length > 0) {
            var category = response.results[0].tags[0];
            this.previews[category] = response.results;
          }
        });
    },
    getMostRecentContent() {
      this.$prismic.client
        .query(
          [
            this.$prismic.Predicates.at("document.type", "blogpost"),
            this.$prismic.Predicates.not("document.tags", ["test"]),
          ],
          {
            orderings: "[document.first_publication_date desc]",
            pageSize: 4,
            fetch: ["blogpost.blog_title", "blogpost.cover_image"],
          }
        )
        .then((response) => {
          this.latestBlogs = response.results;
        });
    },
    readableDate(date) {
      return moment(date).format("MMMM Do, YYYY");
    },
    selectedPreviews(category, sideToShow) {
      if (sideToShow === 1) {
        return this.previews[category].filter(function (post, index) {
          return index < 3;
        });
      } else {
        return this.previews[category].filter(function (post, index) {
          return index >= 3;
        });
      }
    },
  },
  created() {
    this.getContent();
  },
};
</script>

<style lang="scss" scoped>
.most_recent_posts,
.posts_per_category {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 80px;
  @media only screen and (max-width: 768px) {
    padding: 0 40px;
  }
}

.recent-reel {
  display: flex;
  justify-content: space-between;
  h3 {
    font-size: 14px;
  }
  .publish-date {
    margin: 0;
  }
  .post {
    width: 20%;
    min-width: unset;
    @media only screen and (max-width: 768px) {
      width: 30%;
    }
    &:last-child {
      @media only screen and (max-width: 768px) {
        display: none;
      }
    }
  }
  .post-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
}

.parallax {
  width: 100%;
  height: 500px;
  object-fit: cover;
  overflow: hidden;
  @media only screen and (max-width: 768px) {
    height: 350px;
  }
}

.category-title {
  font-family: "Josefin Sans", Arial, sans-serif;
  font-size: 18px;
  line-height: 28px;
  font-weight: 400;
}

.post {
  &.extra {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba($color: #000000, $alpha: 0.7);
    h3 {
      transition: all 0.2s ease-in-out;
    }
    h3:hover {
      color: black;
      cursor: pointer;
    }
  }
}

.post-img {
  width: 100%;
  max-height: 240px;
  object-fit: cover;
}

h3 {
  font-size: 20px;
  font-weight: 400;
  margin-block-start: 0;
  margin-block-end: 0;
  margin: 4px 0 8px 0;
  a {
    text-decoration: none;
    color: black;
  }
}

p {
  &.publish-date {
    font-size: 13px;
    color: rgba($color: #000000, $alpha: 0.7);
  }
}

.custom-navigation {
  cursor: pointer;
}
</style>
