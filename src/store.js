import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showMobileMenu: false,
    blogpreviewslatest: [],
    blogpreviewscameras: [],
    blogpreviewsfilm: [],
    blogpreviewslenses: [],
    blogpreviewsinstantcameras: [],
    blogpreviewsrepairs: [],
    blogpreviewstest: [],
  },
  mutations: {
    TOGGLE_SHOW_MOBILE_MENU(state, payload) {
      state.showMobileMenu = payload;
    },
    SET_BLOGPREVIEWSLATEST(state, payload) {
      state.blogpreviewslatest = payload;
    },
    SET_BLOGPREVIEWS_CAMERAS(state, payload) {
      state.blogpreviewscameras = payload;
    },
    SET_BLOGPREVIEWS_FILM(state, payload) {
      state.blogpreviewsfilm = payload;
    },
    SET_BLOGPREVIEWS_LENSES(state, payload) {
      state.blogpreviewslenses = payload;
    },
    SET_BLOGPREVIEWS_INSTANTCAMERAS(state, payload) {
      state.blogpreviewsinstantcameras = payload;
    },
    SET_BLOGPREVIEWS_REPAIRS(state, payload) {
      state.blogpreviewsrepairs = payload;
    },
    SET_BLOGPREVIEWS_TEST(state, payload) {
      state.blogpreviewstest = payload;
    },
  },
  actions: {
    setBlogPreviewsFromPrismic({ commit }, results) {
      if (typeof results[0] !== "undefined") {
        var tag = results[0].tags[0].toUpperCase();
        commit("SET_BLOGPREVIEWS_" + tag, results);
      } else {
        console.log("there are no results for this category");
      }
    },
    toggleShowMobileMenu({ commit }, setting) {
      if (setting) {
        commit("TOGGLE_SHOW_MOBILE_MENU", setting);
      } else {
        commit("TOGGLE_SHOW_MOBILE_MENU", !this.state.showMobileMenu);
      }
    },
  },
  getters: {},
});
