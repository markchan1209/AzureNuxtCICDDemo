<template>
  <div v-bind="$attrs" v-on="$listeners" class="container" :class="{ disabled: disabled }">
    <img v-if="coinType === 'BTC' && !active" src="@/assets/img/currency-icon/BTC.png" alt="BTC" />
    <img v-if="coinType === 'BTC' && active" src="@/assets/img/currency-icon/BTC-active.png" alt="BTC" />
    <img v-if="coinType === 'EOS' && !active" src="@/assets/img/currency-icon/EOS.png" alt="EOS" />
    <img v-if="coinType === 'EOS' && active" src="@/assets/img/currency-icon/EOS-active.png" alt="EOS" />
    <img v-if="coinType === 'ETH' && !active" src="@/assets/img/currency-icon/ETH.png" alt="ETH" />
    <img v-if="coinType === 'ETH' && active" src="@/assets/img/currency-icon/ETH-active.png" alt="ETH" />
    <img v-if="coinType === 'USDT' && !active" src="@/assets/img/currency-icon/USDT.png" alt="USDT" />
    <img v-if="coinType === 'USDT' && active" src="@/assets/img/currency-icon/USDT-active.png" alt="USDT" />
    <img v-if="coinType === 'XRP' && !active" src="@/assets/img/currency-icon/XRP.png" alt="XRP" />
    <img v-if="coinType === 'XRP' && active" src="@/assets/img/currency-icon/XRP-active.png" alt="XRP" />
  </div>
</template>

<script>
export default {
  name: 'CoinIcon',
  props: {
    coinType: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: inline-flex;
}
.disabled {
  filter: opacity(0.3);
  pointer-events: none;
}
</style>
