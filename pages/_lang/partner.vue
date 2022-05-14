<template>
  <div class="partner">
    <!-- banner -->
    <div class="banner">
      <div class="banner-content">
        <div class="title">{{ $t('rebate_guarantee') }}</div>
        <div class="info">
          {{ $t('no_trading_conditions_required') }}<br />
          {{ $t('enjoy_another_ten_recommendation') }}
        </div>
        <a class="btn fdb-btn-primary" href="https://partner.bybit.com/b/fundobit" target="_blank">{{ $t('apply_account') }}</a>
      </div>
      <div v-if="deviceWidth > 700" class="banner-data">
        <div class="data-item">
          <img src="@/assets/img/partner/40-percent.png" class="percent" alt="40-percent" />
          <div class="text">{{ $t('rebate_subsidy_ratio') }}</div>
        </div>
        <div class="data-item">
          <img src="@/assets/img/partner/10-percent.png" class="percent" alt="10-percent" />
          <div class="text">{{ $t('refer_friends_rebate_ratio') }}</div>
        </div>
        <div class="data-item">
          <img src="@/assets/img/partner/30-percent.png" class="percent" alt="30-percent" />
          <div class="text">{{ $t('official_agent_rebate_ratio') }}</div>
        </div>
      </div>
    </div>
    <div v-if="deviceWidth <= 700" class="banner-data-m">
      <div class="data-item">
        <img src="@/assets/img/partner/40-percent.png" class="percent" alt="40-percent" />
        <div class="text">{{ $t('rebate_subsidy_ratio') }}</div>
      </div>
      <div class="data-item">
        <img src="@/assets/img/partner/10-percent.png" class="percent" alt="10-percent" />
        <div class="text">{{ $t('refer_friends_rebate_ratio') }}</div>
      </div>
      <div class="data-item">
        <img src="@/assets/img/partner/30-percent.png" class="percent" alt="30-percent" />
        <div class="text">{{ $t('official_agent_rebate_ratio') }}</div>
      </div>
    </div>

    <!-- sub banner -->
    <div class="sub-banner">
      <div class="sub-item">
        <div class="label">{{ $t('handling_fee') }}</div>
        <div class="value">0.075%</div>
      </div>
      <div class="sub-item">
        <div class="label">{{ $t('lever') }}</div>
        <div class="value">100</div>
      </div>
      <div class="sub-item">
        <div class="label">{{ $t('trading_pair') }}</div>
        <div class="value">13</div>
      </div>
      <div class="sub-item">
        <div class="label">{{ $t('transaction_support') }}</div>
        <div class="value">{{ $t('futures') }}</div>
      </div>
      <div class="sub-item">
        <div class="label">{{ $t('average_transaction_volume') }}</div>
        <div class="value">{{ $t('billion_1') }}</div>
      </div>
      <div class="sub-item">
        <div class="label">{{ $t('asset_strength') }}</div>
        <div class="value">{{ $t('billion_2') }}</div>
      </div>
    </div>

    <!-- 優勢 -->
    <div class="advantage">
      <div class="advantage-title">{{ $t('bybit_advantage') }}</div>
      <div class="list">
        <div class="between">
          <div class="list-item">
            <img class="icon" src="@/assets/img/partner/balance.png" alt="balance" />
            <div class="info">
              <div class="title">{{ $t('fair_transparent') }}</div>
              <div class="content">{{ $t('mark_price_selects_real_time') }}</div>
            </div>
          </div>
          <div class="list-item">
            <img class="icon" src="@/assets/img/partner/one.png" alt="one" />
            <div class="info">
              <div class="title">{{ $t('market_depth_no_one') }}</div>
              <div class="content">{{ $t('according_latest_statistics') }}</div>
            </div>
          </div>
          <div class="list-item">
            <img class="icon" src="@/assets/img/partner/lever.png" alt="lever" />
            <div class="info">
              <div class="title">{{ $t('flexible_leverage') }}</div>
              <div class="content">{{ $t('which_long_term_investment') }}</div>
            </div>
          </div>
        </div>
        <div class="between">
          <div class="list-item">
            <img class="icon" src="@/assets/img/partner/verified.png" alt="verified" />
            <div class="info">
              <div class="title">{{ $t('top_allocation_fund_security_system') }}</div>
              <div class="content">{{ $t('platform_builds_industry_advanced') }}</div>
            </div>
          </div>
          <div class="list-item">
            <img class="icon" src="@/assets/img/partner/intelligence.png" alt="intelligence" />
            <div class="info">
              <div class="title">{{ $t('intelligent_ordering_system_support') }}</div>
              <div class="content">{{ $t('set_profit_stop_loss_trailing') }}</div>
            </div>
          </div>
          <div class="list-item">
            <img class="icon" src="@/assets/img/partner/money.png" alt="money" />
            <div class="info">
              <div class="title">{{ $t('flexible_fund_allocation') }}</div>
              <div class="content">{{ $t('no_minimum_transaction_amount') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 成為返多寶會員 -->
    <div class="member">
      <div class="title">{{ $t('become_member_fdb') }}</div>
      <div class="info">{{ $t('return_fdb_subsidize') }}<br />{{ $t('only_thing_reduce_transaction_costs') }}</div>
      <NuxtLink :to="{ name: 'lang-register', params: { lang: $route.params.lang } }" class="btn fdb-btn-primary">
        {{ $t('join_fdb') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Partner',
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.partner {
  width: 100%;
  .banner {
    position: relative;
    width: 100vw;
    height: 52vw;
    background-image: url('../../assets/img/partner/partner-banner.png');
    background-size: cover;
    @media screen and (max-width: 960px) {
      background-position: 50px 0px;
    }
    @media screen and (max-width: 700px) {
      height: 88vw;
      background-image: url('../../assets/img/partner/partner-banner-m.png');
      background-position: 0% 0%;
    }
    &-content {
      position: absolute;
      left: 5%;
      top: 25%;
      width: 40%;
      @media screen and (max-width: 1370px) {
        top: 22%;
      }
      @media screen and (max-width: 960px) {
        top: 16%;
      }
      @media screen and (max-width: 700px) {
        top: 35%;
      }
      .title {
        font-family: 'Avenir';
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 5%;
        @media screen and (max-width: 1370px) {
          font-size: 36px;
          margin-bottom: 3%;
        }
        @media screen and (max-width: 960px) {
          font-size: 28px;
        }
        @media screen and (max-width: 700px) {
          // font-size: 28px;
        }
        @media screen and (max-width: 500px) {
          font-size: 22px;
        }
      }
      .info {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 10%;
        color: #e5e5e5;
        @media screen and (max-width: 1370px) {
          margin-bottom: 5%;
        }
        @media screen and (max-width: 960px) {
          font-size: 14px;
          line-height: 21px;
        }
        @media screen and (max-width: 700px) {
          font-size: 16px;
          line-height: 24px;
          margin-bottom: 12%;
        }
        @media screen and (max-width: 500px) {
          font-size: 12px;
          line-height: 18px;
          margin-bottom: 18px;
        }
      }
      .btn {
        line-height: 38px;
        @media screen and (max-width: 960px) {
          line-height: 34px;
        }
        @media screen and (max-width: 700px) {
          line-height: 38px;
        }
        @media screen and (max-width: 500px) {
          line-height: 26px;
        }
      }
    }
    &-data {
      position: absolute;
      left: 5%;
      top: 68%;
      display: flex;
      justify-content: space-between;
      width: 34%;
      @media screen and (max-width: 1370px) {
        top: 65%;
        width: 40%;
      }
      @media screen and (max-width: 960px) {
        width: 46%;
      }
      .data-item {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .percent {
          width: 90%;
          margin-bottom: 20%;
        }
        .text {
          font-weight: bold;
          font-size: 18px;
          line-height: 150%;
          @media screen and (max-width: 1370px) {
            font-size: 15px;
          }
          @media screen and (max-width: 960px) {
            font-size: 13px;
          }
        }
      }
    }
  }
  .banner-data-m {
    display: flex;
    justify-content: space-evenly;
    margin-top: 6%;
    margin-bottom: 10%;
    .data-item {
      width: 26%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .percent {
        width: 90%;
        margin-bottom: 20%;
      }
      .text {
        font-weight: bold;
        font-size: 16px;
        line-height: 150%;
        text-align: center;
        @media screen and (max-width: 500px) {
          font-size: 14px;
        }
      }
    }
  }
  .advantage {
    max-width: 1440px;
    margin: 0 auto;
    padding: 6% 12% 2% 12%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1370px) {
      padding: 6% 4% 2% 4%;
    }
    &-title {
      font-weight: bold;
      font-size: 48px;
      @media screen and (max-width: 1370px) {
        font-size: 36px;
        margin-bottom: 30px;
      }
      @media screen and (max-width: 960px) {
        line-height: 28px;
      }
      @media screen and (max-width: 700px) {
        font-size: 28px;
        line-height: 50px;
      }
      @media screen and (max-width: 500px) {
        font-size: 22px;
      }
    }
    .list {
      display: flex;
      @media screen and (max-width: 700px) {
        flex-direction: column;
      }
      .between {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 460px;
        flex: 1;
        padding: 4% 4%;
        @media screen and (max-width: 1370px) {
          height: 460px;
        }
        @media screen and (max-width: 960px) {
          padding: 2%;
        }
        @media screen and (max-width: 700px) {
          flex: 0 0 auto;
          padding: 0;
        }
        @media screen and (max-width: 700px) {
          height: 400px;
        }
        .list-item {
          flex: 1;
          display: flex;
          .icon {
            width: 48px;
            height: 48px;
            margin-right: 20px;
            @media screen and (max-width: 960px) {
              width: 40px;
              height: 40px;
            }
            @media screen and (max-width: 700px) {
              width: 50px;
              height: 50px;
              margin-right: 14px;
            }
            @media screen and (max-width: 500px) {
              width: 35px;
              height: 35px;
            }
          }
          .info {
            flex: 1;
            .title {
              font-weight: bold;
              font-size: 24px;
              margin-bottom: 10px;
              @media screen and (max-width: 960px) {
                font-size: 20px;
              }
            }
            .content {
              font-size: 16px;
              color: #e5e5e5;
              @media screen and (max-width: 960px) {
                font-size: 14px;
              }
              @media screen and (max-width: 500px) {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
  .sub-banner {
    height: 120px;
    display: flex;
    background-color: #212838;
    justify-content: space-evenly;
    align-items: center;
    @media screen and (max-width: 1370px) {
      margin-bottom: 60px;
    }
    @media screen and (max-width: 700px) {
      height: 180px;
      flex-wrap: wrap;
      margin-bottom: 30px;
      align-content: space-evenly;
    }
    @media screen and (max-width: 500px) {
      height: 160px;
    }
    .sub-item {
      display: flex;
      font-size: 20px;
      font-weight: bold;
      font-family: 'Raleway';
      @media screen and (max-width: 1370px) {
        flex-direction: column;
      }
      @media screen and (max-width: 960px) {
        font-size: 16px;
      }
      @media screen and (max-width: 700px) {
        flex: 0 0 40%;
        flex-direction: row;
        justify-content: center;
      }
      @media screen and (max-width: 500px) {
        flex: 0 0 48%;
        font-size: 14px;
      }
      .label {
        margin-right: 20px;
        @media screen and (max-width: 1370px) {
          margin-bottom: 8px;
        }
      }
      .value {
        color: #62ffff;
      }
    }
  }
  .member {
    max-width: 1440px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 140px;
    @media screen and (max-width: 960px) {
      margin-bottom: 70px;
    }
    .title {
      font-weight: bold;
      font-size: 48px;
      line-height: 64px;
      margin-bottom: 30px;
      @media screen and (max-width: 1370px) {
        font-size: 36px;
      }
      @media screen and (max-width: 960px) {
        font-size: 28px;
        margin-bottom: 10px;
      }
      @media screen and (max-width: 500px) {
        font-size: 22px;
      }
    }
    .info {
      font-size: 16px;
      line-height: 26px;
      color: #e5e5e5;
      margin-bottom: 40px;
      @media screen and (max-width: 960px) {
        font-size: 14px;
        margin-bottom: 30px;
        padding: 0 3%;
      }
    }
    .btn {
      line-height: 38px;
    }
  }
}
</style>
