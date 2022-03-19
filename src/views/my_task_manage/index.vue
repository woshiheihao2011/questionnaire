<style lang="less"></style>
<template>
  <div>我的任务</div>
</template>
<script>
  export default {
    created () {
      this.$emit('updateActive', '8')
    },
    data () {
      return {

      }
    }
  }
</script>
