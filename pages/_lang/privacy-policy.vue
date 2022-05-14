<template>
  <div class="privacy">
    <div class="banner">
      <div class="banner-title">{{ $t('privacy_policy') }}</div>
    </div>
    <!-- 目前就中文及英文兩個版本 -->
    <LocalePrivacyPolicyTW v-show="showLang === 'TW'" />
    <LocalePrivacyPolicyEN v-show="showLang === 'EN'" />
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  computed: {
    showLang() {
      switch (this.$route.params.lang) {
        case 'TW':
        case 'CN':
          return 'TW'
        case 'EN':
        case 'JP':
        case 'KR':
          return 'EN'
        default:
          return 'EN'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.privacy {
  .banner {
    position: relative;
    height: 30vw;
    background-image: url('../../assets/img/common/policy.png');
    background-size: cover;
    &-title {
      position: absolute;
      top: 35%;
      left: 12%;
      font-size: 80px;
      font-weight: bold;
      color: #ffffff;
      letter-spacing: 0.1em;
    }
  }
  ::v-deep .body {
    padding: 0 5vw;
    color: #e5e5e5;
    font-size: 18px;
    line-height: 32px;
    letter-spacing: 0.05em;
    .content-title {
      font-weight: bold;
      font-size: 28px;
      margin-top: 2em;
      margin-bottom: 1em;
      color: #ffffff;
    }
    .content-subtitle {
      font-weight: bold;
      color: #ffffff;
      line-height: 42px;
    }
    .content-info {
      margin-bottom: 2vw;
    }
    .content-bottom {
      height: 30vw;
    }
  }
}

/*1024*/
@media screen and (min-width: 1000px) and (max-width: 1346px) {
  .privacy {
    .banner {
      &-title {
        top: 30%;
      }
    }
  }
}
/*768*/
@media screen and (min-width: 750px) and (max-width: 999px) {
  .privacy {
    .banner {
      &-title {
        top: 32%;
        left: 10%;
        font-size: 50px;
      }
    }
    ::v-deep .body {
      .content-info {
        margin-bottom: 5vw;
      }
    }
  }
}
/*540*/
@media screen and (min-width: 500px) and (max-width: 749px) {
  .privacy {
    .banner {
      height: 80vw;
      background-position: 58%;
      margin-bottom: 4vw;
      &-title {
        font-size: 60px;
      }
    }
    ::v-deep .body {
      .content-info {
        margin-bottom: 5vw;
      }
    }
  }
}
/*320*/
@media screen and (min-width: 300px) and (max-width: 499px) {
  .privacy {
    .banner {
      height: 80vw;
      background-position: 58%;
      margin-bottom: 4vw;
      &-title {
        font-size: 38px;
        top: 40%;
        left: 10%;
      }
    }
    ::v-deep .body {
      .content-info {
        margin-bottom: 5vw;
      }
    }
    ::v-deep .body {
      font-size: 16px;
      .content-title {
        font-size: 24px;
      }
      .content-info {
        margin-bottom: 10vw;
      }
    }
  }
}
</style>
