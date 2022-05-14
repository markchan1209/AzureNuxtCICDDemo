<template>
  <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" style="float: left">
    <div class="personal-function-main">
      <div class="title">{{ $t('personal_information') }}</div>
      <div class="sub">{{ $t('only_fields_can_be_modified') }}</div>

      <div class="personal-edit-info-block">
        <div class="pic-block">
          <div class="img" :style="`background-image: url('${formData.imageUrl}')`" alt="personal-pic" style="border-radius: 50%"></div>
          <a v-if="isEdit" href="javascript:void(0)" class="btn" @click="changeImage">{{ $t('change_personal_image') }}</a>
          <input v-show="false" ref="upload" type="file" />
        </div>
        <div class="info-input-block">
          <div class="main">
            <div class="title">{{ $t('user_name') }}</div>
            <input v-if="isEdit" v-model="formData.name" type="text" class="input" />
            <div v-else class="info">{{ formData.name }}</div>
          </div>
          <div class="main">
            <div class="title">{{ $t('user_email') }}</div>
            <div class="info">{{ formData.email }}</div>
          </div>
          <div class="main">
            <div class="title">{{ $t('mobile_phone') }}</div>
            <div v-if="isEdit" class="split-input">
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
              <input
                v-model="formData.phone"
                type="text"
                class="input"
                style="flex: 1"
                :placeholder="$t('please_enter_phone')"
                autocomplete="off"
              />
            </div>
            <div v-else class="info">{{ formData.areaCode }} {{ formData.phone }}</div>
          </div>
          <div v-if="isEdit" class="main">
            <div class="title">{{ $t('old_password') }}</div>
            <input v-model="formData.password" :type="passwordType" class="input" autocomplete="off" />
            <CommonPasswordIcon :pwd-type.sync="passwordType" />
          </div>
          <div v-if="isEdit" class="main">
            <div class="title">{{ $t('new_password') }}</div>
            <input v-model="formData.newPassword" :type="newPasswordType" class="input" autocomplete="off" />
            <CommonPasswordIcon :pwd-type.sync="newPasswordType" />
          </div>
          <div v-if="isEdit" class="main">
            <div class="title">{{ $t('check_again') }}</div>
            <input v-model="formData.doubleCheck" :type="doubleCheckType" class="input" autocomplete="off" />
            <CommonPasswordIcon :pwd-type.sync="doubleCheckType" />
          </div>
        </div>
      </div>
    </div>

    <div class="btns-block personal-info">
      <a v-if="!isEdit" href="javascript:void(0)" class="next fdb-btn-primary-hover" @click="isEdit = true">{{ $t('edit_content') }}</a>
      <a v-if="isEdit" href="javascript:void(0)" class="cancel fdb-btn-default-hover" @click="cancelEdit">{{ $t('cancel') }}</a>
      <a v-if="isEdit" href="javascript:void(0)" class="next fdb-btn-primary-hover" @click="saveUserData">{{ $t('save') }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalEdit',
  data() {
    return {
      isLoading: false,
      isEdit: false,
      formData: {
        name: '',
        email: '',
        imageUrl: '',
        areaCode: '',
        phone: '',
        password: '',
        newPassword: '',
        doubleCheck: ''
      },
      passwordType: 'password',
      newPasswordType: 'password',
      doubleCheckType: 'password'
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  mounted() {
    this.init()
    this.$refs.upload.addEventListener('change', this.handleFiles, false)
  },
  beforeDestroy() {
    this.$refs.upload.removeEventListener('change', this.handleFiles)
  },
  methods: {
    init() {
      this.formData.name = this.userInfo.name
      this.formData.email = this.userInfo.email
      this.formData.imageUrl = this.userInfo.imageUrl
      this.formData.areaCode = this.userInfo.areaCode
      this.formData.phone = this.userInfo.phone
      this.formData.password = ''
      this.formData.newPassword = ''
      this.formData.doubleCheck = ''
    },
    changeImage() {
      this.$refs.upload.click()
    },
    async handleFiles() {
      this.isLoading = true
      try {
        const query = new FormData()
        query.append('file', this.$refs.upload.files[0])
        const res = await this.$api.common.uploadFile(query)
        this.formData.imageUrl = res.data
        this.$refs.upload.value = null
      } catch (error) {
        this.$message.error(this.$t('image_upload_fail'))
        console.error(error)
      }
      this.isLoading = false
    },
    async saveUserData() {
      this.isLoading = true
      try {
        await this.validate()
        const reqData = {
          name: this.formData.name,
          areaCode: this.formData.areaCode,
          phone: this.formData.phone,
          password: this.formData.password,
          newPassword: this.formData.newPassword,
          imageUrl: this.formData.imageUrl
        }
        await this.$api.user.updateUserData(reqData)
        this.$message.success(this.$t('personal_update_success'))
        this.$store.dispatch('user/getUserInfo')
        this.isEdit = false
      } catch (error) {
        if (!error.isHttpError) {
          this.$message.error(error.message)
        }
        console.error(error)
      }
      this.isLoading = false
    },
    async validate() {
      // 使用者名稱：僅限英文字母
      // if (!/^[a-zA-Z]{1,}$/.test(this.formData.name)) {
      //   return Promise.reject(new Error('使用者名稱：僅限英文字母'))
      // }
      // 行動電話：僅限數字不含特殊符號
      if (this.formData.phone && !/^\d+$/.test(this.formData.phone)) {
        return Promise.reject(new Error(this.$t('m_phone_enter_number')))
      }

      // 三個密碼其中一隻不為空就驗證密碼
      if (this.formData.password || this.formData.newPassword || this.formData.doubleCheck) {
        // 密碼：6位數以上，含英數字，不含特殊符號
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(this.formData.password)) {
          return Promise.reject(new Error(this.$t('old_password_verify')))
        }
        // 新密碼：6位數以上，含英數字，不含特殊符號
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(this.formData.newPassword)) {
          return Promise.reject(new Error(this.$t('new_password_verify')))
        }
        // 確認密碼：密碼要與新密碼一致
        if (this.formData.newPassword !== this.formData.doubleCheck) {
          return Promise.reject(new Error(this.$t('check_new_password')))
        }
      }
      return 'done'
    },
    formatPassword(password) {
      return password.replace(/./g, '*')
    },
    cancelEdit() {
      this.init()
      this.isEdit = false
    }
  }
}
</script>

<style lang="scss" scoped>
.split-input {
  float: left;
  display: flex;
  width: 430px;
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

/*1024*/
@media screen and (min-width: 1000px) and (max-width: 1346px) {
  .split-input {
    width: 100%;
  }
}
/*768*/
@media screen and (min-width: 750px) and (max-width: 999px) {
  .split-input {
    width: 100%;
  }
}
/*540*/
@media screen and (min-width: 540px) and (max-width: 749px) {
  .split-input {
    width: 100%;
  }
}
/*320*/
@media screen and (min-width: 300px) and (max-width: 539px) {
  .split-input {
    width: 100%;
  }
}
</style>
