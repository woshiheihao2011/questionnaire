<style lang="less">

</style>
<template>
  <Modal v-model="show" :title="title" @on-cancel="cancel">
    <Form :model="formData" ref="formData" :label-width="120" :rules="formRule">
      <FormItem label="父机构:" prop="pId" v-if="pName">
        {{pName}}
      </FormItem>
      <FormItem label="名称:" prop="name">
        <Input v-model="formData.name" placeholder="请输入组织机构名称"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button type="primary" @click="handleSubmit" :loading="btnLoading">确定</Button>
    </div>
  </Modal>
</template>
<script>
  import OrgHttp from 'server/http/organization'
  export default {
    data () {
      return {
        show: false,
        title: '新增组织机构',
        pName: '',
        formData: {
          id: '',
          name: '',
          pId: ''
        },
        formRule: {
          name: [{required: true, message: '请输入', trigger: 'blur'}]
        },
        btnLoading: false
      }
    },
    methods: {
      open (pId, pName, id) {
        this.show = true
        this.formData.pId = pId
        this.pName = pName
        if (id) {
          this.title = '修改组织机构'
          OrgHttp.getDetail(id)
            .then(data => {
              this.formData = data
            })
            .catch(error => {
              console.warn('OrgHttp.getDetail:', error)
            })
        } else {
          this.formData = this._.cloneDeep(this.formData) // todo 正式场景时需注释掉
          this.formData.id = ''
        }
      },
      handleSubmit () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            OrgHttp.save(this.formData)
              .then(data => {
                this.$Message.success('保存成功')
                this.$emit('success')
                this.cancel()
              })
              .catch(error => {
                this.$Message.warning('保存失败')
                console.warn('OrgHttp.save error:', error)
              })
          }
        })
      },
      cancel () {
        this.show = false
        this.formData.id = ''
        this.$refs['formData'].resetFields()
      }
    }
  }
</script>
