<template>
  <div class="nwes">
    <!--Banner開始-->
    <div class="news-banner">
      <div class="banner-content">
        <div class="banner-title">{{ $t('fdb_community') }}</div>
        <!-- <div class="banner-info">逐步發展虛擬貨幣須知，發展成獨立的虛擬貨幣自媒體</div> -->
      </div>
    </div>
    <!--Banner結束-->

    <!--內容 開始-->
    <div class="news-content">
      <!-- menu bar -->
      <div class="menu-bar" id="news-menu-bar">
        <div class="menu-left">
          <div class="menu-item" :class="{ active: activeTab === 'all' }" @click="changeActiveTag('all')">{{ $t('all') }}</div>
          <div class="menu-item" :class="{ active: activeTab === 'forum' }" @click="changeActiveTag('forum')">{{ $t('forum') }}</div>
          <div class="menu-item" :class="{ active: activeTab === 'bulletin' }" @click="changeActiveTag('bulletin')">
            {{ $t('announcement') }}
          </div>
          <div class="menu-item" :class="{ active: activeTab === 'activity' }" @click="changeActiveTag('activity')">
            {{ $t('activity') }}
          </div>
        </div>
        <div class="menu-right">
          <img @click="showSearch = !showSearch" class="icon-search" src="@/assets/img/common/icon-search.png" alt="search" />
          <input v-model="searchKey" class="input" :class="{ hide: !showSearch }" type="text" @keyup.enter="searchKeyWord" />
        </div>
      </div>

      <!-- 置頂文章 768 以上 -->
      <NewsAllInfo v-if="activeTab === 'all' && mode === 'list' && deviceWidth > 700" :top-list="topList" :is-loading="topLoading" />
      <!-- 置頂文章 540 以下 -->
      <NewsInformation
        v-if="activeTab === 'all' && mode === 'list' && deviceWidth <= 700"
        :is-loading="topLoading"
        :info-list="topList"
        style="border-bottom: 1px #ffffff solid"
      />

      <!-- 文章列表 -->
      <NewsInformation v-if="mode === 'list'" :is-loading="infoLoading" :info-list="newsList" />
      <!--Pages-->
      <CommonPager v-if="mode === 'list' && newsList.length > 0" :get-data="getNews" :pager="pager" style="margin-bottom: 8%" />

      <!-- 文章內容 -->
      <NewsArticle v-if="mode === 'article'" />
    </div>
    <!--內容 結束-->
  </div>
</template>

