<template>
  <div class="start">
    <div class="container mt-4">
      <div class="row">
        <div class="start--avatar" style="width: 80px">{{ this.initials }}</div>
        <div class="col-8 col-md-6">
          <div class="">
            <input
              type="text"
              v-model="this.name"
              @input="formatName"
              @blur="changeAvatar"
              class="form-control"
              placeholder="Имя и фамилия"
            />
          </div>
          <span v-if="!isNameValid" class="col-3 col-md-3 text-danger"
            >* Необходимо ввести имя и фамилию!</span
          >
          <div class="start--header_folders">
            <img src="../assets/Folder.png" alt="folder" />
            <span>Telegram</span>
            <img src="../assets/Folder.png" alt="folder" />
            <span>Github</span>
            <img src="../assets/Folder.png" alt="folder" />
            <span>Resume</span>
          </div>
        </div>
      </div>
      <hr />

      <div class="col col-md-6">
        <div class="pt-4">
          Номер телефона <span class="text-danger" v-if="!isPhoneValid">*</span>
        </div>
        <input
          type="text"
          v-model="phoneNumber"
          @input="formatPhoneNumber"
          placeholder="+7(900) 000-00-00"
          class="form-control"
        />
        <div class="pt-4">
          Email <span class="text-danger" v-if="!isEmailValid">*</span>
        </div>
        <div class="mb-4">
          <input
            type="text"
            v-model="email"
            @input="formatEmail"
            placeholder="email@example.com"
            class="form-control"
          />
        </div>
        <router-link
          to="/create"
          class="btn btn-primary mt-4"
          :class="
            isNameValid && isEmailValid && isPhoneValid ? '' : 'disable-link'
          "
          @click="
            changedata({
              name: this.name,
              phone: this.phoneNumber,
              email: this.email,
            })
          "
          >Начать</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppModal from "./Modal.vue";

export default {
  name: "AppStart",
  components: {
    AppModal,
  },
  data() {
    return {
      name: "",
      initials: "",
      isNameValid: false,
      phoneNumber: "",
      isPhoneValid: false,
      email: "",
      isEmailValid: false,
    };
  },
  methods: {
    ...mapActions({
      changedata: "changeFirstData",
    }),
    formatName() {
      let regex = /[^а-яА-ЯёЁ\s-]/g;
      this.name = this.name.replace(regex, "");
      if (
        this.name.split(" ").length == 2 &&
        this.name.split(" ")[1].length > 0
      ) {
        this.isNameValid = true;
      } else {
        this.isNameValid = false;
      }
    },
    changeAvatar() {
      if (this.isNameValid) {
        let nameArray = this.name.split(" ");
        let initials = "";
        let fullName = "";
        nameArray.map((el) => {
          initials += el.charAt(0).toUpperCase();
        });
        fullName =
          nameArray[0].charAt(0).toUpperCase() +
          nameArray[0].substring(1) +
          " " +
          nameArray[1].substring(0, 1).toUpperCase() +
          nameArray[1].substring(1);
        this.initials = initials;
        this.name = fullName;
      }
    },
    formatPhoneNumber() {
      let phoneNumber = this.phoneNumber;
      if (phoneNumber[0] == "+") {
        phoneNumber = phoneNumber.replace(/\D/g, "");
        phoneNumber = phoneNumber.slice(1, 11);
      } else {
        phoneNumber = phoneNumber.replace(/\D/g, "");
        phoneNumber = phoneNumber.slice(0);
      }
      if (phoneNumber.length > 0) {
        phoneNumber = "+7(" + phoneNumber;
      }
      if (phoneNumber.length > 6) {
        phoneNumber = [phoneNumber.slice(0, 6), ")", phoneNumber.slice(6)].join(
          ""
        );
      }
      if (phoneNumber.length > 7) {
        phoneNumber = [phoneNumber.slice(0, 7), " ", phoneNumber.slice(7)].join(
          ""
        );
      }
      if (phoneNumber.length > 11) {
        phoneNumber = [
          phoneNumber.slice(0, 11),
          "-",
          phoneNumber.slice(11),
        ].join("");
      }
      if (phoneNumber.length > 14) {
        phoneNumber = [
          phoneNumber.slice(0, 14),
          "-",
          phoneNumber.slice(14),
        ].join("");
      }
      this.phoneNumber = phoneNumber;
      if (this.phoneNumber.length === 17) {
        this.isPhoneValid = true;
      } else {
        this.isPhoneValid = false;
      }
    },
    formatEmail() {
      let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (this.email.match(regex)) {
        this.isEmailValid = true;
      } else {
        this.isEmailValid = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      fullName: "fullName",
    }),
  },
};
</script>

<style>
.start--avatar {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-color: #d5e4f7;
  font-size: 35px;
  text-align: center;
  line-height: 80px;
}
.disable-link {
  pointer-events: none;
  opacity: 0.5;
}
</style>
