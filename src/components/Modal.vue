<template>
  <div class="modal-backdrop">
    <div class="modal-window">
      <header
        class="my-modal-header"
        :class="sendResult == 'success' ? 'header-success' : 'header-error'"
      >
        {{ sendResult == "success" ? "Форма успешно отправлена" : "Ошибка" }}
        <button
          type="button"
          class="btn-cross"
          v-if="sendResult == 'error'"
          @click="changeResult"
        >
          x
        </button>
      </header>
      <div class="my-modal-body">
        <img
          src="../assets/IconSuccess.png"
          alt=""
          v-if="sendResult == 'success'"
        />
        <img
          src="../assets/IconError.png"
          alt=""
          v-if="sendResult == 'error'"
        />
      </div>
      <router-link
        to="/"
        v-if="sendResult == 'success'"
        class="btn__close btn-close-main"
        >На главную</router-link
      >

      <button
        v-if="sendResult == 'error'"
        class="btn__close btn-close-close"
        @click="changeResult"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppModal",
  computed: {
    ...mapGetters({
      sendResult: "sendResult",
    }),
  },
  methods: {
    ...mapActions({
      changeResult: "changeResult",
    }),
  },
};
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.modal-window {
  background: #fef8ff;
  box-shadow: 2px 2px 20px 1px;
  width: 40%;
  height: 40%;
  position: relative;
}

.my-modal-header {
  font-size: 20px;
  font-family: SB Sans Interface;
  font-weight: 500;
  display: flex;
}
.header-success {
  justify-content: center;
}
.header-error {
  justify-content: space-between;
}

.my-modal-body {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
}
.btn-cross {
  width: 25px;
  height: 25px;
  line-height: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.04);
  border: none;
  color: rgba(0, 0, 0, 0.2);
  font-family: Arial, Helvetica, sans-serif;
}
.btn__close {
  background-color: #5558fa;
  border: none;
  color: white;
  height: 44px;
  border-radius: 5px;
  font-size: 14px;
  position: absolute;
  bottom: 10px;
  width: 40%;
}
.btn-close-close {
  right: 15px;
}
.btn-close-main {
  text-decoration: none;
  text-align: center;
  margin: 0 auto;
  line-height: 44px;
  right: 0;
  left: 0;
}
@media (max-width: 768px) {
  .modal-window {
    width: 70%;
  }
  .modal-footer-my {
    width: 50%;
  }
}
@media (max-width: 576px) {
  .modal-window {
    width: 90%;
  }
  .modal-footer-my {
    width: 50%;
  }
}
@media (min-height: 768px) {
  .modal-window {
    height: 30%;
  }
}
</style>
