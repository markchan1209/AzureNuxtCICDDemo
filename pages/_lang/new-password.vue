<template>
  <div class="newpwd-bg">
    <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="newpwd-main-block">
      <div class="main">
        <input v-show="false" type="text" name="username" />
        <input v-show="false" type="password" name="password" />
        <!-- <div class="m-logo">
          <NuxtLink :to="{ name: 'lang-home', params: { lang: $route.params.lang } }">
            <img src="@/assets/img/nav/logo.png" alt="m-logo-img" class="m-logo-img" />
          </NuxtLink>
        </div> -->
        <div class="title">{{ $t('build_password') }}</div>
        <div class="newpwd-sub">{{ $t('enter_new_password_1') }}<br />{{ $t('enter_new_password_2') }}</div>

        <div class="newpwd-main">
          <div class="title">{{ $t('password') }}</div>
          <input
            v-model="formData.newPassword"
            :type="passwordType"
            class="input"
            :placeholder="$t('enter_en_number', { number: '6' })"
            autocomplete="off"
          />
          <CommonPasswordIcon :pwd-type.sync="passwordType" />
        </div>

        <div class="newpwd-main" style="margin-bottom: 60px;">
          <div class="title">{{ $t('check_again') }}</div>
          <input
            v-model="formData.doubleCheck"
            :type="checkPasswordType"
            class="input"
            :placeholder="$t('enter_en_number', { number: '6' })"
            autocomplete="off"
          />
          <CommonPasswordIcon :pwd-type.sync="checkPasswordType" />
        </div>

        <a href="javascript:void(0)" class="fdb-btn-primary-hover newpwd-main-btn" @click="resetPassword">{{ $t('save_password') }}</a>
      </div>
    </div>

    <div class="newpwd-kv-block">
      <!-- <NuxtLink :to="{ name: 'lang-home', params: { lang: $route.params.lang } }" class="logo">
        <img src="@/assets/img/nav/logo.png" alt="logo" />
      </NuxtLink> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPassword',
  data() {
    return {
      isLoading: false,
      passwordType: 'password',
      checkPasswordType: 'password',
      formData: {
        newPassword: '',
        doubleCheck: ''
      }
    }
  },
  mounted() {
    if (!this.$route.query.AuthCore) {
      this.$message.error(this.$t('useless_pages'))
      this.$router.push({ name: 'lang-home', params: { lang: this.$route.params.lang } })
    }
  },
  methods: {
    async resetPassword() {
      this.isLoading = true
      try {
        await this.validate()
        await this.$api.user.setNewPassword({ core: this.$route.query.AuthCore, newPassword: this.formData.newPassword })
        this.$message.success(this.$t('setting_success'))
        this.$router.push({ name: 'lang-login', params: { lang: this.$route.params.lang } })
      } catch (error) {
        if (!error.isHttpError) {
          this.$message.error(error.message)
        }
        console.error(error)
      }
      this.isLoading = false
    },
    async validate() {
      // 新密碼：6位數以上，含英數字，不含特殊符號
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(this.formData.newPassword)) {
        return Promise.reject(new Error(`${this.$t('password')}：${this.$t('enter_en_number', { number: '6' })}`))
      }
      // 確認密碼：密碼要與新密碼一致
      if (this.formData.newPassword !== this.formData.doubleCheck) {
        return Promise.reject(new Error(this.$t('check_password_unanimous')))
      }
      return 'done'
    }
  }
}
</script>

<style lang="scss" scoped>
.newpwd-sub {
  margin-bottom: 40px;
}
</style>
