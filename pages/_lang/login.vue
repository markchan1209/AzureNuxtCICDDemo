<template>
  <div class="login-bg">
    <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="login-main-block">
      <div class="main">
        <input v-show="false" type="text" name="username" />
        <input v-show="false" type="password" name="password" />
        <!-- <div class="m-logo">
          <NuxtLink :to="{ name: 'lang-home', params: { lang: $route.params.lang } }">
            <img src="@/assets/img/nav/logo.png" alt="m-logo-img" class="m-logo-img" />
          </NuxtLink>
        </div> -->
        <div class="title">{{ $t('member_login') }}</div>
        <div class="login-main">
          <div class="title">{{ $t('email') }}</div>
          <input v-model="formData.account" type="text" class="input" placeholder="example@mail.com" autocomplete="off" />
        </div>

        <div class="login-main">
          <div class="title">{{ $t('password') }}</div>
          <input
            v-model="formData.password"
            :type="passwordType"
            class="input"
            :placeholder="$t('enter_en_number', { number: '6' })"
            autocomplete="off"
          />
          <CommonPasswordIcon :pwd-type.sync="passwordType" />
        </div>

        <div class="login-main">
          <div class="title flex-center" style="justify-content: flex-start">
            {{ $t('captcha') }}：
            <img v-if="captchaImg" :src="`data:image\/(png|jpg);base64,${captchaImg}`" alt="captchaImg" style="width: 80px" />
            <div v-else v-loading="true" style="height: 35px; width: 80px" element-loading-background="rgba(0, 0, 0, 0.5)"></div>
            <i class="el-icon-refresh-right captcha-refresh" @click="init"></i>
          </div>
          <input v-model="formData.captchaCode" type="text" class="input" :placeholder="$t('please_enter_captcha')" />
        </div>

        <div class="login-main flex-center">
          <span class="text-link" @click="$router.push({ name: 'lang-reset-password', params: { lang: $route.params.lang } })">
            {{ $t('forget_password') }} {{ $t('reset_password') }}
          </span>
        </div>

        <a href="javascript:void(0)" class="fdb-btn-primary-hover login-main-btn" @click="doLogin">{{ $t('login') }}</a>
        <div class="login-main-tips">
          {{ $t('havent_created_account') }}？
          <span class="text-link" @click="$router.push({ name: 'lang-register', params: { lang: $route.params.lang } })">
            {{ $t('register') }}
          </span>
        </div>
      </div>
    </div>

    <div class="login-kv-block">
      <!-- <NuxtLink :to="{ name: 'HomeLang', params: { lang: $route.params.lang } }" class="logo">
        <img src="@/assets/img/nav/logo.png" alt="logo" />
      </NuxtLink> -->
    </div>

    <el-dialog :title="$t('login_fail')" :visible.sync="validateEmail.show" width="310px" :show-close="false" custom-class="fbd-dialog">
      <div v-if="!validateEmail.hasSent">
        <div style="color: #eb4664; margin-bottom: 12px; text-align: center">{{ $t('unconfirmed_account') }}</div>
        <div style="text-align: center">{{ $t('please_check_your_email_receive') }}</div>
      </div>
      <div v-else style="text-align: center">{{ $t('certification_letter_resent') }}</div>
      <span slot="footer">
        <template v-if="!validateEmail.hasSent">
          <div
            v-loading="validateEmail.loading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
            class="fdb-btn-primary"
            style="padding: 0 12px; margin-right: 8px"
            @click="reSentEmail"
          >
            {{ $t('re_send_certification_letter') }}
          </div>
          <div class="fdb-btn-default" style="padding: 0 12px" @click="validateEmail.show = false">{{ $t('cancel') }}</div>
        </template>
        <div v-else class="fdb-btn-default" @click="validateEmail.show = false">{{ $t('close') }}</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      passwordType: 'password',
      formData: {
        account: '',
        password: '',
        captchaCode: '',
        uuid: ''
      },
      captchaImg: '',
      validateEmail: {
        show: false,
        loading: false,
        hasSent: false
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        this.formData.captchaCode = ''
        this.formData.uuid = ''
        this.captchaImg = ''
        const res = await this.$api.user.getCaptchaImage()
        this.captchaImg = res.img
        this.formData.uuid = res.uuid
      } catch (error) {
        console.error(error)
      }
    },
    async doLogin() {
      this.isLoading = true
      try {
        // 驗證相關
        await this.validate()
        const postData = {
          account: this.formData.account,
          password: this.formData.password,
          captchaCode: this.formData.captchaCode,
          uuid: this.formData.uuid
        }
        // result = 1 的時候是登入成功
        const res = await this.$store.dispatch('user/login', postData)
        this.$store.commit('user/SET_TOKEN', res.data)
        this.$message.success(this.$t('login_success'))
        this.$router.push({ name: 'lang-dashboard', params: { lang: this.$route.params.lang } }, () => {})
      } catch (error) {
        if (!error.isHttpError) {
          this.$message.error(error.message)
        } else if (error.response?.data?.result === 2) {
          // result = 2 信箱未驗證
          this.validateEmail.show = true
          this.validateEmail.hasSent = false
        } else if (error.response?.data?.result === 3) {
          // result = 3 驗證碼錯誤 要重刷
          this.init()
        }
        console.error(error)
      }
      this.isLoading = false
    },
    // 驗證相關
    async validate() {
      // 電子郵件：與範例一致 example@mail.com
      if (!/\S+@\S+.\S+/.test(this.formData.account)) {
        return Promise.reject(new Error(`${this.$t('email')}：${this.$t('enter_correct_email')}`))
      }
      // 密碼：6位數以上，含英數字，不含特殊符號
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(this.formData.password)) {
        return Promise.reject(new Error(`${this.$t('password')}：${this.$t('enter_number_slot', { number: '6' })}`))
      }
      // 圖形驗證碼必填
      if (!this.formData.captchaCode) {
        return Promise.reject(new Error(this.$t('please_enter_captcha')))
      }
      return 'done'
    },
    // 重新寄發驗證信
    async reSentEmail() {
      this.validateEmail.loading = true
      try {
        const reqBody = {
          email: this.formData.account,
          password: this.formData.password
        }
        await this.$api.user.reSendCheckMail(reqBody)
        this.validateEmail.hasSent = true
      } catch (e) {
        console.error(e)
      }
      this.validateEmail.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.captcha-refresh {
  font-size: 24px;
  margin-left: 8px;
  cursor: pointer;
}
.text-link {
  color: #62ffff;
  cursor: pointer;
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
</style>
