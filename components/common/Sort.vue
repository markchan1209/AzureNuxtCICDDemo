<template>
  <span style="cursor: pointer;">
    {{ title }}
    <img
      v-if="sort === sortKey && order === 'asc'"
      src="@/assets/img/sort/asc.png"
      alt="sort-arrows"
      style="width: 10px;transform: translateY(1px);"
    />
    <img
      v-else-if="sort === sortKey && order === 'desc'"
      src="@/assets/img/sort/desc.png"
      alt="sort-arrows"
      style="width: 10px;transform: translateY(1px);"
    />
    <img v-else src="@/assets/img/sort/sort-arrows.png" alt="sort-arrows" style="width: 10px;transform: translateY(1px);" />
  </span>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    title: String,
    sort: {
      type: String,
      default: ''
    },
    sortKey: {
      type: String,
      default: ''
    },
    order: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
