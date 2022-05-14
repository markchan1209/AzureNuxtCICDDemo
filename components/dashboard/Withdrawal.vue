<template>
  <!--出金 開始-->
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
    </div>

    <!-- 控制器手機版 開始 -->
    <div class="filter-section-m">
      <div class="fdb-btn-info btn" @click="filterDialog.show = true">{{ $t('filter') }}</div>
      <div class="fdb-btn-info btn" @click="sortDialog.show = true">{{ $t('sort') }}</div>
    </div>
    <!-- 控制器手機版 結束 -->

    <table class="info-table">
      <thead>
        <tr>
          <th>
            <CommonTableFilter v-model="queryForm.rebateStatus" :title="$t('application_status')" :items="rebateStatusMap" />
          </th>
          <th>{{ $t('application_number') }}</th>
          <th @click="sortData('orderDate')">
            <CommonSort :title="$t('apply_withdrawal_time')" sort="orderDate" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
          <th>{{ $t('apply_coin_type') }}</th>
          <th @click="sortData('orderValue')">
            <CommonSort :title="$t('apply_number')" sort="orderValue" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
          <th @click="sortData('finishDate')">
            <CommonSort :title="$t('completed_withdrawal_date')" sort="finishDate" :sort-key="pager.sortKey" :order="pager.order" />
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="tableData.length > 0">
          <tr v-for="(row, index) in tableData" :key="index">
            <td>
              <template v-if="row.rebateStatus === 0">
                <div class="status yet"></div>
                {{ $t('applying') }}
              </template>
              <template v-if="row.rebateStatus === 1">
                <div class="status progress"></div>
                {{ $t('withdrawal') }}
              </template>
              <template v-if="row.rebateStatus === 2">
                <div class="status already"></div>
                {{ $t('completed') }}
              </template>
              <template v-if="row.rebateStatus === 3">
                <div class="status already"></div>
                {{ $t('cancelled') }}
              </template>
            </td>
            <td>{{ row.orderNum }}</td>
            <td>{{ formatDate(row.orderDate) }}</td>
            <td>{{ $map.currencyMap[row.currency] }}</td>
            <td>{{ row.orderValue }}</td>
            <td>{{ formatDate(row.finishDate) }}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="6">
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

    <!--出金 手機版開始-->
    <div class="info-table-m">
      <template v-if="tableData.length > 0">
        <div v-for="(row, index) in tableData" :key="index" class="info-card">
          <div class="card-item">
            <div class="label">{{ $t('rebate_status') }}</div>
            <div class="content">
              <template v-if="row.rebateStatus === 0">
                <div class="status yet"></div>
                {{ $t('applying') }}
              </template>
              <template v-if="row.rebateStatus === 1">
                <div class="status progress"></div>
                {{ $t('withdrawal') }}
              </template>
              <template v-if="row.rebateStatus === 2">
                <div class="status already"></div>
                {{ $t('completed') }}
              </template>
              <template v-if="row.rebateStatus === 3">
                <div class="status already"></div>
                {{ $t('cancelled') }}
              </template>
            </div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('application_number') }}</div>
            <div class="content">{{ row.orderNum }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('trade_date') }}</div>
            <div class="content">{{ formatDate(row.orderDate) }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('trade_coin_type') }}</div>
            <div class="content">{{ $map.currencyMap[row.currency] }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('apply_number') }}</div>
            <div class="content">{{ row.orderValue }}</div>
          </div>
          <div class="card-item">
            <div class="label">{{ $t('completed_withdrawal_date') }}</div>
            <div class="content">{{ formatDate(row.finishDate) }}</div>
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
    <!--出金 手機版結束-->

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
        <div class="label">{{ $t('application_status') }}：</div>
        <div class="content">
          <el-select v-model="queryForm.rebateStatus" class="fdb-select" style="width: 100%" popper-class="fdb-select">
            <el-option :label="$t('all')" :value="-1" />
            <el-option v-for="item in rebateStatusMap" :key="item.key" :label="item.name" :value="item.key" />
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
          <el-select v-model="pager.sortKey" class="fdb-select" style="width: 100%" popper-class="fdb-select" @change="getWithdrawal(true)">
            <el-option :label="$t('apply_withdrawal_time')" value="orderDate" />
            <el-option :label="$t('apply_number')" value="orderValue" />
            <el-option :label="$t('completed_withdrawal_date')" value="finishDate" />
          </el-select>
        </div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('sort_by') }}：</div>
        <div class="content">
          <el-select v-model="pager.order" class="fdb-select" style="width: 100%" popper-class="fdb-select" @change="getWithdrawal(true)">
            <el-option :label="$t('positive_order')" value="asc" />
            <el-option :label="$t('reverse_order')" value="desc" />
          </el-select>
        </div>
      </div>
      <div slot="footer" style="width: 100%">
        <div class="fdb-btn-default" @click="sortDialog.show = false">{{ $t('close') }}</div>
      </div>
    </el-dialog>

    <!--Pages-->
    <CommonPager v-if="tableData.length > 0" :get-data="getWithdrawal" :pager="pager" />
    <!--Pages-->
  </div>
  <!--出金 結束-->
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Withdrawal',
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
      tableData: [],
      queryForm: {
        rebateStatus: -1
      },
      pager: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        sortKey: 'orderDate',
        order: 'desc'
      },
      filterDialog: {
        show: false
      },
      sortDialog: {
        show: false
      },
      rebateStatusMap: [
        { name: this.$t('applying'), key: 0 },
        { name: this.$t('withdrawal'), key: 1 },
        { name: this.$t('completed'), key: 2 },
        { name: this.$t('cancelled'), key: 3 }
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
      this.getWithdrawal(true)
    },
    currencyType() {
      this.getWithdrawal(true)
    },
    queryForm: {
      handler() {
        this.getWithdrawal(true)
      },
      deep: true
    }
  },
  mounted() {
    this.getWithdrawal(true)
  },
  methods: {
    async getWithdrawal(resetPager = false) {
      if (resetPager) {
        this.pager.pageIndex = 1
      }
      this.isLoading = true
      try {
        const queryData = {
          currencyType: this.currencyType,
          rebateStatus: this.queryForm.rebateStatus,
          startDate: this.dateRange[0],
          endDate: this.dateRange[1],
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize,
          sortKey: this.pager.sortKey,
          order: this.pager.order
        }
        const res = await this.$api.dashboard.getWithdrawal(queryData)
        this.tableData = res.data
        this.pager.totalCount = res.totalCount
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    formatDate(date) {
      return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-'
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
      this.getWithdrawal(true)
    }
  }
}
</script>

<style scoped></style>
