<style lang="less">
</style>
<template>
  <Modal v-model="show" :title="title+'角色'" @on-cancel="cancel">
    <Form :model="formData" ref="formData" :label-width="100" :rules="formRule">
      <FormItem label="角色名称:" prop="name">
        <Input v-model="formData.name" placeholder="请输入角色名称" :disabled="disabled"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <div v-if="!disabled">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="handleSubmit" :loading="btnLoading">确定</Button>
      </div>
    </div>
  </Modal>
</template>
<script>
  import RoleHttp from 'server/http/role'
  export default {
    data () {
      return {
        show: false,
        title: '新增',
        disabled: false,
        formData: {
          id: '',
          name: ''
        },
        formRule: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ]
        },
        btnLoading: false
      }
    },
    methods: {
      open (id = '', editable = true) {
        this.show = true
        this.disabled = !editable
        if (id) {
          this.title = '修改'
          RoleHttp.getDetail(id)
            .then(data => {
              this.formData = data
            })
            .catch(error => {
              console.warn('获取角色详情失败：', error)
            })
        } else {
          this.title = '新增'
          this.formData = this._.cloneDeep(this.formData) // todo 正式场景时需注释掉
          this.formData.id = ''
        }
      },
      handleSubmit () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            RoleHttp.save(this._.cloneDeep(this.formData))
              .then(data => {
                this.$Message.success('保存成功!')
                this.btnLoading = false
                this.$emit('success')
                this.cancel()
              })
              .catch(error => {
                this.btnLoading = false
                this.$Message.success('保存失败!')
                console.warn('保存角色失败：', error)
              })
          } else {
            console.warn('保存角色时校验失败！')
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
