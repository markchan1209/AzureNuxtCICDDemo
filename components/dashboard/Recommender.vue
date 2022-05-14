<template>
  <!--推薦人反佣 開始-->
  <div class="detail-section">
    <div class="filter-section">
      <!-- 幣別過濾icons -->
      <CommonCoinSelector v-model="currencyType" />

      <!-- 日期選擇器 -->
      <div class="date-picker">
        <div class="title">{{ $t('filter_time') }}：</div>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          class="fdb"
          :range-separator="$t('to')"
          :start-placeholder="$t('start_time')"
          :end-placeholder="$t('end_time')"
          size="mini"
          value-format="yyyy-MM-dd"
          :clearable="false"
        ></el-date-picker>
      </div>
      <!-- 輸入會員名稱關鍵字 -->
      <div class="key-search">
        <img src="@/assets/img/common/icon-search.png" alt="search" />
        <input v-model="memberName" type="text" :placeholder="$t('enter_member_keyword')" @keyup.enter="getRecommender(true)" />
      </div>
      <!-- 管理組別 -->
      <div style="flex: 1; text-align: end">
        <NuxtLink
          :to="{ name: 'lang-personal', query: { tab: 'recommend-management' }, params: { lang: $route.params.lang } }"
          class="btn fdb-btn-default"
        >
          {{ $t('manage_group') }}
        </NuxtLink>
      </div>
    </div>

    <!-- 控制器手機版 開始 -->
    <div class="filter-section-m">
      <div class="fdb-btn-info" style="margin-right: 6px" @click="filterDialog.show = true">{{ $t('filter') }}</div>
      <div class="fdb-btn-info" style="margin-right: 6px" @click="sortDialog.show = true">{{ $t('sort') }}</div>
      <NuxtLink
        :to="{ name: 'lang-personal', query: { tab: 'recommend-management' }, params: { lang: $route.params.lang } }"
        style="margin-left: auto"
        class="fdb-btn-default"
      >
        {{ $t('manage_group') }}
      </NuxtLink>
    </div>
    <!-- 控制器手機版 結束 -->

    <table class="info-table">
      <thead>
        <tr>
          <th>
            <CommonTableFilter v-model="queryForm.rebateStatus" :title="$t('rebate_status')" :items="rebateStatusMap" />
          </th>
          <th @click="sortData('txDate')">
            <CommonSort :title="$t('trade_date')" sort="txDate" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
          <th>{{ $t('trade_coin_type') }}</th>
          <th>{{ $t('member_name') }}</th>
          <th>
            <CommonTableFilter
              v-model="queryForm.rgid"
              :title="$t('referrer_group')"
              :items="availableGroups.map(item => ({ name: item.name, key: item.rgid, color: item.color }))"
            />
          </th>
          <th @click="sortData('canRebatePoint')">
            <CommonSort :title="$t('rebate_trading_volume')" sort="canRebatePoint" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
          <th @click="sortData('canRebatValue')">
            <CommonSort :title="$t('rebate_quantity')" sort="canRebatValue" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="tableData.length > 0">
          <tr v-for="(row, index) in tableData" :key="index">
            <td>
              <template v-if="row.rebateStatus === 0">
                <div class="status yet"></div>
                {{ $t('no_rebate') }}
              </template>
              <template v-if="row.rebateStatus === 1">
                <div class="status already"></div>
                {{ $t('be_rebate') }}
              </template>
            </td>
            <td>{{ formatDate(row.txDate) }}</td>
            <td>{{ $map.currencyMap[row.currency] }}</td>
            <td>{{ row.memberName }}</td>
            <td>
              <div :class="`group group-color-${(groupMap[row.rgid] && groupMap[row.rgid].color) || 0}`">
                {{ (groupMap[row.rgid] && groupMap[row.rgid].name) || $t('no_group') }}
              </div>
            </td>
            <td>{{ row.canRebatePoint }}</td>
            <td>{{ row.canRebatValue }}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="7">
            <div class="empty-container">
              <div class="flex-c-center">
                <img src="@/assets/img/common/empty.png" alt="empty" />
                <div style="text-align: center;line-height: 0px;font-size: 18px;letter-spacing: 0.1em;">{{ $t('empty_data') }}</div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!--佣金異動紀錄 手機版開始-->
    <div class="info-table-m">
      <template v-if="tableData.length > 0">
        <div v-for="(row, index) in tableData" :key="index" class="info-card">
          <div class="card-item">
            <div class="label">{{ $t('rebate_status') }}</div>
            <div class="content">
              <template v-if="row.rebateStatus === 0">
                <div class="status yet"></div>
                {{ $t('no_rebate') }}
              </template>
              <template v-if="row.rebateStatus === 1">
                <div class="status already"></div>
                {{ $t('be_rebate') }}
              </template>
            </div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('trade_date') }}</div>
            <div class="content">{{ formatDate(row.txDate) }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('trade_coin_type') }}</div>
            <div class="content">{{ $map.currencyMap[row.currency] }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('member_name') }}</div>
            <div class="content">{{ row.memberName }}</div>
          </div>
          <div class="card-item" style="margin: 14px 0">
            <div class="label">{{ $t('referrer_group') }}</div>
            <div class="content">
              <div :class="`group group-color-${(groupMap[row.rgid] && groupMap[row.rgid].color) || 0}`">
                {{ (groupMap[row.rgid] && groupMap[row.rgid].name) || $t('no_group') }}
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('rebate_trading_volume') }}</div>
            <div class="content">{{ row.canRebatePoint }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('rebate_quantity') }}</div>
            <div class="content">{{ row.canRebatValue }}</div>
          </div>
        </div>
      </template>
      <div v-else style="margin: 0 auto" class="empty-container">
        <div class="flex-c-center">
          <img src="@/assets/img/common/empty.png" alt="empty" />
          <div style="text-align: center;line-height: 0px;font-size: 18px;letter-spacing: 0.1em;">{{ $t('empty_data') }}</div>
        </div>
      </div>
    </div>
    <!--佣金異動紀錄 手機版結束-->

    <!--Pages-->
    <CommonPager v-if="tableData.length > 0" :get-data="getRecommender" :pager="pager" />
    <!--Pages-->

    <!-- 篩選彈窗 -->
    <el-dialog
      :title="$t('filter')"
      :visible.sync="filterDialog.show"
      width="300px"
      :show-close="false"
      custom-class="fbd-dialog controller-dialog"
    >
      <div class="form-item">
        <div class="label">{{ $t('currency') }}：</div>
        <div class="content"><CommonCoinSelector v-model="currencyType" /></div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('start_time') }}：</div>
        <div class="content">
          <el-date-picker
            v-model="dateRange[0]"
            type="date"
            class="fdb"
            value-format="yyyy-MM-dd"
            :placeholder="$t('start_date')"
            :clearable="false"
          ></el-date-picker>
        </div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('end_time') }}：</div>
        <div class="content">
          <el-date-picker
            v-model="dateRange[1]"
            type="date"
            class="fdb"
            value-format="yyyy-MM-dd"
            :placeholder="$t('end_date')"
            :clearable="false"
          ></el-date-picker>
        </div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('member_name') }}：</div>
        <div class="content">
          <div class="key-search" style="width: 100%">
            <img src="@/assets/img/common/icon-search.png" alt="search" />
            <input v-model="memberName" type="text" :placeholder="$t('enter_member_keyword')" @keyup.enter="getRecommender(true)" />
          </div>
        </div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('rebate_status') }}：</div>
        <div class="content">
          <el-select v-model="queryForm.rebateStatus" class="fdb-select" style="width: 100%" popper-class="fdb-select">
            <el-option :label="$t('all')" :value="-1" />
            <el-option v-for="item in rebateStatusMap" :key="item.key" :label="item.name" :value="item.key" />
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('referrer_group') }}：</div>
        <div class="content">
          <el-select v-model="queryForm.rgid" class="fdb-select" style="width: 100%" popper-class="fdb-select">
            <el-option :label="$t('all')" :value="-1" />
            <el-option
              v-for="item in availableGroups.map(item => ({ name: item.name, key: item.rgid, color: item.color }))"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            />
          </el-select>
        </div>
      </div>
      <div slot="footer" style="width: 100%">
        <div class="fdb-btn-default" @click="filterDialog.show = false">{{ $t('close') }}</div>
      </div>
    </el-dialog>

    <!-- 排序彈窗 -->
    <el-dialog
      :title="$t('sort')"
      :visible.sync="sortDialog.show"
      width="300px"
      :show-close="false"
      custom-class="fbd-dialog controller-dialog"
    >
      <div class="form-item">
        <div class="label">{{ $t('sort_field') }}：</div>
        <div class="content">
          <el-select
            v-model="pager.sortKey"
            class="fdb-select"
            style="width: 100%"
            popper-class="fdb-select"
            @change="getRecommender(true)"
          >
            <el-option :label="$t('trade_date')" value="txDate" />
            <el-option :label="$t('rebate_trading_volume')" value="canRebatePoint" />
            <el-option :label="$t('rebate_quantity')" value="canRebatValue" />
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('sort_by') }}：</div>
        <div class="content">
          <el-select v-model="pager.order" class="fdb-select" style="width: 100%" popper-class="fdb-select" @change="getRecommender(true)">
            <el-option :label="$t('positive_order')" value="asc" />
            <el-option :label="$t('reverse_order')" value="desc" />
          </el-select>
        </div>
      </div>
      <div slot="footer" style="width: 100%">
        <div class="fdb-btn-default" @click="sortDialog.show = false">{{ $t('close') }}</div>
      </div>
    </el-dialog>
  </div>
  <!--推薦人反佣 結束-->
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Recommender',
  props: {
    filterDateRange: {
      type: Array,
      default: () => []
    },
    filterCurrencyType: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      queryForm: {
        rebateStatus: -1,
        rgid: -1
      },
      memberName: '',
      tableData: [],
      pager: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        sortKey: 'txDate',
        order: 'desc'
      },
      filterDialog: {
        show: false
      },
      sortDialog: {
        show: false
      },
      rebateStatusMap: [
        { name: this.$t('no_rebate'), key: 0 },
        { name: this.$t('be_rebate'), key: 1 }
      ]
    }
  },
  computed: {
    dateRange: {
      get() {
        return this.filterDateRange
      },
      set(val) {
        this.$emit('update:filterDateRange', val)
      }
    },
    currencyType: {
      get() {
        return this.filterCurrencyType
      },
      set(val) {
        this.$emit('update:filterCurrencyType', val)
      }
    },
    isLoading: {
      get() {
        return this.loading
      },
      set(val) {
        this.$emit('update:loading', val)
      }
    },
    groupList() {
      return this.$store.state.group.groupList
    },
    availableGroups() {
      return this.groupList.filter(item => item.name)
    },
    groupMap() {
      return this.availableGroups.reduce((obj, item) => {
        obj[item.rgid] = item
        return obj
      }, {})
    }
  },
  watch: {
    dateRange() {
      this.getRecommender(true)
    },
    currencyType() {
      this.getRecommender(true)
    },
    queryForm: {
      handler() {
        this.getRecommender(true)
      },
      deep: true
    }
  },
  created() {
    this.$store.dispatch('group/getRecGroup')
  },
  mounted() {
    this.getRecommender(true)
  },
  methods: {
    async getRecommender(resetPager = false) {
      if (resetPager) {
        this.pager.pageIndex = 1
      }
      this.isLoading = true
      try {
        const reqBody = {
          currencyType: this.currencyType,
          rebateStatus: this.queryForm.rebateStatus,
          rgid: this.queryForm.rgid,
          memberName: this.memberName,
          startDate: this.dateRange[0],
          endDate: this.dateRange[1],
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize,
          sortKey: this.pager.sortKey,
          order: this.pager.order
        }
        const res = await this.$api.dashboard.getRecommender(reqBody)
        this.tableData = res.data
        this.pager.totalCount = res.totalCount
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    formatDate(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    sortData(sortKey) {
      if (this.pager.sortKey === sortKey) {
        switch (this.pager.order) {
          case 'asc':
            this.pager.order = 'desc'
            break
          case 'desc':
            this.pager.order = 'asc'
            break
          default:
            this.pager.order = 'asc'
            break
        }
      } else {
        this.pager.sortKey = sortKey
        this.pager.order = 'asc'
      }
      this.getRecommender(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  display: inline;
  padding: 4px 20px;
  // background-color: #696969;
  border-radius: 16px;
  color: #151923;
}
</style>
