<style lang="less">
  .login{
    .form-area{
      width: 400px;
      .form{
        border: solid 1px #dcdee2;
        border-radius: 6px;
        margin: 32px;
        padding: 8px;
      }
    }
  }
</style>
<template>
  <div class="login flex flex-v-top">
    <ImgDemo class="flex-1 text-right"></ImgDemo>
    <div class="flex-1 text-left" >
      <div class="form-area">
        <div class="text-center">
          <span class=" f-s-16">调研系统</span>
        </div>
        <div class="form">
          <div class="m-tb-16 f-s-14"><span >会员登录</span></div>
          <Form ref="form" :model="formData" :rules="formRule" >
            <FormItem prop="telephone">
              <Input type="text" v-model="formData.telephone" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formData.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
          </Form>
          <div class="text-center m-b-8"><Button type="primary" @click="handleSubmit('form')" style="width: 200px">登录</Button></div>
         <!-- <div class="text-right"><img class="m-r-8" src="static/images/weixin.png"/><br><span>微信登录</span></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ImgDemo from './components/imgDemo.vue'
  import CommonHttp from '@/server/http/common.js'
  export default {
    components: {
      ImgDemo
    },
    data () {
      return {
        formData: {
          telephone: '12345678915',
          password: '1000000'
        },
        formRule: {
          telephone: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            CommonHttp.login(this.formData)
              .then(data => {
                // 需将token写入vuex
                // todo 用户信息保存，token保存，全局配置信息获取等
                this.$store.commit('setToken', data.token)
                this.$store.commit('setTelephone', data.telephone)
                this.$Message.success('登录成功!')
//                this.$router.push('/index')organization_manage
                this.$router.push('/organization')
              })
              .catch(error => {
                console.warn('登录失败：', error)
                this.$Message.warning('登录失败:', error)
                this.$router.push('/organization')
              })
          } else {
            this.$Message.success('登录失败!')
          }
        })
      }
    }
  }
</script>
