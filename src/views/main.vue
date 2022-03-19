<style lang="less">
  @import '../my-theme/index.less';
.main{
  /*color: white;*/
  background: @layout-body-background;
  font-size: @font-size-base;
  .main-head{
    width: 100%;
    display: block;
    height: 64px;
    padding: 0 50px;
    background: #3f3f3f;
    font-size: @font-size-large;
    color: #ffffff;
    .top-text{
      text-align: right;
      padding: 19px;
      a{
        color: #ffffff;
      }
      a.active, a:hover{
        color: @link-hover-color;
      }
    }
  }
  .head{
    display: flex;
    justify-content:space-between;
    font-size: @font-size-large;
    color: #ffffff;
    .logo{
      display: flex;
      align-items: center;
    }
    .head-right-text{
      a{
        color: #ffffff;
      }
      a.active, a:hover{
        color: @link-hover-color;
      }
      .ivu-dropdown{
        line-height: 0px; // 解决line-height导致的下拉退出跑到header下面的问题
      }
    }
  }
  .ivu-affix{
    background: @body-background;
  }
  .main-body{
    .ivu-menu-light{
      background-color: inherit;
    }
    .panel{
      margin-left: 6px;
      height: 100%;
      overflow: auto;
    }
    .menu{
      height: 100%;
      overflow: auto;
      a{
        color: inherit; // 屏蔽route的a标签颜色
      }
    }
  }
  .ivu-affix{
    z-index: 901; // 此处默认值是10，因menu的z-index的值为900
  }
  .main-foot{
    text-align: center;
    margin: 16px 50px 0 50px;
    color: #9ea7b4;
    background-color: inherit;
  }
}
</style>
<template>
  <div class="main">
    <!--<Affix :offset-top="0" style="z-index: 910">

    </Affix>-->
    <div class="main-head flex">
      <div class="flex flex-v-center">
        <img src="static/images/logo.png"/><span class="m-l-8">XXX调研系统</span>
      </div>
      <div class="flex-1 top-text">
        <Icon type="md-help-circle" class="m-r-8"/>
        <a class="m-r-8">帮助</a>
        <Icon type="md-contact" class="m-r-8"/>
        <Dropdown style="text-align: center" @on-click="handleLoginOut">
          <a>管理员
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="logout">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="main-body" :style="{height: bodyHeight+'px'}">
      <Split v-model="panelPer" min="200px">
        <div slot="left" class="menu p-tb-16">
          <Menu ref="menu" theme="light" width="auto" :active-name="activeMenu" :open-names="menuOpened" @on-select="handleMenuClick">
            <template v-for="(menu,key) in menuData">
              <customMenu :menu="menu" :key="key"></customMenu>
            </template>
          </Menu>
        </div>
        <div slot="right" class="panel p-16">
          <router-view @updateActive="updateActive"></router-view>
          <!--<keep-alive>-->
            <!--<router-view  v-if="$route.meta.keepAlive"></router-view>&lt;!&ndash;@updateActive="updateActive" :showBread="showBread" :maxWidth="maxWidth"&ndash;&gt;-->
          <!--</keep-alive>-->
          <!--<router-view  v-if="!$route.meta.keepAlive"></router-view>-->
        </div>
      </Split>
    </div>
    <div class="main-foot">
      xxxx.xxxxx.com © 2022-20222 XXXXX版权所有 <a target="new" href="www.baidu.com">京ICP备XXXXXXXXX号-6</a>
    </div>
    <Layout v-show="false">
      <Header>
        这是头部
      </Header>
      <Layout>
        <Sider hide-trigger>
          <div style="height:500px">
            这是菜单
          </div>
        </Sider>
        <Content>
          <div style="background-color: red;height: 800px"></div>
        </Content>
      </Layout>
      <Footer class="text-center">
        xxxx.xxxxx.com © 2022-20222 XXXXX版权所有 <a target="new" href="www.baidu.com">京ICP备XXXXXXXXX号-6</a>
      </Footer>
    </Layout>
    <div v-show="false" style="color:black;display:flex;flex-direction:column;">
      <div style="height: 64px;line-height: 64px;background: wheat">
        这是head
      </div>
      <div class="flex-1 flex">
        <div class="flex-1" style="background: greenyellow;height: 100%;">
          <div style="height: 600px;">
            这是菜单
          </div>
        </div>
        <div class="flex-3" style="background: rosybrown;height: 100%;">
          <div style="height: 800px;">
            这是主面板
          </div>
        </div>
      </div>
      <div style="height: 64px;line-height: 64px;background: wheat">
        这是foot
      </div>
    </div>
  </div>
</template>
<script>
  import demoData from '../data/demo_data.js'
  import customMenu from './components/custom_menu.vue'
  export default {
    components: {
      customMenu
    },
    data () {
      return {
        bodyHeight: 0,
        panelPer: 0.2,
        active: {},
        menuData: demoData.menuData,
        activeMenu: '1',
        menuOpened: []
      }
    },
    mounted () {
      this.bodyHeight = (document.documentElement.clientHeight || document.body.clientHeight) - 64 - 37
    },
    methods: {
      handleMenuClick (menu) {
        this.activeMenu = menu
      },
      handleLoginOut (dropdownItem) {
        if (dropdownItem === 'logout') {
          this.$store.commit('setToken', '')
          this.$store.commit('setUser', null)
          this.$router.push('/')
        }
      },
      updateActive (menuName) {
        this.activeMenu = menuName
        if (menuName.indexOf('-') !== -1) {
          this.menuOpened.push(menuName.split('-')[0])
//          this.$refs.menu.updateOpened() // 展开当前menu
        }
//        this.$refs['menu'].updateActiveName()
      }
    }
  }
</script>
