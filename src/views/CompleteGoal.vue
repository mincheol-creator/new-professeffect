<template>
  <v-container>
    <v-card class="d-inline-block mx-auto" id="capture">
      <v-navigation-drawer :width="width" :value="true" stateless>
        <v-img :aspect-ratio="16 / 9" :src="getSelectList.src">
          <v-row align="end" class="lightbox white--text pa-2 fill-height">
            <v-col>
              <div class="subheading">{{ getTitle }}</div>
              <div class="body-1">{{ getSelectList.comment }}</div>
              <div class="body-1">{{ getDate }}</div>
            </v-col>
          </v-row>
        </v-img>
      </v-navigation-drawer>
      <v-card-title>떠벌림 목표: {{getTitle}}</v-card-title>
      <v-card-text class="text--primary">
        <div>기간: {{getDate}} 까지 주 {{getRow}}회</div>
      </v-card-text>
      <v-card-text v-if="getAlarm">
        <div>알람시간: {{getAlarmTime}}</div>
      </v-card-text>
    </v-card>
    <v-card class="d-inline-block mx-auto" :width="width">
      <p>
        인코딩: {{uploadValue.toFixed()+"%"}}
        <progress id="progress" :value="uploadValue" max="100"></progress>
      </p>
      <v-btn @click="captureImage">공유하기</v-btn>
      <div v-if="imageData!=null">
        <a id="create-kakao-link-btn" @click="shareKakao">
          <img
            src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
          />
        </a>
        <iframe
          :src="`https://www.facebook.com/plugins/share_button.php?href=https%3a%2f%2ffirebasestorage.googleapis.com%2fv0%2fb%2ft4ir-blockchain-testprime.appspot.com%2fo%2f${this.imageId}.jpg%3falt%3dmedia&layout=button&size=large&width=92&height=28&appId`"
          width="92"
          height="28"
          style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
    </v-card>

    <!-- <div id="fb-root"></div>
    <div
      class="fb-share-button"
      data-href="https://developers.facebook.com/docs/plugins/"
      data-layout="button"
      data-size="large"
    >
      <a
        target="_blank"
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
        class="fb-xfbml-parse-ignore"
      >공유하기</a>
    </div>-->
  </v-container>
</template>

<script>
import firebase from "firebase";
import html2canvas from "html2canvas";
import { mapGetters } from "vuex";
export default {
  name: "CompleteGoal",
  data() {
    return {
      width: 600,
      imageData: null,
      imageId: null,
      uploadValue: 0
    };
  },
  methods: {
    //버튼 누르면 이미지 캡쳐 후 파이어베이스 저장
    captureImage() {
      html2canvas(document.querySelector("#capture"), {
        allowTaint: true,
        useCORS: true
      }).then(canvas => {
        //이미지 다운 되도록
        // const cp = document.createElement("a");
        // cp.href = canvas
        //   .toDataURL("image/jpeg")
        //   .replace("image/jpeg", "image/octet-stream");
        // cp.download = "captureImage.jpg";
        // cp.click();
        this.imageData = canvas.toDataURL("image/jpeg");
        this.imageId = Date.now();
        this.onUpload();
        // console.log(url);
      });
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageId}.jpg`)
        .putString(this.imageData, "data_url");
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
          });
        }
      );
    },
    // 카카오톡으로 공유하기
    shareKakao() {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "떠벌림",
          description: `#목표 #달성${this.getFormatValue}`,
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/t4ir-blockchain-testprime.appspot.com/o/${this.imageId}.jpg?alt=media`,
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com"
          }
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845
        }
      });
    }
  },
  computed: {
    ...mapGetters([
      "getSelectList",
      "getTitle",
      "getDate",
      "getRows",
      "getAlarm",
      "getAlarmTime",
      "getFormatValue"
    ])
  }
  // created: function() {
  //   html2canvas(document.querySelector("#capture"), {
  //     allowTaint: true,
  //     useCORS: true,
  //   }).then((canvas) => {
  //     //이미지 다운 되도록
  //     const cp = document.createElement("a");
  //     cp.href = canvas
  //       .toDataURL("image/jpeg")
  //       .replace("image/jpeg", "image/octet-stream");
  //     cp.download = "captureImage.jpg";
  //     cp.click();
  //     this.capturedata = canvas.toDataURL("image/jpeg");
  //     // console.log(url);
  //   });
  // },
};
</script>

<style>
.subheading {
  /* position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 2; */
  font-size: 3rem;
  text-align: center;
}
.body-1 {
  text-align: right;
  margin-right: 15%;
  margin-bottom: 5%;
}

.lightbox {
  box-shadow: 0 0 20px inset rgba(32, 32, 32, 0.7);
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
  background-color: rgba(32, 32, 32, 0.7);
}
</style>
