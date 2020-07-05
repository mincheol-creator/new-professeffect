<template>
  <v-app>
    <v-app-bar app color="red accent-1" dark>
      <img @click="goHome" src="./img/logo.svg" width="50px" />
      <div @click="goHome">
        <h2>떠벌림</h2>
      </div>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn" class="d-flex align-center">{{getUserName}}님 환영합니다.</div>
      <div v-else class="d-flex align-center"></div>
    </v-app-bar>

    <v-main>
      <!-- <router-link to="/">
        <v-btn>Home</v-btn>|
      </router-link>
      <router-link to="/write_goal">
        <v-btn>목표 쓰기</v-btn>
      </router-link>
      <router-link to="/complete_goal">
        <v-btn>작성 완료 페이지</v-btn>
      </router-link>
      <router-link to="/board_list">
        <v-btn>목표 게시판</v-btn>
      </router-link>-->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  created() {
    window.Kakao.init(process.env.VUE_APP_KAKAO_ID);
  },
  components: {},
  computed: {
    ...mapGetters(["getUserName", "isLoggedIn"])
  },
  data: () => ({
    //
  }),
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
/* .firebaseui-id-idp-button {
  width: 10rem;
} */
</style>
