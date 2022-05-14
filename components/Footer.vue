<template>
  <!--Footer 開始-->
  <div class="footer">
    <div class="footer-top">
      <div class="footer-img">
        <img v-if="deviceWidth > 900" src="@/assets/img/nav/logo.png" alt="nav-icon" />
        <img v-else src="@/assets/img/nav/logo-m.png" alt="nav-icon" />
      </div>
      <!-- 日文手機版有做特殊排版 -->
      <div class="footer-menu" :class="{ 'is-jp': lang === 'JP' }">
        <NuxtLink :to="{ name: 'lang-home', params: { lang } }">{{ $t('fdb_home') }}</NuxtLink>
        <NuxtLink :to="{ name: 'lang-about', params: { lang } }">{{ $t('start_rebate') }}</NuxtLink>
        <NuxtLink :to="{ name: 'lang-partner', params: { lang } }">{{ $t('coopertion_bis') }}</NuxtLink>
        <NuxtLink :to="{ name: 'lang-news', params: { lang } }">{{ $t('latest_news') }}</NuxtLink>
      </div>
      <div class="footer-connect">
        <div>{{ $t('contact_us') }}</div>
        <a href="https://t.me/fundobit" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/img/footer/telegram.png" alt="connect-icon" class="connect-icon" />
        </a>
        <a href="https://www.instagram.com/cryptocurrency.rebate" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/img/common/instagram.png" alt="connect-icon" class="connect-icon" />
        </a>
        <a href="mailto: CS@fundobit.com" target="_blank" rel="noopener noreferrer">
          <img src="@/assets/img/common/email.png" alt="connect-icon" class="connect-icon" />
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="bottom-left">
        <div class="footer-copy-right">Copyright © 2020 FDB.</div>
        <div class="links">
          <NuxtLink :to="{ name: 'lang-disclaimer', params: { lang } }">{{ $t('disclaimer') }}</NuxtLink>
          <div style="width: 0.5px; height: 20px; background-color: #ccc; margin-right: 20px"></div>
          <NuxtLink :to="{ name: 'lang-privacy-policy', params: { lang } }">{{ $t('privacy_policy') }}</NuxtLink>
        </div>
      </div>
      <div class="bottom-right">
        <img src="@/assets/img/common/bybit_w.png" alt="bybit" />
      </div>
    </div>
  </div>
  <!--Footer 結束-->
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    },
    lang() {
      return this.$route.params.lang || 'TW'
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  padding: 10px 3% 0;
  @media screen and (max-width: 1370px) {
    padding: 10px 4% 0;
  }
  @media screen and (max-width: 960px) {
    padding: 10px 6% 0;
  }
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #fff;
    padding: 20px 0;
    @media screen and (max-width: 700px) {
      flex-direction: column;
      align-items: unset;
    }
    .footer-img {
      flex: 0 0 auto;
      img {
        width: 240px;
        @media screen and (max-width: 900px) {
          width: 70px;
        }
      }
    }
    .footer-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      @media screen and (max-width: 700px) {
        justify-content: space-between;
        margin: 12px 0;
      }
      a {
        color: #ccc;
        padding: 0 3%;
        @media screen and (max-width: 1340px) {
          font-size: 12px;
        }
        &:hover {
          color: #fff;
        }
      }
      &.is-jp {
        @media screen and (max-width: 700px) {
          flex-wrap: wrap;
          a {
            flex: 0 0 50%;
            text-align: center;
            padding: 6px 0;
          }
        }
      }
    }
    .footer-connect {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .connect-icon {
        margin-left: 12px;
        width: 34px;
      }
    }
  }
  &-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    .bottom-left {
      display: flex;
      align-items: center;
      @media screen and (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;
      }
      .footer-copy-right {
        color: #fff;
        @media screen and (max-width: 700px) {
          margin-bottom: 8px;
        }
      }
      .links {
        margin-left: 34px;
        display: flex;
        align-items: center;
        @media screen and (max-width: 700px) {
          margin-left: 0px;
        }
        a {
          margin-right: 20px;
          color: #ccc;
          @media screen and (max-width: 700px) {
            font-size: 12px;
          }
          &:hover {
            color: #fff;
          }
        }
      }
    }
    .bottom-right {
      img {
        width: 70px;
      }
    }
  }
}
</style>
