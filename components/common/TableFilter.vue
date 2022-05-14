<template>
  <el-dropdown trigger="click" @command="filterHandler">
    <span style="cursor: pointer; color: #ffffff; font-size: 15px;">
      {{ title }}
      <img
        v-if="activeKey === -1"
        src="@/assets/img/filter/filter.png"
        alt="filter-grid-solid"
        style="width: 14px;transform: translateY(1px);"
      />
      <img v-else src="@/assets/img/filter/filter-active.png" alt="filter-grid-solid" style="width: 14px;transform: translateY(1px);" />
    </span>
    <el-dropdown-menu class="fdb-menu" slot="dropdown">
      <el-dropdown-item :class="{ active: activeKey === -1 }" :command="-1">{{ $t('all') }}</el-dropdown-item>
      <el-dropdown-item v-for="(item, index) in items" :key="index" :class="{ active: activeKey === item.key }" :command="item.key">
        <span v-if="item.color !== undefined" :class="`color-dot group-color-${item.color}`"></span>
        {{ item.name }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'TableFilter',
  model: {
    prop: 'activeKey',
    event: 'setKey'
  },
  props: {
    title: String,
    items: {
      type: Array,
      default: () => []
    },
    activeKey: {
      type: [String, Number]
    }
  },
  methods: {
    filterHandler(command) {
      this.$emit('setKey', command)
    }
  }
}
</script>

<style lang="scss" scoped>
.color-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 4px;
  transform: translateY(2px);
}
</style>
