<template>
  <div class="reset-bg">
    <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="reset-main-block">
      <div class="main">
        <input v-show="false" type="text" name="username" />
        <input v-show="false" type="password" name="password" />
        <!-- <div class="m-logo">
          <NuxtLink :to="{ name: 'HomeLang', params: { lang: $route.params.lang } }">
            <img src="@/assets/img/nav/logo.png" alt="m-logo-img" class="m-logo-img" />
          </NuxtLink>
        </div> -->
        <div class="title">{{ $t('reset_password') }}</div>
        <div class="reset-sub">{{ $t('enter_email_to_set_password') }}</div>
        <div class="reset-main" style="margin-bottom: 64px">
          <div class="title">*{{ $t('email') }}</div>
          <input v-model="email" type="text" class="input" placeholder="example@mail.com" autocomplete="off" />
        </div>

        <a href="javascript:void(0)" class="fdb-btn-primary-hover reset-main-btn" @click="submitReq">{{ $t('send_password_link') }}</a>
        <div class="reset-main-tips">
          <span class="text-link" @click="$router.push({ name: 'lang-login', params: { lang: $route.params.lang } })">
            {{ $t('return_login_page') }}
          </span>
        </div>
      </div>
    </div>

    <div class="reset-kv-block">
      <!-- <NuxtLink :to="{ name: 'HomeLang', params: { lang: $route.params.lang } }" class="logo">
        <img src="@/assets/img/nav/logo.png" alt="logo" />
      </NuxtLink> -->
    </div>

    <!-- 提示訊息彈窗 -->
    <el-dialog :title="$t('email_notify')" :visible.sync="dialogVisible" width="300px" :show-close="false" custom-class="fbd-dialog">
      <div style="text-align: center">
        <span>{{ $t('receiving_linked_letters') }}</span>
      </div>
      <span slot="footer">
        <div class="fdb-btn-primary" @click="dialogVisible = false">{{ $t('close') }}</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data() {
    return {
      isLoading: false,
      email: '',
      dialogVisible: false
    }
  },
  methods: {
    async submitReq() {
      this.isLoading = true
      try {
        await this.validate()
        await this.$api.user.resetPassword({ email: this.email })
        this.dialogVisible = true
      } catch (error) {
        if (!error.isHttpError) {
          this.$message.error(error.message)
        }
        console.error(error)
      }
      this.isLoading = false
    },
    async validate() {
      // 電子郵件：與範例一致 example@mail.com
      if (!/\S+@\S+.\S+/.test(this.email)) {
        return Promise.reject(new Error(this.$t('please_enter_correct_email')))
      }
      return 'done'
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-sub {
  margin-bottom: 40px;
}
.text-link {
  color: #62ffff;
  cursor: pointer;
}
</style>
