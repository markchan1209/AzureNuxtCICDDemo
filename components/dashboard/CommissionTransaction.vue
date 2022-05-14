<template>
  <!--佣金異動紀錄 開始-->
  <div class="detail-section">
    <!-- 控制器電腦版 -->
    <div class="filter-section">
      <!-- 幣別過濾icons -->
      <CommonCoinSelector v-model="currencyType" />
      <!-- 日期選擇器 -->
      <div class="date-picker">
        <div class="title">{{ $t('screening_time') }}：</div>
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
    </div>
    <!-- 控制器電腦版 -->

    <!-- 控制器手機版 開始 -->
    <div class="filter-section-m">
      <div class="fdb-btn-info btn" @click="filterDialog.show = true">{{ $t('filter') }}</div>
      <div class="fdb-btn-info btn" @click="sortDialog.show = true">{{ $t('sort') }}</div>
    </div>
    <!-- 控制器手機版 結束 -->

    <!-- 電腦版清單 開始 -->
    <table class="info-table">
      <thead>
        <tr>
          <th @click="sortData('txDate')">
            <CommonSort :title="$t('trade_date')" sort="txDate" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
          <th>{{ $t('trade_coin_type') }}</th>
          <th>
            <CommonTableFilter v-model="queryForm.changeType" :title="$t('change_type')" :items="changeTypeMap" />
          </th>
          <th @click="sortData('changeNum')">
            <CommonSort :title="$t('change_number')" sort="changeNum" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
          <th @click="sortData('restNum')">
            <CommonSort :title="$t('rest_number')" sort="restNum" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="tableData.length > 0">
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ formatDate(row.txDate) }}</td>
            <td>{{ row.currency }}</td>
            <td>{{ formatChangeType(row.changeType) }}</td>
            <td>
              <span :class="`${setNumColor(row.changeNum)}`">{{ row.changeNum > 0 ? '+' : '' }}{{ row.changeNum }}</span>
            </td>
            <td>{{ row.restNum }}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="5">
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
    <!-- 電腦版清單 結束 -->

    <!--佣金異動紀錄 手機版開始-->
    <div class="info-table-m">
      <template v-if="tableData.length > 0">
        <div v-for="(row, index) in tableData" :key="index" class="info-card">
          <div class="card-item">
            <div class="label">{{ $t('trade_date') }}</div>
            <div class="content">{{ formatDate(row.txDate) }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('trade_coin_type') }}</div>
            <div class="content">{{ row.currency }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('change_type') }}</div>
            <div class="content">{{ formatChangeType(row.changeType) }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('change_number') }}</div>
            <div class="content">
              <span :class="`${setNumColor(row.changeNum)}`">{{ row.changeNum > 0 ? '+' : '' }}{{ row.changeNum }}</span>
            </div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('rest_number') }}</div>
            <div class="content">{{ row.restNum }}</div>
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
    <CommonPager v-if="tableData.length > 0" :get-data="getCommissionTransaction" :pager="pager" />
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
        <div class="label">{{ $t('change_type') }}：</div>
        <div class="content">
          <el-select v-model="queryForm.changeType" class="fdb-select" style="width: 100%" popper-class="fdb-select">
            <el-option :label="$t('all')" :value="-1" />
            <el-option v-for="item in changeTypeMap" :key="item.key" :label="item.name" :value="item.key" />
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
            @change="getCommissionTransaction(true)"
          >
            <el-option :label="$t('trade_date')" value="txDate" />
            <el-option :label="$t('change_number')" value="changeNum" />
            <el-option :label="$t('rest_number')" value="restNum" />
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('sort_by') }}：</div>
        <div class="content">
          <el-select
            v-model="pager.order"
            class="fdb-select"
            style="width: 100%"
            popper-class="fdb-select"
            @change="getCommissionTransaction(true)"
          >
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
  <!--佣金異動紀錄 結束-->
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'CommissionTransaction',
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
        changeType: -1
      },
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
      changeTypeMap: [
        { name: this.$t('personal'), key: 0 },
        { name: this.$t('referrer'), key: 1 },
        { name: this.$t('withdrawal'), key: 2 },
        { name: this.$t('activity_change'), key: 3 }
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
    }
  },
  watch: {
    dateRange() {
      this.getCommissionTransaction(true)
    },
    currencyType() {
      this.getCommissionTransaction(true)
    },
    queryForm: {
      handler() {
        this.getCommissionTransaction(true)
      },
      deep: true
    }
  },
  mounted() {
    this.getCommissionTransaction(true)
  },
  methods: {
    async getCommissionTransaction(resetPager = false) {
      if (resetPager) {
        this.pager.pageIndex = 1
      }
      this.isLoading = true
      try {
        const queryData = {
          currencyType: this.currencyType,
          changeType: this.queryForm.changeType,
          startDate: this.dateRange[0],
          endDate: this.dateRange[1],
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize,
          sortKey: this.pager.sortKey,
          order: this.pager.order
        }
        const res = await this.$api.dashboard.getCommissionTransaction(queryData)
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
      this.getCommissionTransaction(true)
    },
    formatChangeType(changeCode) {
      const findItem = this.changeTypeMap.find(item => item.key === changeCode)
      return findItem ? findItem.name : this.$t('undefined')
    },
    setNumColor(num) {
      return num > 0 ? 'text-green' : 'text-red'
    }
  }
}
</script>

<style lang="scss" scoped></style>
