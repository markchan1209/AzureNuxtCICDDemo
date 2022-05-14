<template>
  <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" style="float: left">
    <div class="personal-function-main">
      <div class="sub">{{ $t('change_address_takes_one_week_1') }}<br />{{ $t('change_address_takes_one_week_2') }}</div>

      <div class="personal-take-cash-adress-main">
        <CommonCoinIcon class="icon" coin-type="BTC" />
        <div class="title">BTC</div>
        <input v-if="isEdit" v-model="formData.BTC.adress" type="text" class="main" :placeholder="$t('coin_adress', { coin: 'BTC' })" />
        <div v-else class="main" :style="{ opacity: formData.BTC.adress ? '1' : '0.5' }">{{ formData.BTC.adress || $t('unbind') }}</div>
      </div>

      <div class="personal-take-cash-adress-main">
        <CommonCoinIcon class="icon" coin-type="ETH" />
        <div class="title">ETH</div>
        <input v-if="isEdit" v-model="formData.ETH.adress" type="text" class="main" :placeholder="$t('coin_adress', { coin: 'ETH' })" />
        <div v-else class="main" :style="{ opacity: formData.ETH.adress ? '1' : '0.5' }">{{ formData.ETH.adress || $t('unbind') }}</div>
      </div>

      <!-- 1024 以上 -->
      <div v-if="deviceWidth >= 1000" class="personal-take-cash-adress-main">
        <CommonCoinIcon class="icon" coin-type="XRP" />
        <div class="title">XRP</div>
        <template v-if="isEdit">
          <input v-model="formData.XRP.adress" type="text" class="main first" :placeholder="$t('coin_adress', { coin: 'XRP' })" />
          <input
            v-model="formData.XRP.adress2"
            type="text"
            class="second input"
            :placeholder="$t('coin_adress2', { coinAdress2: 'XRP TAG' })"
          />
        </template>
        <template v-else>
          <div class="main first" :style="{ opacity: formData.XRP.adress ? '1' : '0.5' }">{{ formData.XRP.adress || $t('unbind') }}</div>
          <div class="second title">TAG</div>
          <div class="second content" :style="{ opacity: formData.XRP.adress2 ? '1' : '0.5' }">
            {{ formData.XRP.adress2 || $t('unbind') }}
          </div>
        </template>
      </div>

      <!-- 未滿 1024 -->
      <template v-else>
        <div class="personal-take-cash-adress-main" style="margin-bottom: 4px">
          <CommonCoinIcon class="icon" coin-type="XRP" />
          <div class="title">XRP</div>
          <input v-if="isEdit" v-model="formData.XRP.adress" type="text" class="main" :placeholder="$t('coin_adress', { coin: 'XRP' })" />
          <div v-else class="main" :style="{ opacity: formData.XRP.adress ? '1' : '0.5' }">{{ formData.XRP.adress || $t('unbind') }}</div>
        </div>
        <div class="personal-take-cash-adress-main">
          <CommonCoinIcon class="icon" coin-type="XRP" style="opacity: 0" />
          <div class="title">TAG</div>
          <input
            v-if="isEdit"
            v-model="formData.XRP.adress2"
            type="text"
            class="main"
            :placeholder="$t('coin_adress2', { coinAdress2: 'XRP TAG' })"
          />
          <div v-else class="main" :style="{ opacity: formData.XRP.adress2 ? '1' : '0.5' }">{{ formData.XRP.adress2 || $t('unbind') }}</div>
        </div>
      </template>

      <!-- 1024 以上 -->
      <div v-if="deviceWidth >= 1000" class="personal-take-cash-adress-main">
        <CommonCoinIcon class="icon" coin-type="EOS" />
        <div class="title">EOS</div>
        <template v-if="isEdit">
          <input v-model="formData.EOS.adress" type="text" class="main first" :placeholder="$t('coin_adress', { coin: 'EOS' })" />
          <input
            v-model="formData.EOS.adress2"
            type="text"
            class="second input"
            :placeholder="$t('coin_adress2', { coinAdress2: 'EOS MEMO' })"
          />
        </template>
        <template v-else>
          <div class="main first" :style="{ opacity: formData.EOS.adress ? '1' : '0.5' }">{{ formData.EOS.adress || $t('unbind') }}</div>
          <div class="second title">MEMO</div>
          <div class="second content" :style="{ opacity: formData.EOS.adress2 ? '1' : '0.5' }">
            {{ formData.EOS.adress2 || $t('unbind') }}
          </div>
        </template>
      </div>

      <!-- 未滿 1024 -->
      <template v-else>
        <div class="personal-take-cash-adress-main" style="margin-bottom: 4px">
          <CommonCoinIcon class="icon" coin-type="EOS" />
          <div class="title">EOS</div>
          <input v-if="isEdit" v-model="formData.EOS.adress" type="text" class="main" :placeholder="$t('coin_adress', { coin: 'EOS' })" />
          <div v-else class="main" :style="{ opacity: formData.EOS.adress ? '1' : '0.5' }">{{ formData.EOS.adress || $t('unbind') }}</div>
        </div>
        <div class="personal-take-cash-adress-main">
          <CommonCoinIcon class="icon" coin-type="EOS" style="opacity: 0" />
          <div class="title">MEMO</div>
          <input
            v-if="isEdit"
            v-model="formData.EOS.adress2"
            type="text"
            class="main"
            :placeholder="$t('coin_adress2', { coinAdress2: 'EOS MEMO' })"
          />
          <div v-else class="main" :style="{ opacity: formData.EOS.adress2 ? '1' : '0.5' }">{{ formData.EOS.adress2 || $t('unbind') }}</div>
        </div>
      </template>

      <div class="personal-take-cash-adress-main">
        <CommonCoinIcon class="icon" coin-type="USDT" />
        <div class="title">USDT</div>
        <input v-if="isEdit" v-model="formData.USDT.adress" type="text" class="main" :placeholder="$t('coin_adress', { coin: 'USDT' })" />
        <div v-else class="main" :style="{ opacity: formData.USDT.adress ? '1' : '0.5' }">{{ formData.USDT.adress || $t('unbind') }}</div>
      </div>
    </div>
    <div class="btns-block personal-info">
      <a v-if="!isEdit" href="javascript:void(0)" class="next fdb-btn-primary-hover" @click=";(isEdit = true), (hadChanged = false)">
        {{ $t('edit_adress') }}
      </a>
      <a v-if="isEdit" href="javascript:void(0)" class="cancel fdb-btn-default-hover" @click="cancelEdit">{{ $t('cancel') }}</a>
      <a v-if="isEdit" href="javascript:void(0)" class="next fdb-btn-primary-hover" :class="{ disabled: !hadChanged }" @click="saveAdress">
        {{ $t('save_and_verify') }}
      </a>
    </div>

    <!-- 信箱驗證碼彈窗 -->
    <el-dialog
      :title="$t('goto_fdb_email_verify')"
      :visible.sync="checkDialog.show"
      :width="deviceWidth > 500 ? '360px' : '300px'"
      :show-close="false"
      custom-class="fbd-dialog adress-site-dialog"
      top="30vh"
    >
      <div class="check-tip">{{ $t('enter_verification_code_in_ten') }}</div>
      <div class="check-content">
        <div class="title">{{ $t('verification_code') }}</div>
        <input v-model="authCore" class="input" type="text" :placeholder="$t('enter_verification_code')" />
      </div>
      <span v-loading="isValidLoading" element-loading-background="rgba(0, 0, 0, 0.5)" slot="footer">
        <div class="fdb-btn-default" style="margin-right: 12px" @click="checkDialog.show = false">{{ $t('cancel') }}</div>
        <div class="fdb-btn-primary" @click="validAdress">{{ $t('check') }}</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TakeCashAdress',
  data() {
    return {
      isLoading: false,
      isEdit: false,
      hadChanged: false,
      formData: {
        BTC: { adress: '', adress2: '' },
        XRP: { adress: '', adress2: '' },
        USDT: { adress: '', adress2: '' },
        EOS: { adress: '', adress2: '' },
        ETH: { adress: '', adress2: '' }
      },
      checkDialog: {
        show: false
      },
      isValidLoading: false,
      authCore: ''
    }
  },
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    }
  },
  watch: {
    formData: {
      handler: function(val) {
        this.hadChanged = true
      },
      deep: true
    }
  },
  mounted() {
    this.getAllWithdrawalAddress()
  },
  methods: {
    // 取得出金地址資訊
    async getAllWithdrawalAddress() {
      this.isLoading = true
      try {
        const res = await this.$api.user.getAllWithdrawalAddress()
        for (const item of res.data) {
          const key = this.$map.currencyMap[item.cid]
          this.formData[key].adress = item.coinAddress
          this.formData[key].adress2 = item.coinAddress2
        }
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    cancelEdit() {
      this.isEdit = false
      this.getAllWithdrawalAddress()
    },
    // 更新出金地址資訊-發驗證信
    async saveAdress() {
      this.isLoading = true
      try {
        this.validateForm()
        const postData = []
        for (const key of Object.keys(this.formData)) {
          postData.push({
            cid: this.$map.currencyIdMap[key],
            address: this.formData[key].adress,
            address2: this.formData[key].adress2,
            lang: this.$route.params.lang
          })
        }
        await this.$api.user.withdrawalDataUpdate(postData)
        this.authCore = ''
        this.checkDialog.show = true
      } catch (error) {
        if (!error.isHttpError) {
          this.$message.error(error.message)
        }
        console.error(error)
      }
      this.isLoading = false
    },
    // 欄位內的規則，每次儲存時需要驗證
    validateForm() {
      // BTC : 數字1＆3 開頭，26至37位區間英文大小寫+數字組成
      if (this.formData.BTC.adress && !/^[13](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{25,36}$/.test(this.formData.BTC.adress)) {
        throw new Error(this.$t('btc_verify'))
      }
      // XRP : r開頭
      if (this.formData.XRP.adress && !/^r.+/.test(this.formData.XRP.adress)) {
        throw new Error(this.$t('xrp_verify'))
      }
      if (this.formData.XRP.adress && !this.formData.XRP.adress2) {
        throw new Error('XRP : TAG ' + this.$t('unfilled'))
      }
      // USDT : 數字1＆3 & 0 開頭
      if (this.formData.USDT.adress && !/^[013].+$/.test(this.formData.USDT.adress)) {
        throw new Error(this.$t('usdt_verify'))
      }
      // 8/26 EOS 不驗證
      // EOS : 12個字符英文大小寫+數字組成
      // if (this.formData.EOS.adress && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12}$/.test(this.formData.EOS.adress)) {
      //   throw new Error('EOS : 12個字符英文大小寫+數字組成')
      // }
      if (this.formData.EOS.adress && !this.formData.EOS.adress2) {
        throw new Error('EOS : MEMO ' + this.$t('unfilled'))
      }
      // ETH : 數字0 開頭，42位英文大小寫+數字組成
      if (this.formData.ETH.adress && !/^[0](?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{41}$/.test(this.formData.ETH.adress)) {
        throw new Error(this.$t('eth_verify'))
      }
      return 'success'
    },
    // 驗證並且更新出金地址資訊
    async validAdress() {
      this.isValidLoading = true
      try {
        await this.$api.user.validWithdrawalData({ authCore: this.authCore })
        this.$message.success(this.$t('bind_success'))
        this.checkDialog.show = false
        this.cancelEdit()
      } catch (error) {
        console.log(error)
      }
      this.isValidLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.personal-take-cash-adress-main {
  .main.first {
    width: calc(100% - 400px);
    margin-right: 8px;
  }
  .second {
    width: 192px;
    float: left;
    font-size: 14px;
    &.title {
      position: relative;
      width: 72px;
      font-size: 20px;
      margin-right: 0;
      line-height: 50px;
      &::before {
        content: '';
        position: absolute;
        left: -10px;
        top: 20%;
        width: 1px;
        height: 34px;
        background-color: #ffffff;
      }
    }
    &.content {
      width: 120px;
      height: auto;
      line-height: 63px;
      color: #ffffff;
    }
    &.input {
      height: 42px;
      line-height: 42px;
      color: #c4c4c4;
      margin: 4px 0;
      border: none;
      background: #252c3d;
      box-sizing: border-box;
      border-radius: 8px;
      padding-left: 10px;
    }
  }
}
.adress-site-dialog {
  .check-tip {
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    color: #eb4664;
    margin-bottom: 20px;
  }
  .check-content {
    display: flex;
    align-items: center;
    .title {
      width: 100px;
      text-align: end;
      color: #fff;
      font-size: 18px;
      margin-right: 12px;
    }
    .input {
      flex: 1;
      line-height: 36px;
      font-size: 16px;
      color: #c4c4c4;
      margin: 4px 12px 4px 0;
      border: none;
      background: #252c3d;
      box-sizing: border-box;
      border-radius: 8px;
      padding-left: 10px;
    }
  }
}

.disabled {
  filter: opacity(0.3);
  pointer-events: none;
}
</style>
