<style lang="less">

</style>
<template>
  <transition name="fade">
    <div class="container-bread">
      <!--<Breadcrumb class="f-s-14" v-show="showBread">-->
        <!--<BreadcrumbItem v-for="(item, index) in breadcrumb" :key="index" :to="item.path">{{ $t(item.title) || item.title }}</BreadcrumbItem>-->
      <!--</Breadcrumb>-->
    </div>
    <slot name="areaHead"></slot>
  </transition>
</template>
<script>
export default {

}
</script>
