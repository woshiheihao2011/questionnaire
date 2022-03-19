<style lang="less">
</style>
<template>
  <Modal v-model="show" :title="title" @on-cancel="cancel">
  <Form :model="formData" ref="formData" :label-width="120" :rules="formRule">
  <FormItem label="公司名称:" prop="name">
  <Input v-model="formData.name" placeholder="请输入客户公司名称"></Input>
  </FormItem>
  <FormItem label="客户部门:" prop="department">
  <Input v-model="formData.department" placeholder="请输入客户部门"></Input>
  </FormItem>
  <FormItem label="联系人:" prop="contacts">
  <Input v-model="formData.contacts" placeholder="请输入联系人姓名"></Input>
  </FormItem>
  <FormItem label="联系人电话:" prop="phone">
  <Input v-model="formData.phone" placeholder="请输入联系人电话"></Input>
  </FormItem>
  <FormItem label="登录密码:" prop="pwd">
  <Input v-model="formData.pwd" placeholder="请输入登录密码"></Input>
  </FormItem>
  </Form>
  <div slot="footer">
    <div v-if="editable">
      <Button @click="cancel">取消</Button>
      <Button type="primary" @click="handleSubmit" :loading="btnLoading">确定</Button>
    </div>
  </div>
  </Modal>
</template>
<script>
  import CustomerHttp from 'server/http/customer'
  import Pattern from '@/util/pattern.js'
  export default {
    data () {
      return {
        title: '客户',
        show: false,
        formData: {
          id: 0,
          name: '',
          department: '',
          contacts: '',
          phone: '',
          pwd: ''
        },
        btnLoading: false,
        editable: true,
        formRule: {
          name: [{required: true, message: '请输入', trigger: 'blur'}],
          contacts: [{required: true, message: '请输入', trigger: 'blur'}],
          phone: [
            {required: true, message: '请输入', trigger: 'blur'},
            {type: 'string', message: '手机号不合法', pattern: Pattern.phone, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      open (id, editable) {
        this.show = true
        this.editable = editable
        if (id) {
          this.title = '修改客户'
          CustomerHttp.getDetail(id)
            .then(data => {
              this.formData = this._.cloneDeep(data)
            })
            .catch(error => {
              console.warn('获取客户详情失败：', error)
            })
        } else {
          this.title = '新增客户'
          this.formData = this._.cloneDeep(this.formData) // todo 正式场景时需注释掉
          this.formData.id = ''
        }
      },
      handleSubmit () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            CustomerHttp.save(this._.cloneDeep(this.formData))
              .then(data => {
                this.$Message.success('保存成功!')
                this.btnLoading = false
                this.$emit('success')
                this.cancel()
              })
              .catch(error => {
                this.btnLoading = false
                this.$Message.success('保存失败!')
                console.warn('保存客户失败：', error)
              })
          } else {
            console.warn('保存客户时校验失败！')
          }
        })
      },
      cancel () {
        this.show = false
        this.$refs['formData'].resetFields()
      }
    }
  }
</script>
