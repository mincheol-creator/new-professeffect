//import router from "../../router";
import cookies from "vue-cookies";

const state = {
  token: cookies.get("token"),
};

const getters = {
  isLoggedIn: (state) => !!state.token,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

const actions = {
  logout({ commit }) {
    commit("setToken", null);
    cookies.remove("token");
    location.pathname = "/";
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