<script>
export default {
  name: 'News',
  async asyncData({ query, $api }) {
    const articleData = {
      title: 'FUNDOBIT',
      description: '「Fundobit」the world’s largest CryptoCurrency rebate platform.',
      image: 'https://fdb-web-api.azurewebsites.net/Upload/UserImage/202111282001344329/F20211128200134.png'
    }
    if (query.articleId) {
      const reqBody = {
        id: Number(query.articleId)
      }
      try {
        const res = await $api.news.getNewsDetail(reqBody)
        articleData.title = res.data.title
        articleData.description = res.data.desc
        articleData.image = res.data.img
      } catch (error) {
        console.error(error)
      }
    }
    return { articleData }
  },
  data() {
    return {
      showSearch: false,
      infoLoading: false,
      topLoading: false,
      searchKey: '',
      topList: [],
      newsList: [],
      pager: {
        tag: -1,
        pageIndex: 1,
        pageSize: 12,
        totalCount: 0
      }
    }
  },
  head() {
    return {
      title: this.articleData.title,
      meta: [
        { hid: 'description', name: 'description', content: this.articleData.description },
        // FB Line
        { hid: 'og:title', property: 'og:title', content: this.articleData.title },
        { hid: 'og:description', property: 'og:description', content: this.articleData.description },
        { hid: 'og:image', property: 'og:image', content: this.articleData.image },
        // Twitter
        { hid: 'twitter:title', property: 'twitter:title', content: this.articleData.title },
        { hid: 'twitter:description', property: 'twitter:description', content: this.articleData.description },
        { hid: 'twitter:image', property: 'twitter:image', content: this.articleData.image }
      ]
    }
  },
  computed: {
    tagKey() {
      switch (this.activeTab) {
        case 'all':
        case 'search':
          return -1
        case 'forum':
          return 0
        case 'bulletin':
          return 1
        case 'activity':
          return 2
        default:
          return -1
      }
    },
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    },
    scrollBottom() {
      return this.$store.state.app.scrollBottom
    },
    mode() {
      return this.$route.query.mode || 'list'
    },
    activeTab() {
      return this.$route.query.activeTab || 'all'
    }
  },
  watch: {
    activeTab(val) {
      // 查詢關鍵字由手動觸發
      if (val === 'search') return
      this.showSearch = false
      this.searchKey = ''
      this.getNews(true)
    }
  },
  mounted() {
    this.getNews(true)
    this.getTopNews()
  },
  methods: {
    async getNews(reset) {
      this.infoLoading = true
      if (reset) {
        this.pager.pageIndex = 1
      } else {
        this.scrollToTop()
      }
      try {
        const reqData = {
          lang: 0,
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize,
          tag: this.tagKey,
          keyWord: this.searchKey
        }
        const res = await this.$api.news.getNews(reqData)
        this.newsList = res.data.data
        this.pager.pageIndex = res.data.pageIndex
        this.pager.totalCount = res.data.totalCount
      } catch (e) {
        console.error(e)
      }
      this.infoLoading = false
    },
    async getTopNews() {
      this.topLoading = true
      try {
        const res = await this.$api.news.getTopNews()
        // 置頂只會有四筆
        this.topList = res.data.slice(0, 4)
      } catch (e) {
        console.error(e)
      }
      this.topLoading = false
    },
    changeActiveTag(type) {
      if (type === this.activeTab && this.mode === 'list') return
      this.$router.push({ query: { mode: 'list', activeTab: type } })
    },
    searchKeyWord() {
      this.$router.push({ query: { mode: 'list', activeTab: 'search' } })
      this.getNews(true)
    },
    scrollToTop() {
      this.$nextTick(() => {
        document.querySelector('#news-menu-bar').scrollIntoView({ behavior: 'smooth' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.news {
  &-banner {
    position: relative;
    height: 30vw;
    background-image: url('../../assets/img/news/news-banner.png');
    background-size: cover;
    @media screen and (max-width: 700px) {
      height: 80vw;
      background-image: url('../../assets/img/news/news-banner-mobile.png');
    }
    .banner-content {
      position: absolute;
      left: 5%;
      top: 32%;
      @media screen and (max-width: 1370px) {
        top: 36%;
      }
      @media screen and (max-width: 500px) {
        top: 34%;
      }
      .banner-title {
        font-weight: bold;
        font-size: 48px;
        line-height: 71px;
        @media screen and (max-width: 1370px) {
          font-size: 36px;
          line-height: 53px;
        }
        @media screen and (max-width: 960px) {
          font-size: 28px;
          line-height: 41px;
        }
        @media screen and (max-width: 700px) {
          font-size: 34px;
          line-height: 52px;
        }
        @media screen and (max-width: 500px) {
          font-size: 22px;
          line-height: 33px;
          margin-bottom: 12px;
        }
      }
      .banner-info {
        font-size: 16px;
        line-height: 24px;
        @media screen and (max-width: 960px) {
          font-size: 14px;
          line-height: 21px;
        }
        @media screen and (max-width: 700px) {
          font-size: 16px;
          line-height: 24px;
        }
        @media screen and (max-width: 500px) {
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
  &-content {
    max-width: 1440px;
    padding: 0 3%;
    margin: 0 auto;
    @media screen and (max-width: 1370px) {
      padding: 0 4%;
    }
    @media screen and (max-width: 960px) {
      padding: 0 6%;
    }
    .menu-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      @media screen and (max-width: 500px) {
        height: 54px;
      }
      .menu-left {
        display: flex;
        .menu-item {
          font-size: 20px;
          margin-right: 60px;
          cursor: pointer;
          transition: color 0.4s;
          @media screen and (max-width: 700px) {
            margin-right: 44px;
          }
          @media screen and (max-width: 500px) {
            font-size: 14px;
            margin-right: 22px;
          }
          &:hover,
          &.active {
            color: #62ffff;
          }
        }
      }
      .menu-right {
        display: flex;
        .icon-search {
          width: 20px;
          cursor: pointer;
          @media screen and (max-width: 500px) {
            width: 16px;
          }
        }
        .input {
          margin-left: 8px;
          color: #c4c4c4;
          background-color: #050608;
          border-bottom: 1px #fff solid;
          width: 140px;
          opacity: 1;
          transition: all 0.4s;
          @media screen and (max-width: 700px) {
            width: 100px;
          }
          @media screen and (max-width: 500px) {
            margin-left: 4px;
            font-size: 12px;
            width: 50px;
          }
          &.hide {
            width: 0px;
            opacity: 0;
            pointer-events: none;
          }
        }
      }
    }
  }
}
</style>
