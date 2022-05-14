<template>
  <div v-loading="globalLoading" element-loading-background="rgba(0, 0, 0, 0.5)">
    <Nav v-if="!hideNavFooter" />
    <Nuxt />
    <Footer v-if="!hideNavFooter" />
    <CommonConnect v-if="!hideNavFooter" />
  </div>
</template>

<script>
import { debounce } from '@/utils/debounce.js'

export default {
  name: 'App',
  computed: {
    hideNavFooter() {
      return this.$route.meta.hideNavFooter
    },
    globalLoading() {
      return this.$store.state.app.globalLoading
    }
  },
  mounted() {
    // 監聽裝置寬度
    this.$store.commit('app/SET_DEVICE_WIDTH', window.innerWidth)
    const debounceWidth = debounce(() => {
      this.$store.commit('app/SET_DEVICE_WIDTH', window.innerWidth)
    }, 100)
    window.addEventListener('resize', debounceWidth)

    // 滾動距離底部距離
    const debounceScroll = debounce(this.scorllBottomCheck, 20)
    window.addEventListener('scroll', debounceScroll)
  },
  methods: {
    scorllBottomCheck() {
      this.$store.commit(
        'app/SET_SCROLL_BOTTOM',
        document.documentElement.scrollHeight - document.documentElement.clientHeight - document.documentElement.scrollTop
      )
    }
  }
}
</script>

<style lang="scss"></style>
