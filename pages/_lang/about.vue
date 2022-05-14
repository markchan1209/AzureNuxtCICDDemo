<template>
  <div class="about">
    <div v-if="deviceWidth > 700" class="about-title">
      {{ $t('first_corporate') }} <br />
      {{ $t('trade_rebate') }}
    </div>
    <div v-else class="about-title">{{ $t('first_corporate') }}<br />{{ $t('trade_rebate') }}</div>
    <div class="step-title">{{ $t('rebate_process') }}</div>
    <div class="step-item">
      <div class="image">
        <img src="@/assets/img/about/step1.png" alt="step1" />
      </div>
      <div class="info">
        <NuxtLink :to="{ name: 'lang-register', params: { lang: $route.params.lang } }" class="info-title text-link">
          {{ $t('join_fdb') }}
        </NuxtLink>
        <div class="info-content">{{ $t('application_fdb_member') }}<br />{{ $t('friends_invitation_code_commission') }}</div>
      </div>
    </div>
    <div class="step-item" :class="{ reverse: deviceWidth > 700, 'reverse-m': deviceWidth <= 700 }">
      <div class="image">
        <img src="@/assets/img/about/step2.png" alt="step2" />
      </div>
      <div class="info">
        <a class="info-title text-link" href="https://partner.bybit.com/b/fundobit" target="_blank">{{ $t('bound_exchange') }}</a>
        <div class="info-content">{{ $t('register_exchange_through_rebate_link') }}<br />{{ $t('exchange_uid_bind_member') }}</div>
      </div>
    </div>
    <div class="step-item">
      <div class="image">
        <img src="@/assets/img/about/step3.png" alt="step3" />
      </div>
      <div class="info">
        <div class="info-title">{{ $t('receive_rebate') }}</div>
        <div class="info-content">{{ $t('view_commission_rebate_dashboard') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  // max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  &-title {
    width: 100vw;
    height: 60vw;
    box-sizing: border-box;
    background-image: url('../../assets/img/about/banner.png');
    background-size: cover;
    background-repeat: no-repeat;
    font-weight: bold;
    font-size: 32px;
    line-height: 53px;
    text-align: center;
    padding: 14% 5% 0 5%;
    @media screen and (max-width: 1370px) {
      font-size: 24px;
      line-height: 36px;
    }
    @media screen and (max-width: 960px) {
      font-size: 20px;
      line-height: 30px;
    }
    @media screen and (max-width: 700px) {
      line-height: 46px;
      height: 88vw;
      background-image: url('../../assets/img/about/banner-m.png');
      background-position: 0% 0%;
    }
    @media screen and (max-width: 500px) {
      font-size: 16px;
      line-height: 24px;
    }
  }

  .step-title {
    max-width: 1440px;
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    margin: 40px auto;
    @media screen and (max-width: 1370px) {
      font-size: 32px;
      margin: 20px;
    }
    @media screen and (max-width: 960px) {
      font-size: 26px;
    }
  }
  .step-item {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    padding: 6% 0;
    background-image: url('../../assets/img/about/rectangle.png');
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: -16% 8%;
    @media screen and (max-width: 700px) {
      flex-direction: column;
      background-size: 94%;
      background-position: 0% 3%;
      padding: 10% 0;
    }
    &:last-child {
      margin-bottom: 200px;
      @media screen and (max-width: 700px) {
        margin-bottom: 100px;
      }
    }
    &.reverse {
      flex-direction: row-reverse;
      background-image: url('../../assets/img/about/reverse-eectangle.png');
      background-position: 108% 8%;
      .image {
        text-align: start;
      }
      .info {
        margin-left: 9%;
        margin-right: 3%;
      }
    }
    &.reverse-m {
      background-image: url('../../assets/img/about/reverse-eectangle.png');
      background-position: 100% 3%;
    }
    .image {
      width: 60%;
      text-align: center;
      @media screen and (max-width: 700px) {
        width: 100%;
      }
      img {
        width: 76%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      margin: 0 3%;
      @media screen and (max-width: 700px) {
        width: 100%;
        margin-left: 0;
        text-align: center;
        margin-top: 5%;
      }
      &-title {
        font-size: 36px;
        line-height: 53px;
        font-weight: bold;
        margin-bottom: 5%;
        @media screen and (max-width: 1370px) {
          font-size: 24px;
          line-height: 36px;
        }
        @media screen and (max-width: 960px) {
          font-size: 20px;
          line-height: 30px;
        }
        @media screen and (max-width: 700px) {
          padding: 0 6%;
          margin-bottom: 2%;
        }
      }
      &-content {
        font-size: 24px;
        line-height: 36px;
        color: #e5e5e5;
        @media screen and (max-width: 1370px) {
          font-size: 18px;
          line-height: 24px;
        }
        @media screen and (max-width: 960px) {
          font-size: 14px;
          line-height: 24px;
        }
        @media screen and (max-width: 700px) {
          padding: 0 6%;
        }
      }
    }
  }
}
</style>
