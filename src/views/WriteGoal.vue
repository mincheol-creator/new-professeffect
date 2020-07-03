<template>
  <v-container style="width:50%">
    <!-- 목표 페이스북 또는 카카오톡 공유 페이지 -->

    <h1 class="text-center font-weight-black">목표 떠벌림</h1>
    <v-row justify="center">
      <v-col cols="12" sm="3">
        <p id="formText" class="font-weight-black text-sm-center">카테고리</p>
      </v-col>
      <v-col class="d-flex" cols="12" sm="9">
        <v-select
          :items="getItems"
          item-value="code"
          item-text="state"
          @change="changeCategory"
          label="카테고리"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="3">
        <p id="formText" class="font-weight-black text-sm-center">태그</p>
      </v-col>
      <v-col class="d-flex" cols="12" sm="9">
        <multiselect
          v-model="value"
          tag-placeholder="원하는 태그는 적어주세요"
          placeholder="넣고 싶은 태그"
          label="name"
          track-by="code"
          :options="getOptions"
          :multiple="true"
          :taggable="true"
          @tag="addTag"
        ></multiselect>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="3">
        <p id="formText" class="font-weight-black text-sm-center">내용</p>
      </v-col>
      <v-col class="d-flex" cols="12" sm="9">
        <v-text-field label="내용을 입력해주세요" v-model="stateTitle" single-line outlined></v-text-field>
      </v-col>
    </v-row>
    <!-- 다시 세팅 -->
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-row justify="center">
      <v-col cols="12" sm="3">
        <p id="formText" class="text-sm-center font-weight-black">언제부터?</p>
      </v-col>
      <v-col cols="8" sm="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="selectDate"
              label="날짜를 선택해주세요"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" :allowed-dates="allowedDates" no-title scrollable range>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="d-flex" cols="4" sm="3">
        <p class="d-flex align-center">주</p>
        <v-text-field
          v-model="stateRows"
          class="mx-4"
          label="회"
          max="7"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3" sm="3"></v-col>
      <v-col cols="9" sm="4">
        <p class="font-weight-black" id="formText">알람 설정</p>
        <v-switch class="mx-2" value input-value="false" v-model="stateAlarm"></v-switch>
      </v-col>
      <v-col cols="12" sm="5">
        <v-text-field label="알람 시간" v-model="stateAlarmTime" type="time"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <div class="my-2">
        <v-btn id="goButton" @click="toWriteForm">작성 완료</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Multiselect from "vue-multiselect";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { mapGetters } from "vuex";
export default {
  components: {
    Multiselect
  },
  name: "WriteGoal",
  data: () => {
    return {
      // 이렇게 기본값 설정 가능 value: [{ name: "Javascript", code: "js" }],
      value: [],
      date: [new Date().toISOString().substr(0, 10)],
      today: new Date().toISOString().substr(0, 10),
      menu: false
    };
  },
  methods: {
    //카테고리 선택시 세부카테고리 목록
    changeCategory(e) {
      this.$store.commit("setOptions", e);
    },
    // 태그가 추가될 경우 state.options에 추가
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.value.push(tag);
      this.$store.commit("setTag", tag);
    },
    //가능한 날짜 설정
    allowedDates(val) {
      return this.date[1] ? val >= this.today : val >= this.date[0];
    },
    //작성완료 페이지로 이동
    toWriteForm() {
      if (!this.getSelectList.code || !this.getTitle) {
        alert("양식을 완성해주세요");
        return;
      }
      this.$store.commit("setFormatValue");
      this.$router.push("/complete_goal");
    }
  },
  watch: {
    // this.value 변경 시 state.value값이 맵핑되도록 변경
    // computed를 쓰면 multiselect의 v-model에서 오류가 나기 때문에 차선책으로 설정
    value: function(value) {
      this.$store.commit("setValue", value);
    }
  },
  computed: {
    ...mapGetters(["getItems", "getOptions", "getSelectList", "getTitle"]),
    stateTitle: {
      get() {
        return this.$store.state.Goal.title;
      },
      set(e) {
        this.$store.commit("setTitle", e);
      }
    },
    stateRows: {
      get() {
        return this.$store.state.Goal.rows;
      },
      set(e) {
        this.$store.commit("setRows", e);
      }
    },
    stateAlarm: {
      get() {
        return this.$store.state.Goal.alarm;
      },
      set(e) {
        this.$store.commit("setAlarm", e);
      }
    },
    stateAlarmTime: {
      get() {
        return this.$store.state.Goal.alarmTime;
      },
      set(e) {
        this.$store.commit("setAlarmTime", e);
      }
    },

    selectDate() {
      const format = this.date.join("~");
      this.$store.commit("setDate", format);
      return format;
    }
  }
};
</script>
<style>
#formText {
  color: rgba(254, 135, 123);
}
</style>
