<template>
  <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="all-info">
    <NuxtLink :to="{ query: { mode: 'article', articleId: topList[0].id } }" v-if="topList[0]" class="info-main">
      <div ref="topImg" class="img" :style="`background-image: url('${topList[0].img}'); height: ${topImageHeight}px;`">
        <!-- <img :src="topList[0].img" alt="announced" /> -->
      </div>
      <div class="info-tag">
        <div :class="`info-tag-inside info-bg-${$map.articleMap[topList[0].tag].key}`">{{ $map.articleMap[topList[0].tag].name }}</div>
      </div>
      <div class="info-title">
        {{ topList[0].title }}
      </div>
      <!-- <div class="info-content">
        {{ topList[0].desc }}
      </div> -->
      <div class="info-date">{{ topList[0].createdate }}</div>
    </NuxtLink>
    <div class="info-list">
      <NuxtLink
        :to="{ query: { mode: 'article', articleId: item.id } }"
        v-for="item in topList.slice(1)"
        :key="item.id"
        class="list-item"
      >
        <div class="list-main">
          <div :class="`list-tag info-bg-${$map.articleMap[item.tag] ? $map.articleMap[item.tag].key : 'forum'}`">
            {{ $map.articleMap[item.tag] ? $map.articleMap[item.tag].name : $t('undefined') }}
          </div>
          <div class="list-title">{{ item.title }}</div>
          <div class="list-date">{{ item.createdate }}</div>
        </div>
        <div ref="restImg" class="list-img" :style="`background-image: url('${item.img}'); height: ${restImageHeight}px;`">
          <!-- <img :src="item.img" alt="img" /> -->
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllInfo',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    topList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      topImageHeight: 300,
      restImageHeight: 150
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
    topList() {
      this.setImageHeight()
    }
  },
  mounted() {
    this.setImageHeight()
  },
  methods: {
    setImageHeight() {
      setTimeout(() => {
        const topDom = this.$refs.topImg
        const restDoms = this.$refs.restImg
        this.topImageHeight = (topDom && Number.parseInt(topDom.offsetWidth * 0.6)) || 300
        this.restImageHeight = (restDoms && restDoms[0] && Number.parseInt(restDoms[0].offsetWidth * 0.6)) || 150
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.all-info {
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px #ffffff solid;
  min-height: 400px;
  @media screen and (max-width: 700px) {
    display: none;
  }
  .info-main {
    width: 36%;
    cursor: pointer;
    @media screen and (max-width: 1370px) {
      width: 40%;
    }
    @media screen and (max-width: 960px) {
      width: 41%;
    }
    .img {
      width: auto;
      background-position: center;
      background-size: cover;
    }
    .info-tag {
      display: flex;
      &-inside {
        width: 100px;
        font-size: 14px;
        line-height: 22px;
        border-radius: 12px;
        text-align: center;
        margin: 12px 0 16px 0;
      }
    }
    .info-title {
      font-weight: bold;
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 8px;
      letter-spacing: 0.03em;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @media screen and (max-width: 1370px) {
        font-size: 22px;
      }
      @media screen and (max-width: 960px) {
        font-size: 18px;
        line-height: 28px;
      }
    }
    .info-content {
      font-size: 16px;
      line-height: 150%;
      color: #e5e5e5;
      margin-bottom: 10px;
      @media screen and (max-width: 960px) {
        font-size: 14px;
      }
    }
    .info-date {
      font-size: 16px;
      line-height: 150%;
      color: #e5e5e5;
      @media screen and (max-width: 960px) {
        font-size: 14px;
      }
    }
  }
  .info-list {
    flex: 1;
    margin-left: 30px;
    .list-item {
      display: flex;
      margin-bottom: 36px;
      cursor: pointer;
      .list-main {
        flex: 1;
        margin-right: 40px;
        @media screen and (max-width: 960px) {
          margin-right: 10px;
        }
        .list-tag {
          width: 100px;
          font-size: 14px;
          line-height: 22px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 12px;
        }
        .list-title {
          font-weight: bold;
          font-size: 24px;
          line-height: 32px;
          margin-bottom: 4px;
          letter-spacing: 0.03em;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          @media screen and (max-width: 1370px) {
            font-size: 22px;
          }
          @media screen and (max-width: 960px) {
            font-size: 18px;
            line-height: 22px;
          }
        }
        .list-date {
          font-size: 16px;
          line-height: 150%;
          color: #e5e5e5;
          @media screen and (max-width: 960px) {
            font-size: 14px;
          }
        }
      }
      .list-img {
        width: 186px;
        background-position: center;
        background-size: cover;
        @media screen and (max-width: 1370px) {
          width: 115px;
        }
        @media screen and (max-width: 960px) {
          width: 109px;
        }
      }
    }
  }
}
</style>
