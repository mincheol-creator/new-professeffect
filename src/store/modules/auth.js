//import router from "../../router";
import cookies from "vue-cookies";

const state = {
  token: cookies.get("token"),
  userName: cookies.get("userName"),
};

const getters = {
  //state 값을 확인하는 거
  isLoggedIn: (state) => !!state.token,
  getUserName: (state) => state.userName,
};

const mutations = {
  //state 값 변경하는거
  setToken(state, token) {
    state.token = token;
  },
  setUserName(state, inputUserName) {
    state.userName = inputUserName;
  },
};

const actions = {
  logout({ commit }) {
    commit("setToken", null);
    cookies.remove("token");
    cookies.remove("userName");
    location.pathname = "/";
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
