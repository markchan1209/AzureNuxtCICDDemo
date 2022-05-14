<template>
  <div class="home">
    <!--Banner開始-->
    <div class="banner-limit">
      <client-only placeholder="Loading...">
        <el-carousel
          :arrow="bannerList.length > 1 ? 'always' : ''"
          :height="`${deviceWidth > 700 ? '60vw' : '88vw'}`"
          :interval="6000"
          indicator-position="none"
          class="banner"
        >
          <el-carousel-item v-for="(item, index) in bannerList" :key="index">
            <div class="banner-item" :style="`backgroundImage: url('${deviceWidth > 700 ? item.webImageUrl : item.mobileAImageUrl}')`">
              <div class="banner-title">{{ item.title }}</div>
              <div class="banner-sub">{{ item.description }}</div>
              <div class="banner-more">
                <a :href="item.buttonUrl" class="banner-button fdb-btn-primary-hover">{{ item.buttonName }}</a>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </client-only>
    </div>
    <!--Banner結束-->

    <!--加入我們 開始-->
    <HomeJoinUs />
    <!--加入我們 結束-->

    <!--介紹 開始-->
    <HomeInfo />
    <!--介紹 結束-->

    <!-- 文章列表 最新消息 -->
    <HomeArticleList />
    <!-- 最新消息 結束 -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      bannerList: []
    }
  },
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    }
  },
  mounted() {
    this.getHomePageInfo()
  },
  methods: {
    async getHomePageInfo() {
      try {
        const res = await this.$api.common.getHomePageInfo()
        this.bannerList = res.data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  // 先移除背景之後可能會補上
  // background-image: url('../../assets/img/common/globe.png');
  // background-position: top;
  // background-size: cover;
  // background-repeat: no-repeat;
  .banner-limit {
    height: 35vw;
    @media screen and (max-width: 1500px) {
      height: 37vw;
    }
  }
  .banner {
    margin-bottom: 2vw;
    ::v-deep {
      .el-carousel__arrow {
        font-size: 36px;
        height: 72px;
        width: 72px;
      }
    }
    &-item {
      // background-image: url('../../assets/img/common/banner.svg');
      background-size: cover;
      height: 60vw;
    }
    &-title {
      padding-top: 5vh;
      margin-bottom: 16px;
      font-size: 48px;
      font-weight: bold;
      text-align: center;
      color: #fff;
    }
    &-sub {
      color: #fff;
      text-align: center;
      font-size: 16px;
    }
    &-more {
      display: flex;
      margin-top: 38px;
      justify-content: center;
      align-items: center;
      .banner-button {
        color: #ffffff;
        padding: 10px 48px;
        background: linear-gradient(180deg, #62ffff 9.47%, #3ea9cc 100%);
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
}

/*1024*/
@media screen and (min-width: 1000px) and (max-width: 1346px) {
  .home {
    .banner-limit {
      height: 40vw;
    }
    .banner {
      margin-bottom: 6vw;
      ::v-deep {
        .el-carousel__arrow {
          font-size: 28px;
          height: 56px;
          width: 56px;
        }
      }
      &-title {
        font-size: 36px;
      }
      &-sub {
        font-size: 16px;
      }
      &-more {
        margin-top: 30px;
        .banner-button {
          padding: 10px 48px;
        }
      }
    }
  }
}
/*768*/
@media screen and (min-width: 701px) and (max-width: 999px) {
  .home {
    background-size: contain;
    .banner-limit {
      height: 37vw;
    }
    .banner {
      margin-bottom: 6vw;
      ::v-deep {
        .el-carousel__arrow {
          font-size: 22px;
          height: 44px;
          width: 44px;
        }
      }
      &-title {
        font-size: 28px;
      }
      &-sub {
        font-size: 14px;
      }
      &-more {
        margin-top: 30px;
        .banner-button {
          padding: 8px 40px;
          font-size: 14px;
        }
      }
    }
  }
}
/*540*/
@media screen and (min-width: 500px) and (max-width: 700px) {
  .home {
    background-size: contain;
    background-position: 50% 6%;
    .banner-limit {
      height: 50vw;
      margin-bottom: 126px;
    }
    .banner {
      margin-bottom: 6vw;
      ::v-deep {
        .el-carousel__arrow {
          font-size: 22px;
          height: 44px;
          width: 44px;
        }
      }
      &-item {
        // background-image: url('../../assets/img/home/banner-mobile.png');
        height: 88vw;
      }
      &-title {
        padding-top: 3vh;
        font-size: 30px;
      }
      &-sub {
        font-size: 16px;
        padding: 0 40px;
      }
      &-more {
        margin-top: 30px;
        .banner-button {
          padding: 8px 40px;
          font-size: 14px;
        }
      }
    }
  }
}
/*320*/
@media screen and (min-width: 300px) and (max-width: 499px) {
  .home {
    background-size: contain;
    background-position: 50% 8%;
    .banner-limit {
      height: 50vw;
      margin-bottom: 80px;
    }
    .banner {
      margin-bottom: 6vw;
      ::v-deep {
        .el-carousel__arrow {
          font-size: 18px;
          height: 36px;
          width: 36px;
        }
        .el-carousel__arrow--flef {
          left: 6px;
        }
        .el-carousel__arrow--right {
          right: 6px;
        }
      }
      &-item {
        background-image: url('../../assets/img/home/banner-mobile.png');
        height: 88vw;
      }
      &-title {
        padding-top: 2vh;
        font-size: 22px;
      }
      &-sub {
        font-size: 12px;
        padding: 0 12px;
      }
      &-more {
        margin-top: 30px;
        .banner-button {
          padding: 6px 22px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
