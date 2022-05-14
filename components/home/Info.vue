<template>
  <div class="info">
    <!-- 手機版標題 -->
    <div class="info-m-title">
      <div class="title">{{ $t('fdb_can_help_you') }}</div>
      <div class="sub">{{ $t('featured_information') }}</div>
    </div>
    <!-- 手機版標題 -->

    <div class="info-pic">
      <transition name="fade-transform" mode="out-in">
        <img v-if="infoSelected === 'unqi-account'" src="@/assets/img/home/index-intro-00.jpg" alt="unqi-account" key="unqi-account" />
        <img v-if="infoSelected === 'bonues-visual'" src="@/assets/img/home/index-intro-02.jpg" alt="bonues-visual" key="bonues-visual" />
        <img
          v-if="infoSelected === 'perfect-control'"
          src="@/assets/img/home/index-intro-03.jpg"
          alt="perfect-control"
          key="perfect-control"
        />
        <img v-if="infoSelected === 'servicr-team'" src="@/assets/img/home/index-intro-01.jpg" alt="servicr-team" key="servicr-team" />
      </transition>
      <div class="info-pic-slider">
        <div @click="infoSelected = 'unqi-account'" :class="{ actived: infoSelected === 'unqi-account' }"></div>
        <div @click="infoSelected = 'bonues-visual'" :class="{ actived: infoSelected === 'bonues-visual' }"></div>
        <div @click="infoSelected = 'perfect-control'" :class="{ actived: infoSelected === 'perfect-control' }"></div>
        <div @click="infoSelected = 'servicr-team'" :class="{ actived: infoSelected === 'servicr-team' }"></div>
      </div>
    </div>

    <div class="info-mainer">
      <div class="info-mainer-title">
        <div class="title">{{ $t('fdb_can_help_you') }}</div>
        <div class="sub">{{ $t('featured_information') }}</div>
      </div>
      <div class="info-mainer-body">
        <div class="info-mainer-body__list">
          <div class="list-item" @click="infoSelected = 'unqi-account'" :class="{ actived: infoSelected === 'unqi-account' }">
            <div class="title">{{ $t('independent_account_binding') }}</div>
            <div class="sub">{{ $t('independent_account_verification') }}</div>
          </div>
          <div class="list-item" @click="infoSelected = 'bonues-visual'" :class="{ actived: infoSelected === 'bonues-visual' }">
            <div class="title">{{ $t('revenue_visualization') }}</div>
            <div class="sub">{{ $t('clearly_classified_rebates') }}</div>
          </div>
          <div class="list-item" @click="infoSelected = 'perfect-control'" :class="{ actived: infoSelected === 'perfect-control' }">
            <div class="title">{{ $t('improve_information_management') }}</div>
            <div class="sub">{{ $t('easy_members _control') }}</div>
          </div>
          <div class="list-item" @click="infoSelected = 'servicr-team'" :class="{ actived: infoSelected === 'servicr-team' }">
            <div class="title">{{ $t('online_service_team') }}</div>
            <div class="sub">{{ $t('professional_service') }}</div>
          </div>
        </div>
        <a href="javascript:void(0)" class="info-btn" @click="goToRegister">
          {{ $t('start_using') }}
          <img src="@/assets/img/home/array-right.png" alt="" style="width: auto; margin-left: 10px;" />
        </a>
      </div>
    </div>

    <!-- 手機版敘述 -->
    <div class="info-m-body">
      <transition name="fade-transform" mode="out-in">
        <div class="list-item" v-if="infoSelected === 'unqi-account'" key="unqi-account">
          <div class="title">{{ $t('independent_account_binding') }}</div>
          <div class="sub">{{ $t('independent_account_verification') }}</div>
          <div class="start" @click="goToRegister">
            {{ $t('start_using') }}<img src="@/assets/img/home/array-right-mobile.png" alt="array-right" />
          </div>
        </div>
        <div class="list-item" v-if="infoSelected === 'bonues-visual'" key="bonues-visual">
          <div class="title">{{ $t('revenue_visualization') }}</div>
          <div class="sub">{{ $t('clearly_classified_rebates') }}</div>
          <div class="start" @click="goToRegister">
            {{ $t('start_using') }}<img src="@/assets/img/home/array-right-mobile.png" alt="array-right" />
          </div>
        </div>
        <div class="list-item" v-if="infoSelected === 'perfect-control'" key="perfect-control">
          <div class="title">{{ $t('improve_information_management') }}</div>
          <div class="sub">{{ $t('easy_members _control') }}</div>
          <div class="start" @click="goToRegister">
            {{ $t('start_using') }}<img src="@/assets/img/home/array-right-mobile.png" alt="array-right" />
          </div>
        </div>
        <div class="list-item" v-if="infoSelected === 'servicr-team'" key="servicr-team">
          <div class="title">{{ $t('online_service_team') }}</div>
          <div class="sub">{{ $t('professional_service') }}</div>
          <div class="start" @click="goToRegister">
            {{ $t('start_using') }}<img src="@/assets/img/home/array-right-mobile.png" alt="array-right" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoSelected: 'unqi-account'
    }
  },
  methods: {
    goToRegister() {
      this.$router.push({ name: 'lang-register', params: { lang: this.$route.params.lang } })
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  max-width: 1440px;
  padding: 0 5%;
  margin: 0 auto 8vw auto;
  &-m-title {
    display: none;
  }
  &-pic {
    padding: 0 3%;
    flex: 1;
    position: relative;
    width: 100%;
    height: 560px;
    display: flex;
    justify-content: center;
    img {
      width: 90%;
    }
    &-slider {
      position: absolute;
      bottom: 20px;
      right: 0;
      left: 0;
      display: flex;
      justify-content: center;
      > div {
        width: 34px;
        margin: 0 4px;
        background: #cccccc80;
        height: 9px;
        border-radius: 100px;
        cursor: pointer;
        &.actived,
        &:hover {
          background: #62ffff;
        }
      }
    }
  }
  &-mainer {
    flex: 1;
    width: 100%;
    padding: 0 3%;
    &-title {
      margin-bottom: 24px;
      .title {
        font-weight: bold;
        font-size: 48px;
        line-height: 64px;
      }
      .sub {
        font-size: 16px;
        line-height: 24px;
      }
    }
    &-body {
      &__list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 24px;
        .list-item {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-radius: 8px;
          width: calc(50% - 44px);
          margin: 6px;
          min-height: 180px;
          padding: 0 12px 0 20px;
          cursor: pointer;
          &.actived,
          &:hover {
            background-image: linear-gradient(to left top, #5ad5d5, #3ea9cc);
          }
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 8px;
            padding: 2px;
            background: linear-gradient(315deg, #5ad5d5 0%, #3ea9cc 100%);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask-composite: destination-out;
          }
          .title {
            font-weight: bold;
            font-size: 18px;
            line-height: 28px;
            padding: 8% 0;
          }
          .sub {
            font-size: 15px;
            line-height: 150%;
            padding-bottom: 8%;
          }
        }
      }
      .info-btn {
        margin-left: 2%;
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 24px;
        color: #62ffff;
      }
    }
  }
  &-m-body {
    display: none;
  }
}

/*1024*/
@media screen and (min-width: 1000px) and (max-width: 1346px) {
  .info {
    padding: 0 3%;
    &-pic {
      width: 100%;
      height: 400px;
      padding: 0px;
      img {
        width: 90%;
      }
      &-slider {
        bottom: 20px;
        right: 0;
        left: 0;
        > div {
          width: 34px;
          margin: 0 4px;
          height: 9px;
          border-radius: 100px;
        }
      }
    }
    &-mainer {
      padding: 0 3%;
      &-title {
        margin-bottom: 14px;
        .title {
          font-size: 36px;
          line-height: 44px;
          margin-bottom: 12px;
        }
        .sub {
          font-size: 16px;
          line-height: 24px;
        }
      }
      &-body {
        &__list {
          margin-bottom: 10px;
          .list-item {
            border-radius: 8px;
            width: calc(50% - 38px);
            margin: 6px;
            min-height: 124px;
            padding: 0 12px 0 12px;
            .title {
              margin-bottom: 6px;
            }
            .sub {
              font-size: 14px;
              line-height: 150%;
            }
          }
        }
        .info-btn {
          font-size: 17px;
          img {
            width: 18px;
            margin-left: 6px;
          }
        }
      }
    }
  }
}
/*768*/
@media screen and (min-width: 750px) and (max-width: 999px) {
  .info {
    padding: 0 3%;
    &-pic {
      width: 100%;
      height: 320px;
      padding: 0px;
      img {
        width: 90%;
      }
      &-slider {
        bottom: 20px;
        right: 0;
        left: 0;
        > div {
          width: 34px;
          margin: 0 4px;
          height: 9px;
          border-radius: 100px;
        }
      }
    }
    &-mainer {
      padding: 0;
      &-title {
        margin-bottom: 8px;
        .title {
          font-size: 28px;
          line-height: 34px;
          margin-bottom: 12px;
        }
        .sub {
          font-size: 14px;
          line-height: 24px;
        }
      }
      &-body {
        &__list {
          margin-bottom: 2px;
          .list-item {
            border-radius: 8px;
            width: calc(50% - 38px);
            margin: 6px;
            min-height: 124px;
            padding: 0 12px 0 12px;
            .title {
              font-size: 16px;
              margin-bottom: 6px;
            }
            .sub {
              font-size: 14px;
              line-height: 150%;
            }
          }
        }
        .info-btn {
          font-size: 17px;
          img {
            width: 18px;
            margin-left: 6px;
          }
        }
      }
    }
  }
}
/*540*/
@media screen and (min-width: 500px) and (max-width: 749px) {
  .info {
    padding: 0 3%;
    display: flex;
    flex-direction: column;
    &-m-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 32px;
        line-height: 36px;
        margin-bottom: 16px;
      }
      .sub {
        font-size: 18px;
        line-height: 24px;
        padding: 0 2%;
      }
    }
    &-pic {
      width: 100%;
      height: 460px;
      padding: 0px;
      flex: unset;
      img {
        width: 90%;
      }
      &-slider {
        bottom: 12px;
        background-color: #1b212e;
        margin: 0 120px;
        padding: 8px;
        border-radius: 20px;
        > div {
          width: 26px;
          height: 26px;
          margin: 0 14px;
          border-radius: 50%;
        }
      }
    }
    &-mainer {
      display: none;
    }
    &-m-body {
      display: block;
      .list-item {
        background-image: linear-gradient(to left top, #5ad5d5, #3ea9cc);
        border-radius: 8px;
        margin: 16px;
        min-height: 136px;
        padding: 36px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .title {
          font-size: 28px;
          line-height: 32px;
          margin-bottom: 22px;
        }
        .sub {
          font-size: 20px;
          line-height: 150%;
        }
        .start {
          margin-top: 5%;
          text-align: end;
          font-size: 22px;
          font-weight: bold;
          img {
            margin-left: 6px;
            width: 18px;
          }
        }
      }
    }
  }
}
/*320*/
@media screen and (min-width: 300px) and (max-width: 499px) {
  .info {
    padding: 0 3%;
    display: flex;
    flex-direction: column;
    &-m-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 22px;
        line-height: 24px;
        margin-bottom: 16px;
      }
      .sub {
        font-size: 12px;
        line-height: 24px;
        padding: 0 2%;
      }
    }
    &-pic {
      width: 100%;
      height: 320px;
      padding: 0px;
      flex: unset;
      img {
        width: 90%;
      }
      &-slider {
        bottom: 12px;
        background-color: #1b212e;
        margin: 0 60px;
        padding: 8px;
        border-radius: 20px;
        > div {
          width: 15px;
          height: 15px;
          margin: 0 14px;
          border-radius: 50%;
        }
      }
    }
    &-mainer {
      display: none;
    }
    &-m-body {
      display: block;
      .list-item {
        background-image: linear-gradient(to left top, #5ad5d5, #3ea9cc);
        border-radius: 8px;
        margin: 10px;
        min-height: 100px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .title {
          font-size: 16px;
          line-height: 32px;
          margin-bottom: 6px;
        }
        .sub {
          font-size: 14px;
          line-height: 150%;
        }
        .start {
          margin-top: 5%;
          text-align: end;
          font-size: 16px;
          font-weight: bold;
          img {
            margin-left: 4px;
            width: 13px;
          }
        }
      }
    }
  }
}
</style>
