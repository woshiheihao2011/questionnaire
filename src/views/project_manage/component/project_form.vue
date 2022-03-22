<style lang="less">

</style>
<template>
  <Modal v-model="show" :title="title" @on-cancel="cancel">
    <Form :model="formData" ref="formData" :label-width="100" :rules="formRule">
      <FormItem label="模板名称:" prop="name">
        <Input v-model="formData.name" placeholder="请输入项目名称" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="模板上传:" prop="contacts">
        <Input v-model="formData.templateurl" placeholder="模板上传" :disabled="disabled"></Input>
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
  import ProjectHttp from 'server/http/project'
  export default {
    props: {
      customerData: {
        type: Array,
        default: () => []
      },
      typeData: {
        type: Array,
        default: () => []
      },
      managerData: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        show: false,
        title: '新增模板',
        disabled: false,
        formData: {
          name: '',
          templateurl: ''
        },
        formRule: {
          name: [
            {required: true, message: '请输入模板名称', trigger: 'blur'}
          ]
        },
        btnLoading: false,
        typeList: []
      }
    },
    methods: {
      open (id = '', editable = true) {
        this.show = true
        this.disabled = !editable
        if (id) {
          this.title = '修改模板'
          ProjectHttp.getDetail(id)
            .then(data => {
              this.formData = data
            })
            .catch(error => {
              console.warn('获取客户详情失败：', error)
            })
        } else {
          this.title = '新增模板'
          this.formData = this._.cloneDeep(this.formData) // todo 正式场景时需注释掉
          this.formData.id = ''
        }
        this.typeList = this._.cloneDeep(this.typeData)
        if (this.formData.id && this.formData.manager) {
          this.memberFlag = true
        } else {
          return false // 新增时默认待添加
        }
      },
      handleSubmit () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            ProjectHttp.save(this._.cloneDeep(this.formData))
              .then(data => {
                this.$Message.success('保存成功!')
                this.btnLoading = false
                this.$emit('success')
                this.cancel()
              })
              .catch(error => {
                this.btnLoading = false
                this.$Message.success('保存失败!')
                console.warn('保存项目失败：', error)
              })
          } else {
            console.warn('保存项目时校验失败！')
          }
        })
      },
      cancel () {
        this.show = false
      }
    },
    watch: {
      memberFlag: function (value) {
        if (!value) {

        }
      }
    }
  }
</script>
