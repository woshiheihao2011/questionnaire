<style lang="less">
</style>
<template>
  <div>
    <Tabs type="card">
      <TabPane name="parttimeManage" label="兼职团队管理">
        <Manage></Manage>
      </TabPane>
      <TabPane name="parttimeAnalysis" label="兼职团队分析">
        <Analysis></Analysis>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import Manage from './component/manage.vue'
  import Analysis from './component/analysis.vue'
  export default {
    components: {
      Manage, Analysis
    },
    data () {
      return {
      }
    },
    created () {
      this.$emit('updateActive', '7')
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
