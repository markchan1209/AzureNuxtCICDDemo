<template>
  <div class="article">
    <div class="article-main" v-loading="mainLoading" element-loading-background="rgba(0, 0, 0, 0.5)">
      <div class="main-title">{{ articleData.title }}</div>
      <div class="main-date">{{ articleData.createdate }} by {{ articleData.auther }}</div>
      <div class="main-content" v-html="articleData.content"></div>
    </div>
    <div class="article-other" v-loading="otherLoading" element-loading-background="rgba(0, 0, 0, 0.5)">
      <div class="other-title">{{ $t('other_relative_article') }}</div>
      <template v-if="newsList.length > 0">
        <NuxtLink
          :to="{ query: { ...$route.query, articleId: item.id } }"
          v-for="(item, index) in newsList"
          :key="index"
          class="other-item"
        >
          <div class="item">
            <div :class="`item-tag info-bg-${$map.articleMap[item.tag] ? $map.articleMap[item.tag].key : 'forum'}`">
              {{ $map.articleMap[item.tag] ? $map.articleMap[item.tag].name : $t('undefined') }}
            </div>
            <div class="item-title">{{ item.title }}</div>
            <div class="item-date">{{ item.createdate }}</div>
          </div>
          <div ref="relativeImg" class="img" :style="`background-image: url('${item.img}'); height: ${imageHeight}px;`"></div>
          <!-- <img class="img" :src="item.img" alt="pic" /> -->
        </NuxtLink>
      </template>
      <div v-else class="other-empty">
        <img style="width: 100px" src="@/assets/img/common/empty.png" alt="empty" />
        <div>{{ $t('no_relative_article') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data() {
    return {
      articleData: {
        title: 'FDB title',
        desc: 'FDB description',
        img: 'FDB image'
      },
      newsList: [],
      mainLoading: false,
      otherLoading: false,
      imageHeight: 160
    }
  },
  computed: {
    articleId() {
      return Number(this.$route.query.articleId)
    },
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    }
  },
  watch: {
    articleId() {
      this.getNewsDetail()
    },
    deviceWidth() {
      this.setImageHeight()
    },
    newsList() {
      this.setImageHeight()
    }
  },
  mounted() {
    this.getNewsDetail()
    this.setImageHeight()
  },
  methods: {
    async getNewsDetail() {
      this.mainLoading = true
      try {
        const reqBody = {
          id: this.articleId
        }
        const res = await this.$api.news.getNewsDetail(reqBody)
        this.articleData = res.data
        // 文章其他相關文章用相同tag的前10篇
        await this.getNews(res.data.tag)
      } catch (e) {
        console.error(e)
      }
      this.mainLoading = false
    },
    async getNews(tagKey) {
      this.otherLoading = true
      try {
        const reqData = {
          lang: 0,
          pageIndex: 1,
          // 文章其他相關文章用相同tag的前10篇
          pageSize: 10,
          tag: tagKey,
          keyWord: ''
        }
        const res = await this.$api.news.getNews(reqData)
        this.newsList = res.data.data
      } catch (e) {
        console.error(e)
      }
      this.otherLoading = false
    },
    setImageHeight() {
      setTimeout(() => {
        const imageDom = this.$refs.relativeImg
        this.imageHeight = (imageDom && imageDom[0] && Number.parseInt(imageDom[0].offsetWidth * 0.6)) || 150
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  margin-bottom: 4%;
  @media screen and (max-width: 960px) {
    margin-bottom: 0;
  }
  &-main {
    flex: 1;
    margin-right: 2%;
    .main-title {
      font-weight: bold;
      font-size: 36px;
      line-height: 53px;
      margin-bottom: 12px;
      @media screen and (max-width: 500px) {
        font-size: 28px;
        line-height: 41px;
      }
    }
    .main-date {
      font-size: 16px;
      line-height: 24px;
      color: #e5e5e5;
      margin-bottom: 24px;
      @media screen and (max-width: 500px) {
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
  &-other {
    width: 35%;
    height: 100%;
    background: #151923;
    padding: 20px;
    box-sizing: border-box;
    @media screen and (max-width: 1370px) {
      padding: 10px;
    }
    @media screen and (max-width: 960px) {
      display: none;
    }
    .other-title {
      font-weight: bold;
      font-size: 22px;
      line-height: 160%;
      letter-spacing: 0.05em;
      margin-bottom: 30px;
    }
    .other-item {
      display: flex;
      margin-bottom: 24px;
      cursor: pointer;
      .item {
        flex: 1;
        margin-right: 8px;
        .item-tag {
          width: 100px;
          font-size: 14px;
          line-height: 22px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 6px;
        }
        .item-title {
          font-size: 16px;
          line-height: 22px;
          margin-bottom: 6px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .item-date {
          font-size: 14px;
          line-height: 100%;
          color: #e5e5e5;
        }
      }
      .img {
        width: 40%;
        background-position: center;
        background-size: cover;
      }
    }
    .other-empty {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #e5e5e5;
    }
  }
}
</style>

<style lang="scss">
.article-main {
  .main-content {
    img {
      width: auto;
      max-width: 100%;
      height: auto;
    }
    h2 {
      margin-top: 38px;
      font-weight: bold;
      font-size: 24px;
      line-height: 160%;
      letter-spacing: 0.05em;
      @media screen and (max-width: 500px) {
        font-size: 22px;
      }
    }
    h3 {
      margin-top: 36px;
      font-weight: bold;
      font-size: 22px;
      line-height: 160%;
      letter-spacing: 0.05em;
      @media screen and (max-width: 500px) {
        font-size: 20px;
      }
    }
    p,
    blockquote {
      font-size: 20px;
      line-height: 160%;
      letter-spacing: 0.05em;
      color: #e5e5e5;
      margin: 8% 0;
      @media screen and (max-width: 500px) {
        font-size: 18px;
      }
    }
  }
}
</style>
