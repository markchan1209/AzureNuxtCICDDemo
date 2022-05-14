<template>
  <el-pagination
    :current-page.sync="pager.pageIndex"
    :page-size.sync="pager.pageSize"
    :total="pager.totalCount"
    class="fdb-pager"
    v-bind="customAttr"
    @current-change="pagerEvent($event, 'pageChange')"
  />
</template>

<script>
export default {
  name: 'Pager',
  props: {
    pager: {
      type: Object,
      required: true,
      default: function() {
        console.error(`Please set pagination "props: pager" in route.name: ${this.$parent.$route.name}`)
        return {
          pageIndex: 1,
          pageSize: 25,
          totalCount: 0
        }
      }
    },
    getData: {
      type: Function,
      required: true,
      default: function() {
        console.error(`Please set pagination "props: getData" in route.name: ${this.$parent.$route.name}`)
      }
    }
  },
  computed: {
    customAttr() {
      return {
        small: false,
        layout: 'prev, pager, next',
        pagerCount: 5,
        ...this.$attrs
      }
    }
  },
  methods: {
    pagerEvent(e, type) {
      if (type === 'pageChange') {
        this.pager.pageIndex = e
      }
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.fdb-pager {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;

  ::v-deep {
    .btn-prev {
      background-color: unset;
      color: #c0c4cc;
      line-height: 32px;
      height: 32px;
    }
    .el-pager {
      li {
        font-family: 'Noto Sans CJK TC';
        background-color: unset;
        color: #c0c4cc;
        border-radius: 5px;
        line-height: 30px;
        height: 32px;
        margin: 0 4px;
        min-width: 32px;
        &:hover {
          border: 1px solid #62ffff;
          box-sizing: border-box;
        }
        &.active {
          cursor: default;
          border: 1px solid #62ffff;
          box-sizing: border-box;
        }
      }
    }
    .btn-next {
      background-color: unset;
      color: #c0c4cc;
      line-height: 32px;
      height: 32px;
    }
  }
}
</style>
