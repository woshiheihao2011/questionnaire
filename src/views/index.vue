<style lang="less">
  @import '../my-theme/index.less';
.index{
  background: @body-background;
  font-size: @font-size-base;
  .index-head{
    display: block;
    /*height: 50px;*/
    padding: 16px 32px;
    font-size: @font-size-large;
    .top-text{
      text-align: center;
      a{
        color: @title-color;
      }
      a.active, a:hover{
        color: @link-hover-color;
      }
    }
  }
  .ivu-affix{
    background: @body-background;
  }
  .index-body{
    text-align: center;
    height: 1000px;
  }
}
</style>
<template>
<div class="index p-lr-32">
  <!--顶部条-->
  <div>
    <Affix :offset-top="0">
      <div class="index-head flex">
        <div>
          <img src="static/images/logo.png"/>
        </div>
        <div class="flex-1 top-text">
          <a class="m-l-32" href="http://www.baidu.com" target="_blank"><span>首页</span></a>
          <a class="m-l-32" :class="{active: active.help}" @click="handleClick(1)">帮助中心</a>
          <a class="m-l-32" :class="{active: active.about}" @click="handleClick(2)">关于我们</a>
        </div>
        <div class="top-text">
          <a class="m-r-32" :class="{active: active.login}" @click="handleClick(3)">登录</a>
          <a class="m-r-32" :class="{active: active.register}" @click="handleClick(4)">注册</a>
        </div>
      </div>
    </Affix>
  </div>
  <!--中间主体部分，包括左侧菜单和右侧界面-->
  <div class="index-body text-center">
    <Login v-if="active.login"></Login>
    <Register v-if="active.register" @login="handleRegisterLogin"></Register>
    <Help v-if="active.help"></Help>
    <About v-if="active.about"></About>
  </div>
  <div>
    xxxx.xxxxx.com © 2022-20222 XXXXX版权所有 <a target="new" href="www.baidu.com">京ICP备XXXXXXXXX号-6</a>
  </div>
</div>
</template>
<script>
  import Login from './login/login.vue'
  import Register from './login/register.vue'
  import Help from './login/help.vue'
  import About from './login/about_us.vue'
  export default {
    components: {
      Login, Help, About, Register
    },
    data () {
      return {
        active: {
          home: false,
          help: false,
          about: false,
          login: true,
          register: false
        }
      }
    },
    methods: {
      handleClick (flag) {
        this.resetActive()
        if (flag === 1) {
          // 帮助中心
          this.active.help = true
        } else if (flag === 2) {
          this.active.about = true
        } else if (flag === 3) {
          this.active.login = true
        } else if (flag === 4) {
          this.active.register = true
        }
      },
      handleRegisterLogin () {
        this.resetActive()
        this.active.login = true
      },
      resetActive () {
        for (var key in this.active) {
          this.active[key] = false
        }
      }
    }
  }
</script>
