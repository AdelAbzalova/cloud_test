<template>
  <div class="container mt-64">
    <div class="progress col col-md-11">
      <div class="progress-bar" :style="progressWidth"></div>
    </div>
    <form action="" class="mt-64">
      <div class="form-group">
        <div v-if="this.page === 1" class="col col-md-8 col-lg-6">
          <div class="pb-4">
            <label for="field-nickname" class="form-label"
              >Nickname
              <span class="text-danger" v-if="!isNicknameValid">*</span></label
            >
            <input
              type="text"
              id="field-nickname"
              @input="formatNickname"
              v-model="nickname"
              class="form-control"
              :class="isNicknameValid ? 'border-success' : 'border-danger'"
            />
            <div
              v-if="!nicknameTip"
              @click="nicknameTip = true"
              class="text-secondary"
            >
              Tip
            </div>
            <div v-else @click="nicknameTip = false" class="text-secondary">
              Введите никнейм от 3 до 30 символов
            </div>
          </div>

          <div class="pb-4">
            <label for="field-name" class="form-label"
              >Name
              <span class="text-danger" v-if="!isNameValid">*</span></label
            >
            <input
              type="text"
              id="field-name"
              @input="formatName"
              v-model="name"
              class="form-control"
              :class="isNameValid ? 'border-success' : 'border-danger'"
            />
            <div v-if="!nameTip" @click="nameTip = true" class="text-secondary">
              Tip
            </div>
            <div v-else @click="nameTip = false" class="text-secondary">
              Введите имя от 2 до 20 символов
            </div>
          </div>

          <div class="pb-4">
            <label for="field-surname" class="form-label"
              >Surname
              <span class="text-danger" v-if="!isSurnameValid">*</span></label
            >
            <input
              type="text"
              id="field-surname"
              @input="formatSurname"
              v-model="surname"
              class="form-control"
              :class="isSurnameValid ? 'border-success' : 'border-danger'"
            />
            <div
              v-if="!surnameTip"
              @click="surnameTip = true"
              class="text-secondary"
            >
              Tip
            </div>
            <div v-else @click="surnameTip = false" class="text-secondary">
              Введите фамилию от 2 до 20 символов
            </div>
          </div>

          <div>Sex <span class="text-danger" v-if="sex === ''">*</span></div>
          <select
            name=""
            id=""
            class="form-select"
            :class="sex != '' ? 'border-success' : 'border-danger'"
            v-model="sex"
          >
            <option selected disabled>Выберите пол</option>
            <option value="man">man</option>
            <option value="woman">woman</option>
          </select>
        </div>

        <div v-if="this.page === 2" class="col-md-8 col-lg-6">
          <div class="pb-4">
            <div>
              Advantages
              <span class="text-danger" v-if="!isAdvantagesValid">*</span>
            </div>
            <div v-for="(advantage, index) in advantages" class="mb-2 row">
              <div class="col-11">
                <input
                  type="text"
                  @input="changeAdvantage($event.target.value, index)"
                  :value="advantage"
                  class="form-control"
                  :class="advantage != '' ? 'border-success' : 'border-danger'"
                />
              </div>
              <div class="col-1">
                <img
                  src="../assets/Delete.png"
                  @click="deleteAdvantage(index)"
                />
              </div>
            </div>
            <div @click="addAdvantage" class="btn btn-primary">+</div>
          </div>

          <div class="pb-4">
            <div>
              Checkbox group
              <span class="text-danger" v-if="!this.isCheckboxValid">*</span>
            </div>
            <div v-for="(checkbox, index) in checkboxGroup" class="form-check">
              <input
                type="checkbox"
                :id="'field-checkbox-group-option-' + index"
                class="form-check-input"
                @change="checkCheckboxValid()"
                :value="checkbox"
                v-model="checkboxChecked"
              />
              <label
                :for="'field-checkbox-group-option-' + index"
                class="form-check-label"
              >
                {{ checkbox }}</label
              >
            </div>
          </div>

          <div>
            Radio group
            <span class="text-danger" v-if="!this.isRadioValid">*</span>
          </div>
          <div v-for="(radio, index) in radioGroup" class="form-check">
            <input
              type="radio"
              :id="'field-radio-group-option-' + index"
              name="radioGroup"
              class="form-check-input"
              v-model="pickedRadio"
              :value="radio"
              @change="checkRadioValid()"
            />
            <label
              :for="'field-radio-group-option-' + index"
              class="form-check-label"
            >
              {{ radio }}</label
            >
          </div>
        </div>
        <div v-if="this.page === 3" class="col col-md-11">
          <div>
            About <span class="text-danger" v-if="!this.isAboutValid">*</span>
          </div>
          <div class="textarea-about">
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              @input="changeAbout"
              v-model.trim="about"
              class="form-control"
              :class="isAboutValid ? 'border-success' : 'border-danger'"
            ></textarea>
            <div class="counter-about">{{ this.aboutLength }}</div>
          </div>
        </div>
        <div class="mt-64">
          <div class="row">
            <div class="col col-md-11">
              <div class="d-flex justify-content-between">
                <div @click="backClick" class="">
                  <router-link
                    to="/"
                    v-if="page === 1"
                    class="btn btn-outline-primary"
                    >Назад</router-link
                  >
                  <div v-if="page != 1" class="btn btn-outline-primary">
                    Назад
                  </div>
                </div>

                <div
                  @click="forwardClick"
                  class="btn btn-primary"
                  :class="isFormValid() ? '' : 'disable-button'"
                >
                  Далее
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  {{ this.sendResult }}
  <app-modal v-if="this.sendResult != ''"></app-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppModal from "./Modal.vue";

