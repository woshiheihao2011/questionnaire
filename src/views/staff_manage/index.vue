<style lang="less">

</style>
<template>
  <div>
    <Tabs type="card">
      <TabPane name="staff" label="员工管理">
        <Staff></Staff>
      </TabPane>
      <TabPane name="staffAuth" label="员工权限">
        <StaffAuth></StaffAuth>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import Staff from './component/staff.vue'
  import StaffAuth from './component/staff_auth.vue'
  export default {
    components: {
      Staff, StaffAuth
    },
    data () {
      return {

      }
    },
    created () {
      this.$emit('updateActive', '2')
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
