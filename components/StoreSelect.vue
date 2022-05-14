<template>
  <!-- 交易所開始 -->
  <div class="store">
    <div class="store-select">
      <div class="title">{{ $t('exchange') }}</div>
      <div class="select">
        <img src="@/assets/img/common/bybit_w.png" alt="bybit" />
        <!-- <i class="el-icon-caret-bottom bottom-icon"></i> -->
      </div>
    </div>
    <div v-if="!hideInfo" v-loading="exchangeLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="store-info">
      <div class="info-header">
        <div class="title">{{ $t('your_profit') }}</div>
        <div class="link">
          <el-tooltip effect="dark" :content="$t('go_to__withdrawal_address')" placement="top">
            <NuxtLink :to="{ name: 'lang-personal', query: { tab: 'take-cash-adress' }, params: { lang: $route.params.lang } }">
              <img src="@/assets/img/common/arrow-right.png" alt="arrow-right" />
            </NuxtLink>
          </el-tooltip>
        </div>
      </div>
      <div class="info-body">
        <div v-for="(coinData, index) in exchangeList" :key="index" class="info-item">
          <CoinIcon class="coin-icon" :coin-type="$map.currencyMap[coinData.currencyType]" />
          <div class="coin-name">{{ $map.currencyMap[coinData.currencyType] }}</div>
          <div class="coin-count">{{ coinData.coinCount }}</div>
          <template v-if="deviceWidth > 960">
            <!-- <NuxtLink
              :to="{ name: 'lang-personal', query: { tab: 'take-cash-adress' },  params: { lang: $route.params.lang } }"
              v-if="coinData.bindStatus === 0"
              class="coin-status unbind"
            >
              未綁定
            </NuxtLink> -->
            <div v-if="coinData.bindStatus === 0" class="coin-status unbind">{{ $t('unbind') }}</div>
            <div v-if="coinData.bindStatus === 1" class="coin-status bind">{{ $t('bound') }}</div>
          </template>
          <template v-else>
            <!-- <NuxtLink :to="{ name: 'lang-personal', query: { tab: 'take-cash-adress' },  params: { lang: $route.params.lang } }">
              <img v-if="coinData.bindStatus === 0" src="@/assets/img/dashboard/close-circle.png" alt="close-circle" style="width: 15px" />
            </NuxtLink> -->
            <img v-if="coinData.bindStatus === 0" src="@/assets/img/dashboard/close-circle.png" alt="close-circle" style="width: 15px" />
            <img v-if="coinData.bindStatus === 1" src="@/assets/img/dashboard/check-circle.png" alt="check-circle" style="width: 15px" />
          </template>
        </div>
      </div>
    </div>
  </div>
  <!-- 交易所結束 -->
</template>

<script>
export default {
  name: 'StoreSelect',
  props: {
    hideInfo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      exchangeLoading: false
    }
  },
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    },
    exchangeList() {
      return this.$store.state.dashboard.storeList
    }
  },
  async mounted() {
    this.getExchangeInfo()
  },
  methods: {
    // 交易所
    async getExchangeInfo() {
      this.exchangeLoading = true
      try {
        const res = await this.$store.dispatch('dashboard/getExchangeInfo')
        this.$emit('getStoreInfo', res)
      } catch (error) {
        console.error(error)
      }
      this.exchangeLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.store {
  flex: 1;
  &-select {
    height: 80px;
    margin-bottom: 8px;
    background-color: #151923;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 32px;
    @media screen and (max-width: 1370px) {
      padding: 0px 20px;
    }
    @media screen and (max-width: 960px) {
      height: 56px;
      padding: 0px 12px;
    }
    @media screen and (max-width: 700px) {
      margin-bottom: 16px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      @media screen and (max-width: 960px) {
        font-size: 18px;
      }
    }
    .select {
      display: flex;
      align-items: center;
      img {
        width: 74px;
        @media screen and (max-width: 960px) {
          width: 60px;
        }
      }
      .bottom-icon {
        font-size: 22px;
        margin-left: 22px;
        @media screen and (max-width: 960px) {
          font-size: 18px;
          margin-left: 18px;
        }
      }
    }
  }
  &-info {
    background-color: #151923;
    border-radius: 6px;
    padding: 0px 32px 32px 32px;
    min-height: 400px;
    @media screen and (max-width: 1370px) {
      padding: 0px 20px 20px 20px;
    }
    @media screen and (max-width: 960px) {
      padding: 0px 12px 12px 12px;
      min-height: 320px;
    }
    @media screen and (max-width: 700px) {
      margin-bottom: 16px;
    }
    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      @media screen and (max-width: 960px) {
        height: 50px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        @media screen and (max-width: 960px) {
          font-size: 18px;
        }
      }
      .link {
        cursor: pointer;
        img {
          width: 20px;
          @media screen and (max-width: 960px) {
            width: 16px;
          }
        }
      }
    }
    .info-body {
      .info-item {
        display: flex;
        align-items: center;
        height: 60px;
        @media screen and (max-width: 960px) {
          height: 50px;
        }
        .coin-icon {
          width: 36px;
          margin-right: 14px;
          @media screen and (max-width: 960px) {
            width: 28px;
            margin-right: 14px;
          }
        }
        .coin-name {
          width: 80px;
          margin-right: 12px;
          font-family: 'Avenir';
          font-weight: 500;
          font-size: 18px;
          @media screen and (max-width: 1370px) {
            width: 50px;
          }
          @media screen and (max-width: 960px) {
            width: 36px;
            font-size: 14px;
          }
        }
        .coin-count {
          flex: 2;
          font-family: 'Avenir';
          font-weight: 800;
          font-size: 18px;
          color: #62ffff;
          @media screen and (max-width: 960px) {
            font-size: 14px;
          }
        }
        .coin-status {
          flex: 1;
          text-align: end;
          font-size: 15px;
          &.bind {
            color: #62ffffb3;
          }
          &.unbind {
            color: #eb4664;
            // text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
