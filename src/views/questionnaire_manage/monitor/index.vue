<style lang="less">
.monitor{
  .monitor-sub-border{
    border: 1px solid #ebebeb;
    padding: 16px;
  }
}
</style>
<template>
  <div class="monitor flex">
    <div class="flex-1 monitor-sub-border">
      此处是统计数据
    </div>
    <div class="flex-3 monitor-sub-border">
      此处是地图
    </div>
    <div class="flex-1 monitor-sub-border">
      此处是选中地图点之后的人员列表
    </div>
  </div>
</template>
<script>
  export default {
    created () {
      this.$emit('updateActive', '6-3')
    },
    data () {
      return {

      }
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
