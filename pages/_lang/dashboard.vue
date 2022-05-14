<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <!--Dashboar 開始-->
      <DashboardHeader />
      <!--Dashboar 結束-->

      <!--佣金明細 開始-->
      <!-- 標題 -->
      <div class="detail-title">
        <span class="title">{{ $t('commission_detail') }}</span>
        <NuxtLink :to="{ name: 'lang-take-cash', params: { lang: $route.params.lang } }" class="withdraw-btn fdb-btn-primary-hover">
          {{ $t('withdrawal_apply') }}
        </NuxtLink>
      </div>

      <!-- menu -->
      <div class="detail-menu">
        <div
          class="menu"
          :class="{ active: refundShow === 'CommissionTransaction' }"
          @click="refundChange('CommissionTransaction', 'left')"
        >
          {{ $t('your_commission_change_record') }}
        </div>
        <div class="menu" :class="{ active: refundShow === 'PersonalFeedback' }" @click="refundChange('PersonalFeedback', 'left')">
          {{ $t('personal_rebate_information') }}
        </div>
        <div class="menu" :class="{ active: refundShow === 'Recommender' }" @click="refundChange('Recommender', 'right')">
          {{ $t('referrer_rebate_information') }}
        </div>
        <div class="menu" :class="{ active: refundShow === 'Withdrawal' }" @click="refundChange('Withdrawal', 'right')">
          {{ $t('withdrawal_apply_record') }}
        </div>
      </div>

      <!-- filter & table -->
      <div v-loading="tableLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="detail-list">
        <!--佣金異動紀錄 開始-->
        <DashboardCommissionTransaction
          v-if="refundShow === 'CommissionTransaction'"
          :filterCurrencyType.sync="refundFilter.currencyType"
          :filterDateRange.sync="refundFilter.dateRange"
          :loading.sync="tableLoading"
        />
        <!--佣金異動紀錄 結束-->

        <!--個人反佣 開始-->
        <DashboardPersonalFeedback
          v-if="refundShow === 'PersonalFeedback'"
          :filterCurrencyType.sync="refundFilter.currencyType"
          :filterDateRange.sync="refundFilter.dateRange"
          :loading.sync="tableLoading"
        />
        <!--個人反佣 結束-->

        <!--推薦人反佣 開始-->
        <DashboardRecommender
          v-if="refundShow === 'Recommender'"
          :filterCurrencyType.sync="refundFilter.currencyType"
          :filterDateRange.sync="refundFilter.dateRange"
          :loading.sync="tableLoading"
        />
        <!--推薦人反佣 結束-->

        <!--出金 開始-->
        <DashboardWithdrawal
          v-if="refundShow === 'Withdrawal'"
          :filterCurrencyType.sync="refundFilter.currencyType"
          :filterDateRange.sync="refundFilter.dateRange"
          :loading.sync="tableLoading"
        />
        <!--出金 結束-->
      </div>
    </div>
  </div>
  <!--佣金明細 結束-->
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Dashboard',
  data() {
    return {
      refundShow: 'CommissionTransaction',
      tableLoading: false,
      refundFilter: {
        currencyType: 0,
        dateRange: [
          dayjs()
            .subtract(60, 'days')
            .format('yyyy-MM-DD'),
          dayjs().format('yyyy-MM-DD')
        ]
      },
      menuDom: null
    }
  },
  mounted() {
    this.menuDom = document.querySelector('.detail-menu')
  },
  methods: {
    refundChange(type, direction) {
      this.refundShow = type
      this.scorllMenu(direction)
    },
    scorllMenu(direction) {
      switch (direction) {
        case 'left':
          this.menuDom.scrollLeft = 0
          break
        case 'right':
          this.menuDom.scrollLeft = 1000
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  &-container {
    margin: 0 auto;
    max-width: 1360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1500px) {
      margin: 0 3%;
    }
    .detail-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 22px;
      .title {
        font-weight: bold;
        font-size: 30px;
        @media screen and (max-width: 500px) {
          font-size: 22px;
        }
      }
      .withdraw-btn {
        font-size: 14px;
        padding: 9px 30px;
        height: 20px;
        line-height: unset;
        border-radius: 6px;
        color: #ffffff;
        background-image: linear-gradient(180deg, #62ffff 9.47%, #3ea9cc 100%);
        cursor: pointer;
        @media screen and (max-width: 500px) {
          padding: 5px 30px;
        }
      }
    }
    .detail-menu {
      display: flex;
      width: 100%;
      overflow-x: auto;
      .menu {
        flex: 0 0 auto;
        font-size: 16px;
        color: #e5e5e5;
        margin-right: 26px;
        box-sizing: border-box;
        padding-bottom: 10px;
        cursor: pointer;
        transition: color 0.4s;
        @media screen and (max-width: 500px) {
          font-size: 14px;
        }
        &:hover {
          color: #62ffff;
        }
        &.active {
          color: #62ffff;
          border-bottom: 4px solid #62ffff;
        }
      }
    }
    .detail-list {
      width: 100%;
      background-color: #151923;
      padding: 26px 0;
      border-top: 1px #ffffff solid;
      margin-bottom: 30px;
      @media screen and (max-width: 960px) {
        padding: 12px 0;
      }
    }
  }
}
</style>