export default {
  name: "AppCreate",
  components: {
    AppModal,
  },
  data() {
    return {
      nickname: "",
      isNicknameValid: false,
      name: "",
      isNameValid: false,
      surname: "",
      isSurnameValid: false,
      sex: "",
      advantages: ["", "", ""],
      isAdvantagesValid: false,
      advantageStates: [false, false, false],
      checkboxGroup: [1, 2, 3],
      checkboxChecked: [],
      isCheckboxValid: false,
      radioGroup: [1, 2, 3],
      pickedRadio: "",
      isRadioValid: false,
      about: "",
      isAboutValid: false,
      aboutLength: 0,
      currentLength: 0,
      page: 1,
      nicknameTip: false,
      nameTip: false,
      surnameTip: false,
    };
  },
  methods: {
    ...mapActions({
      sendData: "sendDataToServer",
      changeData: "changeData",
      changeFieldAbout: "changeAbout",
    }),
    formatData(regex, data, len) {
      data = data.replace(regex, "");
      if (data.length > len) {
        data = data.substring(0, len);
      }
      return data;
    },
    formatNickname() {
      let regex = /[^A-Za-zА-Яа-яЁё0-9]/g;
      this.nickname = this.formatData(regex, this.nickname, 30);
      this.nickname.length > 2
        ? (this.isNicknameValid = true)
        : (this.isNicknameValid = false);
    },
    formatName() {
      let regex = /[^A-Za-zА-Яа-яЁё]/g;
      this.name = this.formatData(regex, this.name, 20);
      this.name.length > 1
        ? (this.isNameValid = true)
        : (this.isNameValid = false);
    },
    formatSurname() {
      let regex = /[^A-Za-zА-Яа-яЁё]/g;
      this.surname = this.formatData(regex, this.surname, 20);
      this.surname.length > 1
        ? (this.isSurnameValid = true)
        : (this.isSurnameValid = false);
    },
    addAdvantage() {
      this.advantages.push("");
      this.advantageStates.push(false);
      this.checkAdvantageValid();
    },
    changeAdvantage(value, index) {
      this.advantages[index] = value;
      if (value !== "") {
        this.advantageStates[index] = true;
      } else {
        this.advantageStates[index] = false;
      }
      this.checkAdvantageValid();
    },
    checkAdvantageValid() {
      let adv = true;
      for (let i = 0; i < this.advantages.length; i++) {
        adv = adv && this.advantageStates[i];
      }
      this.isAdvantagesValid = adv && this.advantages.length > 0;
    },
    deleteAdvantage(index) {
      this.advantages.splice(index, 1);
      this.advantageStates.splice(index, 1);
      this.checkAdvantageValid();
    },
    checkCheckboxValid() {
      if (this.checkboxChecked.length !== 0) {
        this.isCheckboxValid = true;
      } else {
        this.isCheckboxValid = false;
      }
    },
    checkRadioValid() {
      if (this.pickedRadio !== "") {
        this.isRadioValid = true;
      } else {
        this.isRadioValid = false;
      }
    },
    changeAbout() {
      if (this.aboutLength >= 200) {
        this.about = this.about.substring(0, this.currentLength);
      }
      let trimAbout = this.about.replace(/\s/g, "");
      this.aboutLength = trimAbout.length;
      if (this.aboutLength === 200) {
        this.currentLength = this.about.length;
      }
      if (this.aboutLength > 2) {
        this.isAboutValid = true;
      } else {
        this.isAboutValid = false;
      }
      this.changeFieldAbout(this.about);
    },
    backClick() {
      if (this.page > 1) {
        this.page--;
      }
    },
    forwardClick() {
      if (this.page === 3) {
        this.sendData();
      }
      if (this.page < 3) {
        this.page++;
      }
      console.log(this.$store.state);
      this.$store.dispatch("changeData", [
        this.nickname,
        this.name,
        this.surname,
        this.sex,
        this.advantages,
        this.checkboxChecked,
        this.pickedRadio,
        this.about,
      ]);
    },
    isFormValid() {
      if (
        this.page === 1 &&
        this.isNicknameValid &&
        this.isNameValid &&
        this.isSurnameValid &&
        this.sex != ""
      ) {
        return true;
      } else if (
        this.page === 2 &&
        this.isAdvantagesValid &&
        this.isCheckboxValid &&
        this.isRadioValid
      ) {
        return true;
      } else if (this.page === 3 && this.isAboutValid) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    ...mapGetters({
      sendResult: "sendResult",
    }),
    progressWidth() {
      return {
        width: ((this.page - 1) / 2) * 100 + "%",
      };
    },
  },
};
</script>

<style>
.mt-64 {
  margin-top: 64px;
}
.disable-button {
  pointer-events: none;
  opacity: 0.5;
}
.textarea-about {
  position: relative;
}
.counter-about {
  position: absolute;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
}
</style>
