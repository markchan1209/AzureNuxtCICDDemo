<template>
  <div v-loading="isLoading" element-loading-background="#050608" class="information">
    <template v-if="infoList.length > 0">
      <NuxtLink :to="{ query: { mode: 'article', articleId: item.id } }" v-for="(item, index) in infoList" :key="index" class="info-card">
        <div ref="articleImg" class="info-card-img" :style="`background-image: url('${item.img}'); height: ${imageHeight}px;`">
          <!-- <img :src="item.img" alt="news" /> -->
        </div>
        <div class="info-card-tag">
          <div :class="`tag info-bg-${$map.articleMap[item.tag] ? $map.articleMap[item.tag].key : 'forum'}`">
            {{ $map.articleMap[item.tag] ? $map.articleMap[item.tag].name : $t('undefined') }}
          </div>
        </div>
        <div class="info-card-title">
          {{ item.title }}
        </div>
        <div class="info-card-content">{{ item.desc }}</div>
        <div class="info-card-date">{{ item.createdate }}</div>
      </NuxtLink>
    </template>
    <div v-else-if="!isLoading" class="info-empty">
      <img style="width: 100px" src="@/assets/img/common/empty.png" alt="empty" />
      <div>{{ $t('no_relative_article') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Information',
  props: {
    infoList: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imageHeight: 300
    }
  },
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    }
  },
  watch: {
    deviceWidth() {
      this.setImageHeight()
    },
    infoList() {
      this.setImageHeight()
    }
  },
  mounted() {
    this.setImageHeight()
  },
  methods: {
    setImageHeight() {
      setTimeout(() => {
        const imageDom = this.$refs.articleImg
        this.imageHeight = (imageDom && imageDom[0] && Number.parseInt(imageDom[0].offsetWidth * 0.6)) || 260
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.information {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 4%;
  margin-bottom: 2%;
  min-height: 400px;
  .info-card {
    flex: 0 0 31%;
    margin-right: 1%;
    margin-left: 1%;
    margin-bottom: 26px;
    padding: 16px;
    background-color: #151923;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    @media screen and (max-width: 1370px) {
      padding: 14px;
    }
    @media screen and (max-width: 960px) {
      flex: 0 0 48%;
    }
    @media screen and (max-width: 700px) {
      flex: 0 0 100%;
      margin-left: 0;
      margin-right: 0;
    }
    @media screen and (max-width: 500px) {
      padding: 10px;
    }
    &-img {
      width: auto;
      height: 240px;
      background-position: center;
      background-size: cover;
    }
    &-tag {
      .tag {
        width: 100px;
        font-size: 14px;
        line-height: 22px;
        border-radius: 12px;
        text-align: center;
        margin-top: 12px;
        margin-bottom: 12px;
      }
    }
    &-title {
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 12px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @media screen and (max-width: 1370px) {
        font-size: 22px;
      }
      @media screen and (max-width: 500px) {
        font-size: 18px;
        line-height: 28px;
      }
    }
    &-content {
      font-size: 16px;
      line-height: 150%;
      color: #e5e5e5;
      margin-bottom: 8px;
      display: none;
      @media screen and (max-width: 700px) {
        display: block;
      }
      @media screen and (max-width: 500px) {
        font-size: 14px;
      }
    }
    &-date {
      font-size: 16px;
      line-height: 150%;
      color: #e5e5e5;
    }
  }
  .info-empty {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #e5e5e5;
  }
}
</style>
