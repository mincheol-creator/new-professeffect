const state = {
  selectList: { src: "https://i.imgur.com/XVxzMA9.jpg" },
  items: [
    {
      code: 1,
      state: "운동, 다이어트",
    },
    { code: 2, state: "교양" },
    { code: 3, state: "절제" },
    { code: 4, state: "공부" },
    { code: 5, state: "기타" },
  ],
  completeList: [
    {
      code: 1,
      comment: "긁지않은 복권을 보여줄께",
      src: "https://i.imgur.com/QaQtLjE.jpg",
    },
    {
      code: 2,
      comment: "ㄴr는 ㄱr끔 눈물을 흘린다...★",
      src: "https://i.imgur.com/LLRRWok.jpg",
    },
    {
      code: 3,
      comment: "이번엔 진짜다",
      src: "https://i.imgur.com/b4v6oyN.jpg",
    },
    { code: 4, comment: "카톡X", src: "https://i.imgur.com/IP6qFen.jpg" },
    { code: 5, comment: "FLEX FLEX", src: "https://i.imgur.com/l1YuZfU.jpg" },
  ],
  options: [],
  value: [],
  formatValue: "",
  title: null,
  date: "",
  rows: 3,
  alarm: false,
  alarmTime: "12:30:00",
};
const getters = {
  getCompleteList: (state) => state.completeList,
  getSelectList: (state) => state.selectList,
  getItems: (state) => state.items,
  getOptions: (state) => state.options,
  getValue: (state) => state.value,
  getFormatValue: (state) => state.formatValue,
  getTitle: (state) => state.title,
  getDate: (state) => state.date,
  getRows: (state) => state.rows,
  getAlarm: (state) => state.alarm,
  getAlarmTime: (state) => state.alarmTime,
};
const mutations = {
  // 카테고리 부분
  setOptions(state, data) {
    switch (data) {
      case 1:
        state.options = [
          { name: "홈트레이닝", code: "1-1" },
          { name: "걷기", code: "1-2" },
          { name: "헬스장 가기", code: "1-3" },
          { name: "아침 운동", code: "1-4" },
          { name: "kg 감량", code: "1-5" },
        ];
        state.selectList = state.completeList[0];
        break;
      case 2:
        state.options = [
          { name: "책 읽기", code: "2-1" },
          { name: "신문기사 읽기", code: "2-2" },
          { name: "강연 듣기", code: "2-3" },
        ];
        state.selectList = state.completeList[1];
        break;
      case 3:
        state.options = [
          { name: "금연", code: "3-1" },
          { name: "금주", code: "3-2" },
          { name: "금겜", code: "3-3" },
          { name: "일찍 기상", code: "3-4" },
        ];
        state.selectList = state.completeList[2];
        break;
      case 4:
        state.options = [
          { name: "영어 공부", code: "4-1" },
          { name: "인강 듣기", code: "4-2" },
          { name: "자격증 취득", code: "4-3" },
        ];
        state.selectList = state.completeList[3];
        break;
      case 5:
        state.options = [
          { name: "저축", code: "5-1" },
          { name: "하늘 보기", code: "5-2" },
          { name: "일기 쓰기", code: "5-3" },
        ];
        state.selectList = state.completeList[4];
        break;
      default:
        break;
    }
  },
  //태그 부분
  setTag(state, data) {
    state.options.push(data);
  },
  setValue(state, data) {
    state.value = data;
  },
  //value Form 수정
  setFormatValue(state) {
    for (let i = 0; i < state.value.length; i++) {
      state.formatValue += ` #${state.value[i].name}`;
    }
  },

  setTitle(state, data) {
    state.title = data;
  },
  setDate(state, data) {
    state.date = data;
  },
  setRows(state, data) {
    state.rows = data;
  },

  setAlarm(state, data) {
    state.alarm = data;
  },
  setAlarmTime(state, data) {
    state.alarmTime = data;
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
