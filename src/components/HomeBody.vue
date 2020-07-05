<template>
  <v-container style="width:75%">
    <v-row no-gutters>
      <v-col cols="12" sm="6">
        안녕하세요?
        <br />
        <br />목표달성 도우미 서비스 떠벌림입니다.
        <br />
        <br />떠벌림 효과란 자신의
        목표로 삼은 행동을 공개적으로 남들에게 알림으로써 자신이 한 일에 더
        책임을 느끼고 약속을 더 잘 지키게 되는 효과입니다.
        <br />
        <br />새해에 다짐한 목표,
        항상 생각하던 자기계발 잘 지키시지 않으신가요?
        <br />
        <br />지금 여러분의 목표를
        설정해 주세요.
        <br />
        <br />저희가 떠벌려드리겠습니다.
      </v-col>
      <v-col cols="12" sm="6">
        <img src="../img/HomeImage.jpg" width="300" height="300" alt />
      </v-col>
    </v-row>
    <br />
    <div>
      <v-btn id="goButton" @click="toWriteForm" style="width:75%">시작하기</v-btn>
    </div>
    <br />
    <div v-if="isLoggedIn">
      <v-btn id="logoutButton" @click="logout" style="width:75%">logout</v-btn>
    </div>
    <div v-else id="firebaseui-auth-container" class="d-flex flex-direction:row"></div>
  </v-container>
</template>

<script>
var firebase = require("firebase");
var firebaseui = require("firebaseui");
require("firebaseui/dist/firebaseui.css");
import cookies from "vue-cookies";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HomeBody",
  methods: {
    toWriteForm() {
      this.$router.push("/write_goal");
    },
    ...mapActions(["logout"])
  },
  mounted: function() {
    var uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      callbacks: {
        signInSuccessWithAuthResult: authResult => {
          // console.log(redirectUrl);
          // console.log(authResult.user.displayName);
          // console.log(authResult.credential.accessToken);
          //this.token = authResult.credential.accessToken;
          this.$store.commit("setToken", authResult.credential.accessToken);
          this.$store.commit("setUserName", authResult.user.displayName);
          cookies.set("token", authResult.credential.accessToken);
          cookies.set("userName", authResult.user.displayName);
          location.href = "/write_goal";
        }
      }
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  computed: mapGetters(["isLoggedIn"])
};
</script>

<style>
#goButton {
  background-color: rgba(254, 135, 123);
  color: white;
  width: 300px;
  height: 30px;
}
#logoutButton {
  background-color: rgb(102, 101, 101);
  color: white;
  width: 300px;
  height: 30px;
}
</style>
