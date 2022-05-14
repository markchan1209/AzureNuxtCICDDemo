<template>
  <div v-loading="isBindLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="personal-function-main exchange-site">
    <div class="title">{{ $t('bound_exchange') }}</div>
    <div class="sub">
      {{ $t('to_protect_account_security_1') }}<br />
      {{ $t('to_protect_account_security_2') }}
    </div>
    <div class="exchange-block">
      <div class="main">
        <div>
          <div class="title">*{{ $t('select_exchange') }}</div>
          <div class="split-input" style="align-items: center; background-color: #252c3d; border-radius: 4px;">
            <el-select
              v-model="formData.csgid"
              class="fdb-select input select-M"
              popper-class="fdb-select"
              style="padding-left: 0px; flex: 1"
            >
              <el-option v-for="(csg, index) in csgList" :key="index" :label="csg.csgName" :value="csg.csgid" />
            </el-select>
            <a v-if="formData.csgid !== ''" class="text-link exchange-link" href="https://partner.bybit.com/b/fundobit" target="_blank">
              {{ selectedCsg.csgName }} {{ $t('register_link') }}
            </a>
          </div>
        </div>
        <div>
          <div class="title">*{{ $t('exchange_uid') }}</div>
          <input v-model="formData.fdB_UID" type="text" class="input" :placeholder="$t('enter_exchange_uid')" />
        </div>
      </div>
      <div class="main">
        <div>
          <div class="title">{{ $t('mobile_phone') }}</div>
          <div class="split-input">
            <el-select
              v-model="formData.areaCode"
              class="fdb-select input select-M"
              popper-class="fdb-select"
              style="width: 80px; margin-right: 8px"
            >
              <el-option v-for="(phoneArea, index) in $map.phoneAreaCode" :key="index" :label="phoneArea.code" :value="phoneArea.code">
                <span style="float: left; color: #cccccc; margin-right: 26px">{{ phoneArea.country }}</span>
                <span style="float: right">{{ phoneArea.code }}</span>
              </el-option>
            </el-select>
            <input
              v-model="formData.phone"
              type="text"
              class="input"
              style="flex: 1"
              :placeholder="$t('please_enter_phone')"
              autocomplete="off"
            />
          </div>
        </div>
        <div>
          <div class="title">{{ $t('email') }}</div>
          <input v-model="formData.email" type="text" class="input" :placeholder="$t('please_enter_email')" />
        </div>
      </div>
    </div>
    <div class="btns-block personal">
      <a href="javascript:void(0)" class="cancel fdb-btn-default-hover" @click="resetForm">{{ $t('clear') }}</a>
      <a href="javascript:void(0)" class="next fdb-btn-primary-hover" @click="validate">{{ $t('bind') }}</a>
    </div>

    <div class="personal-function-line"></div>
    <div class="personal-function-tips">{{ $t('exchange_verification_time') }}</div>
    <div v-for="(bind, index) in bindList" :key="index" class="personal-function-exchange-block">
      <div class="title">{{ index + 1 }}</div>
      <div>
        <img v-if="csgMap[bind.csgid]" :src="csgMap[bind.csgid].imageUrl" alt="bind-store-img" style="width: 60px" />
        <span class="uid" style="margin-left: 0" v-else>{{ $t('invalid_drawing') }}</span>
        <span class="uid">UID： {{ bind.fdB_UID }}</span>
      </div>
      <div :class="`status ${['red', 'green'][bind.status]}`">{{ [$t('verifying'), $t('verified')][bind.status] }}</div>
    </div>

    <!-- 再次確認彈窗 -->
    <el-dialog
      :title="$t('check_again_exchange_info')"
      :visible.sync="checkDialog.show"
      :width="deviceWidth > 500 ? '500px' : '300px'"
      :show-close="false"
      custom-class="fbd-dialog exchange-site-dialog"
    >
      <div class="check-tip">{{ $t('to_ensure_transaction_security') }}</div>
      <div class="check-content">
        <div class="check-content-item">
          <div class="title">{{ $t('bound_exchange') }}</div>
          <div class="value">{{ selectedCsg.csgName }}</div>
        </div>
        <div class="check-content-item">
          <div class="title">{{ $t('exchange_uid') }}</div>
          <div class="value">{{ formData.fdB_UID }}</div>
        </div>
        <div class="check-content-item">
          <div class="title">{{ $t('mobile_phone') }}</div>
          <div v-if="formData.phone" class="value">{{ formData.areaCode }} {{ formData.phone }}</div>
          <div v-else class="value" style="opacity: 0.6">{{ $t('unfilled') }}</div>
        </div>
        <div class="check-content-item">
          <div class="title">{{ $t('email') }}</div>
          <div v-if="formData.email" class="value">{{ formData.email }}</div>
          <div v-else class="value" style="opacity: 0.6">{{ $t('unfilled') }}</div>
        </div>
      </div>
      <span v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" slot="footer">
        <div class="fdb-btn-default" style="margin-right: 12px" @click="checkDialog.show = false">{{ $t('return') }}</div>
        <div class="fdb-btn-primary" @click="bindCSG">{{ $t('bind') }}</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ExchangeControl',
  data() {
    return {
      isLoading: false,
      isBindLoading: false,
      formData: {
        csgid: '',
        areaCode: '886',
        phone: '',
        fdB_UID: '',
        email: ''
      },
      checkDialog: {
        show: false
      }
    }
  },
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    },
    csgList() {
      return this.$store.state.app.csgList
    },
    csgMap() {
      return this.$store.state.app.csgMap
    },
    bindList() {
      return this.$store.state.user.bindStores
    },
    selectedCsg() {
      const findData = this.csgList.find(item => item.csgid === this.formData.csgid)
      return findData || {}
    }
  },
  watch: {
    csgList: {
      immediate: true,
      handler(val) {
        if (val.length > 0) {
          this.formData.csgid = val[0].csgid
        }
      }
    }
  },
  mounted() {
    this.getBindStores()
  },
  methods: {
    resetForm() {
      this.formData = {
        csgid: this.csgList[0] ? this.csgList[0].csgid : '',
        areaCode: '886',
        phone: '',
        fdB_UID: '',
        email: ''
      }
    },
    // 綁定規則
    // 一個交易所僅限綁定三次，若三次驗證皆失敗，將鎖定綁定該交易所權限，並通知由客服進行解鎖
    // 左側會呈現該交易所是否驗證成功，無論成功或失敗，後台都會寄出一份驗證通知書
    validate() {
      // 欄位內的規則
      // 選擇交易所：只顯示與fdb合作的交易所，文字即可
      if (!this.formData.csgid) {
        return this.$message.error(this.$t('please_select_exchange'))
      }
      // 交易所 ID ：英文＋數字十位數以內(bybit) ，不含特殊符號
      // if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,10}$/.test(this.formData.fdB_UID)) {
      //   return this.$message.error('交易所 ID ：英文＋數字十位數以內(bybit) ，不含特殊符號')
      // }
      if (!this.formData.fdB_UID) {
        return this.$message.error(this.$t('please_enter_exchange_id'))
      }
      // 交易所 ID ：UID 數字限制 5~16
      if (!/^\d{5,16}$/.test(this.formData.fdB_UID)) {
        return this.$message.error('UID: ' + this.$t('enter_number_range', ['5', '16']))
      }
      // 行動電話：僅限數字不含特殊符號
      if (this.formData.phone && !/^\d+$/.test(this.formData.phone)) {
        return this.$message.error(this.$t('m_phone_enter_number'))
      }
      // 電子郵件：與範例一致 example@mail.com
      if (this.formData.email && !/\S+@\S+.\S+/.test(this.formData.email)) {
        return this.$message.error(this.$t('email_enter_correct'))
      }
      // 再次確認
      // 為了提升資訊填寫的正確性，點擊綁定後，在呈現一次自己所寫的資訊，做再次確認
      this.checkDialog.show = true
    },
    async bindCSG() {
      this.isLoading = true
      try {
        const postData = {
          csgid: this.formData.csgid,
          areaCode: this.formData.phone ? this.formData.areaCode : '',
          phone: this.formData.phone,
          fdB_UID: this.formData.fdB_UID,
          email: this.formData.email
        }
        await this.$api.user.bindCoinStoreData(postData)
        this.checkDialog.show = false
        this.resetForm()
        this.getBindStores()
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    // 取得已綁定交易所清單(需登入)
    async getBindStores() {
      this.isBindLoading = true
      try {
        await this.$store.dispatch('user/getBindStores')
      } catch (error) {
        console.error(error)
      }
      this.isBindLoading = false
    }
  }
}
</script>

<style lang="scss">
.exchange-site {
  .split-input {
    float: left;
    display: flex;
    width: calc(100% - 10px);
    .input {
      height: 38px;
      float: left;
      font-size: 12px;
      color: #c4c4c4;
      border: none;
      background: #252c3d;
      box-sizing: border-box;
      border-radius: 8px;
      &:last-child {
        padding-left: 10px;
      }
    }
    .exchange-link {
      padding: 0 8px;
      font-size: 12px;
    }
  }

  /* < 1300  */
  @media screen and (max-width: 1300px) {
    .split-input {
      width: calc(100% - 10px);
    }
  }
}

.exchange-site-dialog {
  .check-tip {
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    color: #eb4664;
    margin-bottom: 20px;
  }
  .check-content {
    padding: 20px;
    background: #050608;
    &-item {
      color: #e5e5e5;
      display: flex;
      width: 100%;
      margin: 8px 0;
      .title {
        width: 30%;
        line-height: 26px;
        text-align: end;
        word-break: break-word;
      }
      .value {
        flex: 1;
        display: flex;
        align-items: center;
        margin-left: 20px;
        line-height: 26px;
      }
    }
  }
}
</style>
