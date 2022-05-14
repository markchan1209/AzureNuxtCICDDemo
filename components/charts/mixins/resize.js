export default {
  updated() {
    this.$_resizeHandler()
  },
  mounted() {
    this.$_initResizeEvent()
  },
  beforeDestroy() {
    this.$_destroyResizeEvent()
  },
  methods: {
    $_resizeHandler() {
      this.$nextTick(() => {
        this.$refs[`${this.$options.name}`].resize()
      })
    },
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    }
  }
}
