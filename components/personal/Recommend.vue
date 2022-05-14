<template>
  <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="recommend">
    <div class="recommend-body">
      <div class="controller">
        <div class="controller-store">
          <div class="label">{{ $t('select_exchange') }}：</div>
          <el-select v-model="storeSelect" class="fdb-select" popper-class="fdb-select">
            <el-option label="bybit" :value="'bybit'" />
          </el-select>
        </div>
        <div class="controller-btns">
          <div
            v-if="widthWithiIn(['L', 'M', 'S'])"
            class="fdb-btn-info btn"
            :class="{ active: controllerMode === 'sort' }"
            style="margin-right: 8px;"
            @click="setControlMode('sort')"
          >
            {{ $t('sort') }}
          </div>
          <div
            v-if="widthWithiIn(['L', 'M', 'S'])"
            class="fdb-btn-info btn"
            :class="{ active: controllerMode === 'filter' }"
            style="margin-right: 8px;"
            @click="setControlMode('filter')"
          >
            {{ $t('filter') }}
          </div>
          <div
            class="fdb-btn-info btn"
            :class="{ 'click-disabled': selectIds.length === 0 }"
            style="margin-right: 8px;"
            @click="setGroupDialog.show = true"
          >
            {{ $t('edit_group') }}
          </div>
          <div class="fdb-btn-primary btn" @click="editGroup">{{ $t('manage_group') }}</div>
        </div>
      </div>
      <div v-if="widthWithiIn(['L', 'M', 'S'])" class="controller-m" :class="{ show: controllerMode !== 'none' }">
        <div v-if="controllerMode === 'filter'" class="m-item">
          <div class="item-title">{{ $t('belong_group') }}：</div>
          <div class="item-body">
            <el-select v-model="sreachForm.rgid" class="fdb-select" popper-class="fdb-select">
              <el-option :label="$t('all')" :value="-1" />
              <el-option v-for="group in availableGroups" :key="group.rgid" :label="group.name" :value="group.rgid"></el-option>
            </el-select>
          </div>
        </div>
        <div v-if="controllerMode === 'sort'" class="m-item">
          <div class="item-title">{{ $t('sort_field') }}：</div>
          <div class="item-body">
            <el-select v-model="pager.sortKey" class="fdb-select" popper-class="fdb-select" @change="getRecommend(true)">
              <el-option :label="$t('join_date')" value="createdate" />
              <el-option :label="$t('last_trade_date')" value="lastdate" />
            </el-select>
          </div>
        </div>
        <div v-if="controllerMode === 'sort'" class="m-item">
          <div class="item-title">{{ $t('sort_by') }}：</div>
          <div class="item-body">
            <el-select v-model="pager.order" class="fdb-select" popper-class="fdb-select" @change="getRecommend(true)">
              <el-option :label="$t('positive_order')" value="asc" />
              <el-option :label="$t('reverse_order')" value="desc" />
            </el-select>
          </div>
        </div>
      </div>
      <div class="list">
        <table class="list-table" cellspacing="0" cellpadding="0" border="0">
          <thead>
            <tr>
              <th><input v-model="selectAllCheckBox" type="checkbox" class="check" /></th>
              <th>{{ $t('member_name') }}</th>
              <th v-if="widthWithiIn(['MAX', 'XXL', 'XL', 'L', 'M'])" style="text-align: center; width: 85px;">{{ $t('connect_info') }}</th>
              <th v-if="widthWithiIn(['MAX', 'XXL'])" style="width: 156px; text-align: center;">{{ $t('trade_coin_type') }}</th>
              <th v-if="widthWithiIn(['MAX', 'XXL'])" style="text-align: center;">{{ $t('rebate_trade_value') }}</th>
              <th style="text-align: center;width: 120px;">
                <CommonTableFilter
                  v-if="widthWithiIn(['MAX', 'XXL', 'XL'])"
                  v-model="sreachForm.rgid"
                  :title="$t('belong_group')"
                  :items="availableGroups.map(item => ({ name: item.name, key: item.rgid, color: item.color }))"
                />
                <span v-else>{{ $t('belong_group') }}</span>
              </th>
              <th v-if="widthWithiIn(['MAX', 'XXL', 'XL'])" style="width: 142px;text-align: center;" @click="sortData('createdate')">
                <CommonSort :title="$t('join_date')" sort="createdate" :sort-key="pager.sortKey" :order="pager.order" />
              </th>
              <th v-if="widthWithiIn(['MAX', 'XXL', 'XL'])" style="width: 142px;text-align: center;" @click="sortData('lastdate')">
                <CommonSort :title="$t('last_trade_date')" sort="lastdate" :sort-key="pager.sortKey" :order="pager.order" />
              </th>
              <th v-if="widthWithiIn(['XL', 'L', 'M', 'S'])" style="width: 30px;"></th>
            </tr>
          </thead>
          <tbody v-if="tableData.length > 0">
            <template v-for="(row, index) in tableData">
              <tr :key="`tr-1-${index}`">
                <td><input v-model="selectIdsCheckBox" type="checkbox" class="check" :value="row.fdb_id" /></td>
                <td>
                  <span>{{ row.name }}</span>
                  <span v-if="widthWithiIn(['S'])" style="margin-left: 12px;float: right;">
                    <el-tooltip effect="dark" :content="row.email" placement="top">
                      <img class="connect-icon" src="@/assets/img/personal/email.png" alt="email" />
                    </el-tooltip>
                    <el-tooltip effect="dark" :content="`${row.areaCode} ${row.phone}`" placement="top">
                      <img class="connect-icon" src="@/assets/img/personal/phone.png" alt="phone" />
                    </el-tooltip>
                  </span>
                </td>
                <td v-if="widthWithiIn(['MAX', 'XXL', 'XL', 'L', 'M'])" style="text-align: center;">
                  <el-tooltip effect="dark" :content="row.email" placement="top">
                    <img class="connect-icon" src="@/assets/img/personal/email.png" alt="email" />
                  </el-tooltip>
                  <el-tooltip effect="dark" :content="`${row.areaCode} ${row.phone}`" placement="top">
                    <img class="connect-icon" src="@/assets/img/personal/phone.png" alt="phone" />
                  </el-tooltip>
                </td>
                <td v-if="widthWithiIn(['MAX', 'XXL'])">
                  <CommonCoinIcon
                    v-for="(coin, coinIndex) in filterZeroCoin(row.userCoinModels)"
                    :key="coinIndex"
                    class="coin"
                    :coin-type="$map.currencyMap[coin.currencyType]"
                  />
                </td>
                <td v-if="widthWithiIn(['MAX', 'XXL'])" style="text-align: center;">
                  <span class="text-link" style="font-family: 'Avenir';" @click="row.showInfo = !row.showInfo">
                    {{ $t('view_information') }}
                  </span>
                </td>
                <td style="text-align: center;">
                  <div :class="`group group-color-${(groupMap[row.rgid] && groupMap[row.rgid].color) || 0}`">
                    {{ (groupMap[row.rgid] && groupMap[row.rgid].name) || $t('no_group') }}
                  </div>
                </td>
                <td v-if="widthWithiIn(['MAX', 'XXL', 'XL'])" style="text-align: center;">{{ formatDate(row.createdate) }}</td>
                <td v-if="widthWithiIn(['MAX', 'XXL', 'XL'])" style="text-align: center;">
                  {{ formatDate(row.lastdate) }}
                  <span></span>
                </td>
                <td v-if="widthWithiIn(['XL', 'L', 'M', 'S'])" style="text-align: center;" @click="row.showInfo = !row.showInfo">
                  <i :class="`el-icon-caret-${row.showInfo ? 'top' : 'bottom'}`"></i>
                </td>
              </tr>
              <tr v-if="row.showInfo" :key="`tr-2-${index}`" class="detail">
                <td :colspan="detailColspan">
                  <div v-if="widthWithiIn(['MAX', 'XXL'])" class="detail-content">
                    <div v-for="(coin, coinIndex) in filterZeroCoin(row.userCoinModels)" :key="coinIndex" class="coin-info">
                      <CommonCoinIcon class="coin" :coin-type="$map.currencyMap[coin.currencyType]" />
                      <span>{{ $map.currencyMap[coin.currencyType] }} - {{ coin.coinCount }}</span>
                    </div>
                  </div>
                  <div v-else class="detail-content">
                    <div v-if="widthWithiIn(['L', 'M', 'S'])" class="content-item">
                      <div class="item-title">{{ $t('join_date') }}</div>
                      <div class="item-body">{{ formatDate(row.createdate) }}</div>
                    </div>
                    <div v-if="widthWithiIn(['L', 'M', 'S'])" class="content-item">
                      <div class="item-title">{{ $t('last_trade_date') }}</div>
                      <div class="item-body">{{ formatDate(row.lastdate) }}</div>
                    </div>
                    <div class="content-item">
                      <div class="item-title">{{ $t('rebate_trade_value') }}</div>
                      <div class="item-body">
                        <div v-for="(coin, coinIndex) in filterZeroCoin(row.userCoinModels)" :key="coinIndex" class="detail-coin-info">
                          <CommonCoinIcon class="coin" :coin-type="$map.currencyMap[coin.currencyType]" />
                          <span>{{ $map.currencyMap[coin.currencyType] }} - {{ coin.coinCount }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
          <tbody v-else>
            <tr>
              <td style="padding: 10vw 0;" colspan="12">
                <img src="@/assets/img/common/empty.png" alt="empty" style="width: 60px;" />
                <div style="color: #dddddd;">{{ $t('empty_data') }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pager">
      <CommonPager :get-data="getRecommend" :pager="pager" />
    </div>

    <!-- 編輯推薦人組別彈窗 -->
    <el-dialog
      :title="$t('edit_recommender_group')"
      :visible.sync="setGroupDialog.show"
      :width="deviceWidth > 500 ? '488px' : '95vw'"
      :show-close="false"
      custom-class="fbd-dialog set-group-dialog"
    >
      <div v-loading="setGroupDialog.isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="dialog-body">
        <div class="group-select" :class="{ 'click-disabled': setGroupDialog.newGroupName || availableGroups.length === 0 }">
          <div class="label">{{ $t('select_group') }}</div>
          <el-select
            v-model="setGroupDialog.groupSelect"
            class="fdb-select select-L"
            popper-class="fdb-select"
            :style="`${widthWithiIn(['S']) ? 'width: 100%;' : ''}`"
            :placeholder="$t('please_select_current_group')"
            clearable
          >
            <el-option v-for="(group, index) in availableGroups" :key="index" :label="group.name" :value="group.rgid">
              <span :class="`color-dot group-color-${group.color}`"></span>
              {{ group.name }}
            </el-option>
          </el-select>
        </div>
        <div class="line">or</div>
        <div class="new-group" :class="{ 'click-disabled': setGroupDialog.groupSelect || availableGroups.length > 9 }">
          <div class="item">
            <div class="label">{{ $t('build_group') }}</div>
            <input v-model="setGroupDialog.newGroupName" type="text" :placeholder="$t('enter_group_name')" />
          </div>
          <div class="item">
            <div class="label">{{ $t('select_color') }}</div>
            <div class="color-picker">
              <div
                v-for="(item, index) in 10"
                :key="index"
                :class="`color-item group-color-${index} ${setGroupDialog.activeColor === index ? 'active' : ''}`"
                @click="setGroupDialog.activeColor = index"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <span v-loading="setGroupDialog.isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" slot="footer">
        <div class="fdb-btn-default" style="margin-right: 12px;" @click="setGroupDialog.show = false">{{ $t('cancel') }}</div>
        <div class="fdb-btn-primary" :class="{ disabled: !setGroupDialog.groupSelect && !setGroupDialog.newGroupName }" @click="bindGroup">
          {{ $t('bind') }}
        </div>
      </span>
    </el-dialog>

    <!-- 管理推薦人組別彈窗 -->
    <el-dialog
      :title="$t('manage_recommender_group')"
      :visible.sync="editGroupDialog.show"
      :width="deviceWidth > 500 ? '488px' : '95vw'"
      :show-close="false"
      custom-class="fbd-dialog edit-group-dialog"
    >
      <div v-loading="editGroupDialog.isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" class="dialog-body">
        <div v-for="(group, gIndex) in editGroupDialog.groups" :key="gIndex" class="group-item">
          <input v-model="group.name" type="text" :placeholder="$t('please_enter_group_name')" />
          <el-dropdown trigger="click" placement="right-start" @command="handleCommand">
            <div class="color-picker">
              <div :class="`color-item group-color-${group.color}`"></div>
              <i class="el-icon-caret-right"></i>
            </div>
            <el-dropdown-menu class="fdb-menu" slot="dropdown">
              <el-dropdown-item v-for="(item, cIndex) in 10" :key="cIndex" :command="{ groupIndex: gIndex, colorIndex: cIndex }">
                <div :class="`color-item group-color-${cIndex}`"></div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <span v-loading="editGroupDialog.isLoading" element-loading-background="rgba(0, 0, 0, 0.5)" slot="footer">
        <div class="fdb-btn-default" style="margin-right: 12px;" @click="editGroupDialog.show = false">{{ $t('cancel_all') }}</div>
        <div class="fdb-btn-primary" @click="saveGroup">{{ $t('save_all') }}</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Recommend',
  data() {
    return {
      isLoading: false,
      storeSelect: 'bybit',
      controllerMode: 'none',
      tableData: [],
      sreachForm: {
        rgid: -1
      },
      pager: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
        sortKey: 'createdate',
        order: 'desc'
      },
      selectAll: false,
      selectIds: [],
      setGroupDialog: {
        show: false,
        isLoading: false,
        groupSelect: '',
        newGroupName: '',
        activeColor: 0
      },
      editGroupDialog: {
        show: false,
        groups: [],
        isLoading: false
      }
    }
  },
  computed: {
    deviceWidth() {
      return this.$store.state.app.deviceWidth
    },
    widthSize() {
      return this.$store.getters['app/widthSize']
    },
    detailColspan() {
      switch (this.widthSize) {
        case 'XL':
          return 7
        case 'L':
        case 'M':
          return 5
        case 'S':
          return 4
        default:
          return 8
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
    },
    selectAllCheckBox: {
      get() {
        return this.selectAll
      },
      set(value) {
        switch (value) {
          case 'setTrue':
            this.selectAll = true
            break
          case 'setFalse':
            this.selectAll = false
            break
          case true:
            this.selectIdsCheckBox = 'setAll'
            this.selectAll = true
            break
          case false:
            this.selectIdsCheckBox = 'removeAll'
            this.selectAll = false
            break
        }
      }
    },
    selectIdsCheckBox: {
      get() {
        return this.selectIds
      },
      set(value) {
        switch (value) {
          case 'setAll':
            this.selectIds = this.tableData.map(item => item.fdb_id)
            break
          case 'removeAll':
            this.selectIds = []
            break
          default:
            if (value.length === this.tableData.length) {
              this.selectAllCheckBox = 'setTrue'
            } else {
              this.selectAllCheckBox = 'setFalse'
            }
            this.selectIds = value
            break
        }
      }
    }
  },
  watch: {
    'setGroupDialog.show'(value) {
      if (value) {
        this.setGroupDialog.groupSelect = ''
        this.setGroupDialog.newGroupName = ''
        this.setGroupDialog.activeColor = 0
      }
    },
    sreachForm: {
      handler() {
        this.getRecommend(true)
      },
      deep: true
    }
  },
  created() {
    this.getRecommend()
    this.$store.dispatch('group/getRecGroup')
  },
  methods: {
    async getRecommend(reset) {
      if (reset) {
        this.pager.pageIndex = 1
      }
      this.selectIds = []
      this.selectAll = false
      this.isLoading = true
      try {
        const reqBody = {
          pageIndex: this.pager.pageIndex,
          pageSize: this.pager.pageSize,
          sortKey: this.pager.sortKey,
          order: this.pager.order,
          rgid: this.sreachForm.rgid
        }
        const res = await this.$api.recommender.getRecList(reqBody)
        this.tableData = res.data.data.map(item => {
          return { ...item, showInfo: false }
        })
        this.pager.totalCount = res.data.totalCount
      } catch (error) {
        console.error(error)
      }
      this.isLoading = false
    },
    filterGroup(groupId) {
      this.sreachForm.rgid = groupId
      this.getRecommend()
    },
    handleCommand({ groupIndex, colorIndex }) {
      this.editGroupDialog.groups[groupIndex].color = colorIndex
    },
    editGroup() {
      this.editGroupDialog.groups = JSON.parse(JSON.stringify(this.groupList))
      this.editGroupDialog.show = true
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
      this.getRecommend(true)
    },
    async bindGroup() {
      this.setGroupDialog.isLoading = true
      try {
        const reqBody = {
          fdb_ids: this.selectIds,
          rgid: this.setGroupDialog.groupSelect || 0,
          name: this.setGroupDialog.newGroupName,
          color: this.setGroupDialog.activeColor
        }
        await this.$api.recommender.insertGroup(reqBody)
        await this.$store.dispatch('group/getRecGroup')
        this.setGroupDialog.show = false
        this.$message.success(this.$t('bind_group_success'))
        this.getRecommend()
      } catch (error) {
        console.error(error)
      }
      this.setGroupDialog.isLoading = false
    },
    async saveGroup() {
      this.editGroupDialog.isLoading = true
      try {
        await this.$api.recommender.editGroup(this.editGroupDialog.groups)
        await this.$store.dispatch('group/getRecGroup')
        this.editGroupDialog.show = false
        this.$message.success(this.$t('save_success'))
        this.getRecommend()
      } catch (error) {
        console.error(error)
      }
      this.editGroupDialog.isLoading = false
    },
    widthWithiIn(sizes) {
      return sizes.includes(this.widthSize)
    },
    setControlMode(mode) {
      if (mode === this.controllerMode) {
        this.controllerMode = 'none'
      } else {
        this.controllerMode = mode
      }
    },
    filterZeroCoin(coins) {
      return coins.filter(coin => Number(coin.coinCount) > 0)
    },
    formatDate(dString) {
      if (dString) {
        return dayjs(dString, 'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD HH:mm')
      } else {
        return '-'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.set-group-dialog {
  .dialog-body {
    padding: 0;
    .group-select {
      display: flex;
      flex-direction: column;
      padding-left: 0px;
      .label {
        width: 100%;
        font-size: 16px;
        padding-right: 0;
        margin-bottom: 8px;
      }
      select {
        flex: 0 0 auto;
        height: 38px;
        font-size: 14px;
        width: 100%;
        color: #c4c4c4;
        border: none;
        background: #252c3d;
        box-sizing: border-box;
        border-radius: 8px;
        padding-left: 14px;
      }
    }
    .line {
      position: relative;
      text-align: center;
      font-size: 16px;
      width: 100%;
      line-height: 52px;
      &::before {
        position: absolute;
        left: 0;
        top: 50%;
        content: '';
        height: 1px;
        width: 43%;
        background-color: #ffffff;
      }
      &::after {
        position: absolute;
        right: 0;
        top: 50%;
        content: '';
        height: 1px;
        width: 43%;
        background-color: #ffffff;
      }
    }
    .new-group {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        flex-direction: column;
        &:last-child {
          margin-bottom: 0px;
        }
        .label {
          width: 100%;
          font-size: 16px;
          padding-right: 0;
          text-align: start;
          margin-bottom: 8px;
        }
        input {
          flex: 0 0 auto;
          height: 38px;
          width: 100%;
          font-size: 12px;
          border: none;
          box-sizing: border-box;
          border-radius: 8px;
          color: #c4c4c4;
          padding-left: 10px;
          background-color: #252c3d;
        }
        .color-picker {
          margin-top: 10px;
          width: 100%;
          flex: 0 0 auto;
          display: flex;
          justify-content: space-around;
          .color-item {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.2s;
            &:hover,
            &.active {
              transform: scale(1.4);
            }
          }
        }
      }
    }
  }
}

.edit-group-dialog {
  .dialog-body {
    padding: 0 20px;
    @media screen and (max-width: 500px) {
      padding: 0;
    }
    .group-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      :last-child {
        margin-bottom: 0;
      }
      input {
        flex: 1;
        height: 42px;
        border: none;
        box-sizing: border-box;
        border-radius: 8px;
        color: #ffffff;
        padding-left: 10px;
        background-color: #252c3d;
        font-size: 16px;
        @media screen and (max-width: 500px) {
          height: 38px;
          font-size: 12px;
        }
      }
      .color-picker {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 76px;
        height: 42px;
        background-color: #252c3d;
        border-radius: 8px;
        margin-left: 6px;
        color: #ffffff;
        font-size: 16px;
        cursor: pointer;
        @media screen and (max-width: 500px) {
          height: 38px;
          font-size: 14px;
        }
        &:hover {
          color: #62ffff;
        }
        i {
          margin-left: 8px;
        }
        .color-item {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
    }
  }
}

.recommend {
  float: left;
  width: 100%;
  &-body {
    display: flex;
    flex-direction: column;
    height: auto;
    background: #151923;
    box-shadow: 0px 0px 4px rgb(0 0 0 / 25%);
    border-radius: 6px;
    padding: 20px 0px;
    margin-bottom: 26px;
    .controller {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      box-sizing: border-box;
      @media screen and (max-width: 960px) {
        flex-direction: column;
      }
      @media screen and (max-width: 500px) {
        padding: 0 4px;
      }
      &-store {
        display: flex;
        align-items: center;
        @media screen and (max-width: 960px) {
          width: 100%;
          margin-bottom: 20px;
        }
        .label {
          font-family: 'Avenir';
          color: #62ffff;
          font-size: 14px;
        }
        select {
          height: 30px;
          width: 176px;
          font-size: 13px;
          color: #c4c4c4;
          border: none;
          background: #252c3d;
          box-sizing: border-box;
          border-radius: 5px;
          padding-left: 10px;
        }
      }
      &-btns {
        display: flex;
        @media screen and (max-width: 960px) {
          width: 100%;
        }
        .btn {
          padding: 0px 26px;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          @media screen and (max-width: 960px) {
            flex: 1;
          }
          @media screen and (max-width: 500px) {
            padding: 0px;
            font-size: 12px;
          }
        }
      }
    }
    .controller-m {
      padding: 0px;
      overflow: hidden;
      opacity: 0;
      height: 0px;
      transition: all 0.4s;
      &.show {
        opacity: 1;
        height: 86px;
        padding: 20px;
        @media screen and (max-width: 500px) {
          opacity: 1;
          padding: 8px;
          height: 140px;
        }
      }
      .m-item {
        display: flex;
        align-items: center;
        margin-top: 20px;
        @media screen and (max-width: 500px) {
          flex-direction: column;
        }
        .item-title {
          font-family: 'Avenir';
          font-size: 14px;
          line-height: 20px;
          color: #62ffff;
          @media screen and (max-width: 500px) {
            width: 100%;
            margin-bottom: 8px;
          }
        }
        .item-body {
          margin-left: 12px;
          @media screen and (max-width: 500px) {
            margin-left: 0px;
            width: 100%;
          }
        }
      }
    }
    .list {
      &-table {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 10px;
        @media screen and (max-width: 500px) {
          font-size: 14px;
        }
        tr {
          height: 50px;
          th {
            text-align: start;
            &:first-child {
              width: 36px;
              text-align: center;
            }
          }
        }
        tbody {
          tr {
            min-height: 50px;
            background-color: #252c3d66;
            td {
              padding: 0;
              margin: 0;
              text-align: start;
              background-color: #252c3d66;
              &:first-child {
                width: 36px;
                text-align: center;
              }
              .coin {
                width: 25px;
                margin-right: 6px;
              }
              .connect-icon {
                width: 20px;
                cursor: pointer;
                &:first-child {
                  margin-right: 6px;
                }
              }
              .group {
                text-align: center;
                color: #151923;
                border-radius: 12px;
                padding: 0px 8px;
                margin: 0 12px;
              }
            }
            &.detail {
              background-color: #05060866;
              td {
                background-color: #05060866;
                .detail-content {
                  display: flex;
                  padding: 20px;
                  @media screen and (max-width: 1370px) {
                    flex-direction: column;
                  }
                  .coin-info {
                    font-family: 'Avenir';
                    display: inline-flex;
                    align-items: center;
                    font-size: 14px;
                    line-height: 14px;
                    margin: 0 13px;
                    .coin {
                      width: 20px;
                    }
                  }
                  .content-item {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 20px;
                    @media screen and (max-width: 500px) {
                      font-size: 12px;
                    }
                    &:last-child {
                      margin-bottom: 0;
                    }
                    .item-title {
                      width: 100px;
                      text-align: start;
                    }
                    .item-body {
                      flex: 1;
                      display: flex;
                      justify-content: flex-start;
                      flex-wrap: wrap;
                      .detail-coin-info {
                        font-family: 'Avenir';
                        display: inline-flex;
                        align-items: center;
                        font-size: 14px;
                        line-height: 14px;
                        margin-right: 12px;
                        margin-bottom: 12px;
                        @media screen and (max-width: 500px) {
                          font-size: 12px;
                        }
                        .coin {
                          width: 20px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .color-dot {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-right: 4px;
    transform: translateY(2px);
  }
}
</style>
