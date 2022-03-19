<style lang="less">
  .register{
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
  <div class="register flex flex-v-top">
    <ImgDemo class="flex-1 text-right"></ImgDemo>
    <div class="flex-1 text-left" >
      <div class="form-area">
        <div class="text-center">
          <span class=" f-s-16">调研系统</span>
        </div>
        <div class="form">
          <div class="m-tb-16 f-s-14"><span >会员注册</span><span style="float:right">已有账号？<a @click="login">立即登录</a></span></div>
          <Form ref="form" :model="formData" :rules="formRule" >
            <FormItem prop="phone">
              <Input type="text" v-model="formData.phone" placeholder="请输入手机号">
              </Input>
            </FormItem>
            <FormItem prop="pwd">
              <Input type="password" v-model="formData.pwd" placeholder="请设置密码">
              </Input>
            </FormItem>
            <FormItem prop="pwd1">
              <Input type="password" v-model="formData.pwd1" placeholder="请再次输入密码">
              </Input>
            </FormItem>
            <FormItem prop="email">
              <Input v-model="formData.email" placeholder="请输入邮箱">
              </Input>
            </FormItem>
            <FormItem prop="msg">
              <div class="flex">
                <Input v-model="formData.msg" placeholder="请输入短信验证码">
                </Input>
                <div class="flex-1 m-l-4">
                  <Button @click="handleMsg" ref="btnMsg" :disabled="btnMsgDisabled">{{btnMsgText}}</Button>
                </div>
              </div>
            </FormItem>
          </Form>
          <div class="text-center">
            <Button type="primary" @click="handleSubmit('form')" style="width: 200px">立即注册</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ImgDemo from './components/imgDemo.vue'
  import Pattern from '@/util/pattern.js'
  export default {
    components: {
      ImgDemo
    },
    data () {
      const pwdValid = (rule, value, callback) => {
        if (this.formData.pwd.trim() === '' || this.formData.pwd1.trim() === '' || this.formData.pwd == this.formData.pwd1) {
          callback()
        } else {
          callback(new Error('密码不一致'))
        }
      }
      return {
        formData: {
          phone: '',
          pwd: '',
          pwd1: '',
          email: '',
          msg: ''
        },
        formRule: {
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {type: 'string', message: '手机号不合法', pattern: Pattern.phone, trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: pwdValid, trigger: 'blur'}
          ],
          pwd1: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: pwdValid, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'string', message: '邮箱格式不合法', pattern: Pattern.email, trigger: 'blur'}
          ],
          msg: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        btnMsgText: '获取短信验证码',
        timer: null,
        second: 60,
        btnMsgDisabled: false
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('注册成功!')
          } else {
          }
        })
      },
      login () {
        this.$emit('login')
      },
      handleMsg () {
        this.btnMsgDisabled = true
        this.second = 60
        this.timer = setInterval(() => {
          this.btnMsgText = (--this.second + '秒')
          if (this.second === 0) {
            this.btnMsgText = '获取短信验证码'
            this.btnMsgDisabled = false
            clearInterval(this.timer)
          }
        }, 1000)
      }
    }
  }
</script>
