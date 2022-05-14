<template>
  <div class="register-bg">
    <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="register-main-block">
      <div class="main">
        <input v-show="false" type="text" name="username" />
        <input v-show="false" type="password" name="password" />
        <!-- <div class="m-logo">
          <NuxtLink :to="{ name: 'HomeLang', params: { lang: $route.params.lang } }">
            <img src="@/assets/img/nav/logo.png" alt="m-logo-img" class="m-logo-img" />
          </NuxtLink>
        </div> -->
        <div class="title">{{ $t('build_account') }}</div>
        <div class="register-main">
          <div class="title">*{{ $t('user_name') }}</div>
          <input v-model="formData.name" type="text" class="input" :placeholder="$t('please_enter_user_name')" />
        </div>

        <div class="register-main">
          <div class="title">*{{ $t('email') }}</div>
          <input v-model="formData.email" type="text" class="input" placeholder="example@mail.com" />
        </div>

        <div class="register-main">
          <div class="title">{{ $t('mobile_phone') }}</div>
          <div class="split-input">
            <el-select
              v-model="formData.areaCode"
              class="fdb-select input select-L"
              popper-class="fdb-select"
              style="width: 90px; margin-right: 8px; padding-left: 0px"
            >
              <el-option v-for="(phoneArea, index) in $map.phoneAreaCode" :key="index" :label="phoneArea.code" :value="phoneArea.code">
                <span style="float: left; color: #cccccc; margin-right: 26px">{{ phoneArea.country }}</span>
                <span style="float: right">{{ phoneArea.code }}</span>
              </el-option>
            </el-select>
            <input v-model="formData.phone" type="text" class="input" style="flex: 1" placeholder="912345678" autocomplete="off" />
          </div>
        </div>

        <div class="register-main">
          <div class="title">*{{ $t('password') }}</div>
          <input
            v-model="formData.password"
            :type="passwordType"
            class="input"
            :placeholder="$t('enter_en_number', { number: '6' })"
            autocomplete="off"
          />
          <CommonPasswordIcon :pwd-type.sync="passwordType" />
        </div>

        <div class="register-main">
          <div class="title">{{ $t('invite_code') }}</div>
          <input v-model="formData.invitCode" type="text" class="input" :placeholder="$t('enter_recommender_invite')" />
        </div>

        <div class="register-main" style="display: flex;">
          <!-- <input v-model="formData.checkContract" type="checkbox" class="check" /> -->
          <div class="check" @click="formData.checkContract = !formData.checkContract">
            <i v-if="formData.checkContract" class="el-icon-check" style="color: #62ffff"></i>
          </div>
          <div class="check-title">
            <i18n path="i_have_read_and_agree">
              <NuxtLink
                place="service"
                :to="{ name: 'lang-disclaimer', params: { lang: $route.params.lang } }"
                v-slot="{ navigate }"
                custom
              >
                <span class="text-link" @click="navigate">{{ $t('service') }}</span>
              </NuxtLink>
              <NuxtLink
                place="privacy_policy"
                :to="{ name: 'lang-privacy-policy', params: { lang: $route.params.lang } }"
                v-slot="{ navigate }"
                custom
              >
                <span class="text-link" @click="navigate">{{ $t('privacy_policy') }}</span>
              </NuxtLink>
            </i18n>
          </div>
        </div>

        <!-- 註冊按鈕
        預設為disable狀態，填選完也勾選隱私條款後，
        才會顯示可點擊狀態

        點擊註冊後，（同時寄出信箱驗證連結）顯示彈跳式窗，請使用者立即驗證信箱，若尚未驗證完成這個帳號就不算註冊成功

        點擊信箱url請導入登入畫面 -->
        <a href="javascript:void(0)" class="register-main-btn fdb-btn-primary-hover" @click="doRegister">{{ $t('register') }}</a>
        <div class="register-main-tips">
          <i18n path="has_account" for="login">
            <span class="text-link" @click="$router.push({ name: 'lang-login', params: { lang: $route.params.lang } })">
              {{ $t('login') }}
            </span>
          </i18n>
        </div>
      </div>
    </div>

    <div class="register-kv-block">
      <!-- <NuxtLink :to="{ name: 'lang-home', params: { lang: $route.params.lang } }" class="logo">
        <img src="@/assets/img/nav/logo.png" alt="logo" />
      </NuxtLink> -->
    </div>
    <el-dialog
      :title="$t('mail_verification_notice')"
      :visible.sync="dialogVisible"
      width="300px"
      :show-close="false"
      custom-class="fbd-dialog"
    >
      <div style="text-align: center">
        <span>{{ $t('verification_email') }}</span>
      </div>
      <span slot="footer">
        <div class="fdb-btn-primary" @click="dialogVisible = false">{{ $t('close') }}</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      passwordType: 'password',
      isLoading: false,
      dialogVisible: false,
      formData: {
        name: '',
        email: '',
        areaCode: '886',
        phone: '',
        password: '',
        invitCode: '',
        checkContract: false
      }
    }
  },
  mounted() {
    this.formData.invitCode = this.$route.query.inviteCode || ''
  },
  methods: {
    async doRegister() {
      this.isLoading = true
      try {
        // 驗證相關
        await this.validate()
        const postData = {
          name: this.formData.name,
          email: this.formData.email,
          areaCode: this.formData.areaCode,
          phone: this.formData.phone,
          password: this.formData.password,
          invitCode: this.formData.invitCode
        }
        await this.$api.user.register(postData)
        this.dialogVisible = true
      } catch (error) {
        if (!error.isHttpError) {
          this.$message.error(error.message)
        }
        console.error(error.message)
      }
      this.isLoading = false
    },
    // 驗證相關
    async validate() {
      // 使用者名稱：僅限英文15字串以內，名稱不可重複（需檢查）
      // if (!/^[a-zA-Z]{1,15}$/.test(this.formData.name)) {
      //   return Promise.reject(new Error('使用者名稱：僅限英文15字串以內'))
      // }
      // 電子郵件：與範例一致 example@mail.com
      if (!/\S+@\S+.\S+/.test(this.formData.email)) {
        return Promise.reject(new Error(this.$t('please_enter_correct_email')))
      }
      // 行動電話：僅限數字不含特殊符號
      if (this.formData.phone !== '' && !/^\d+$/.test(this.formData.phone)) {
        return Promise.reject(new Error(this.$t('m_phone_enter_number')))
      }
      // 密碼：6位數以上，含英數字，不含特殊符號
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(this.formData.password)) {
        return Promise.reject(new Error(this.$t('password_en_number')))
      }
      // 邀請碼：8位數，含英數字，不含特殊符號
      // if (this.formData.invitCode && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/.test(this.formData.invitCode)) {
      //   return Promise.reject(new Error(this.$t('invite_code_validate')))
      // }
      // 隱私條件需勾選，才可以點擊註冊
      if (!this.formData.checkContract) {
        return Promise.reject(new Error(this.$t('privacy_conditions_need_checked')))
      }
      return 'done'
    }
  }
}
</script>

<style lang="scss" scoped>
.split-input {
  float: left;
  display: flex;
  width: 100%;
  .input {
    height: 42px;
    float: left;
    font-size: 16px;
    color: #c4c4c4;
    border: none;
    background: #252c3d;
    box-sizing: border-box;
    border-radius: 8px;
    padding-left: 10px;
  }
}

/* Change the white to any color ;) */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  caret-color: #fff;
  box-shadow: 0 0 0 30px #252c3d inset !important;
  -webkit-box-shadow: 0 0 0 30px #252c3d inset !important;
  -webkit-text-fill-color: #c4c4c4 !important;
}

.register-main {
  .check {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
