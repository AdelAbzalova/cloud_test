import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    data: {
      "field-nickname": "",
      "field-name": "",
      "field-surname": "",
      "field-sex": "",
      "field-advantages": [],
      "field-checkbox-group": [],
      "field-radio-group": [],
      "field-about": "",
    },
    sendResult: "",
    fullName: "",
    phone: "",
    email: "",
  },
  getters: {
    data(state) {
      return state.data;
    },
    sendResult(state) {
      return state.sendResult;
    },
    fullName(state) {
      return state.fullName;
    },
  },
  mutations: {
    CHANGE_DATA(state, payload) {
      let index = 0;
      for (let i in state.data) {
        state.data[i] = payload[index];
        index++;
      }
    },
    CHANGE_FIRSTDARA(state, data) {
      state.fullName = data.name;
      state.phone = data.phone;
      state.email = data.email;
    },
    CHANGE_ABOUT(state, about) {
      state.data["field-about"] = about;
    },
    CHANGE_RESULT(state) {
      state.sendResult = "";
    },
  },
  actions: {
    changeData(store, data) {
      store.commit("CHANGE_DATA", data);
    },
    changeFirstData(store, data) {
      store.commit("CHANGE_FIRSTDARA", data);
    },
    changeAbout(store, about) {
      store.commit("CHANGE_ABOUT", about);
    },
    changeResult(store) {
      store.commit("CHANGE_RESULT");
    },
    sendDataToServer({ commit, state }) {
      let newObj = {};
      for (let i in state.data) {
        newObj[i] = state.data[i];
      }
      newObj["fullName"] = state.fullName;
      newObj["phoneNumber"] = state.phone;
      newObj["email"] = state.email;
      return new Promise((resolve, reject) => {
        axios
          .post("https://api.sbercloud.ru/content/v1/bootcamp/frontend", newObj)
          .then((response) => {
            state.sendResult = "success";
          })
          .catch((error) => {
            state.sendResult = "error";
          });
      });
    },
  },
});
