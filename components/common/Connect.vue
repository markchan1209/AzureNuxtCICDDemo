<template>
  <div class="connect" :class="{ hide: scrollBottom < 101 }">
    <img v-if="!mediaShow" src="@/assets/img/common/connect.png" alt="connect" class="fixd-icon" @click="mediaShow = !mediaShow" />
    <img v-else src="@/assets/img/common/close.png" alt="connect" class="fixd-icon" @click="mediaShow = !mediaShow" />
    <!-- 
    IG ：https://www.instagram.com/cryptocurrency.rebate/
    TG ：https://t.me/fundobit
    -->
    <a href="mailto: CS@fundobit.com" target="_blank" rel="noopener noreferrer">
      <img
        src="@/assets/img/common/email.png"
        alt="telegram"
        class="media-icon"
        :class="{ show: mediaShow }"
        :style="{ top: mediaShow ? `${-60}px` : '-50px', pointerEvents: mediaShow ? 'auto' : 'none' }"
      />
    </a>
    <a href="https://www.instagram.com/cryptocurrency.rebate" target="_blank" rel="noopener noreferrer">
      <img
        src="@/assets/img/common/instagram.png"
        alt="telegram"
        class="media-icon"
        :class="{ show: mediaShow }"
        :style="{ top: mediaShow ? `${-60 - 60}px` : '-50px', pointerEvents: mediaShow ? 'auto' : 'none' }"
      />
    </a>
    <a href="https://t.me/fundobit" target="_blank" rel="noopener noreferrer">
      <img
        src="@/assets/img/common/telegram.png"
        alt="telegram"
        class="media-icon"
        :class="{ show: mediaShow }"
        :style="{ top: mediaShow ? `${-60 - 120}px` : '-50px', pointerEvents: mediaShow ? 'auto' : 'none' }"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'Connect',
  data() {
    return {
      mediaShow: false
    }
  },
  computed: {
    scrollBottom() {
      return this.$store.state.app.scrollBottom
    }
  }
}
</script>

<style lang="scss" scoped>
.connect {
  position: fixed;
  right: 3vw;
  bottom: 50px;
  z-index: 100;
  transition: all 0.6s;
  &.hide {
    right: -20vw;
  }
  .fixd-icon {
    width: 70px;
    cursor: pointer;
    @media screen and (max-width: 1370px) {
      width: 50px;
    }
  }
  .media-icon {
    width: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    opacity: 0;
    transition: all 0.4s;
    @media screen and (max-width: 1370px) {
      width: 34px;
    }
    &.show {
      opacity: 1;
    }
  }
}
</style>
