<style lang="less">

</style>
<template>
  <div>
    <template v-if="menu.children && menu.children.length">
      <Submenu :name="menu.name" >
        <template slot="title">
          <Icon type="md-menu" />{{menu.title}}
        </template>
        <customMenu v-for="(item, key) in menu.children" :menu="item" :key="key"></customMenu>
      </Submenu>
    </template>
    <template v-else>
      <router-link :to="menu.route_link">
      <MenuItem :name="menu.name">
        <Icon type="md-document" />{{menu.title}}
      </MenuItem>
      </router-link>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'customMenu',
    props: ['menu']
  }
</script>
