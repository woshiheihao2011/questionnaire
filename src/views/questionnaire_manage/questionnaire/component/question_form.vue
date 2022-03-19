<style lang="less">
</style>
<template>
  <Modal v-model="show" :title="title" @on-cancel="cancel">
    <Form :model="formData" ref="formData" :label-width="100" :rules="formRule">
      <FormItem label="问卷标题:" prop="name">
        <Input v-model="formData.name" placeholder="请输入问卷标题" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="所属项目:" prop="projectId">
        <Cascader :data="projectList" v-model="selProject" @on-change="handleProjectChange" :disabled="disabled"></Cascader>
      </FormItem>
      <FormItem label="样本数量:" prop="price">
        <Input v-model="formData.price" placeholder="请输入样本数量" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="问卷单价:" prop="sampleSize">
        <Input v-model="formData.sampleSize" placeholder="请输入问卷单价" :disabled="disabled"></Input>
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
  import QuestionHttp from 'server/http/questionnaire'
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
        title: '新增项目',
        disabled: false,
        formData: {
          id: '',
          name: '',
          projectId: '',
//          stateId: '发布中',
//          creater: '管理员',
//          createTime: '2019-01-13',
          price: '1',
          sampleSize: '1' // 样本数
//          answerNum: '10', // 答卷数
//          sendOrReceive: '13', // 已发送/已接受
//          finishRate: '90%' // 完成比例
        },
        selProject: [],
        formRule: {
          name: [
            {required: true, message: '请输入问卷标题', trigger: 'blur'}
          ]
        },
        btnLoading: false,
        projectList: []
      }
    },
    methods: {
      open (id = '', editable = true) {
        this.show = true
        this.disabled = !editable
        if (id) {
          this.title = '修改问卷'
          QuestionHttp.getDetail(id)
            .then(data => {
              this.formData = data
              this.selProject = data.projectId.split('/')
              console.log('this.selProject:', this.selProject)
            })
            .catch(error => {
              console.warn('获取问卷详情失败：', error)
            })
        } else {
          this.title = '新增问卷'
          this.formData = this._.cloneDeep(this.formData) // todo 正式场景时需注释掉
          this.formData.id = ''
        }
        if (!this.projectList.length) {
          console.log()
          QuestionHttp.getProjectList()
            .then(data => {
              console.log('data:', data)
              this.projectList = data
            })
            .catch(error => {
              console.log('问卷中获取项目列表失败:', error)
            })
        }
      },
      handleSubmit () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            QuestionHttp.save(this._.cloneDeep(this.formData))
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
      handleProjectChange (value, selectedData) {
        if (value && value.length === 2) {
          this.formData.projectId = value.join('/')
        } else {
          this.formData.projectId = ''
        }
      },
      cancel () {
        this.show = false
        this.$refs['formData'].resetFields()
      }
    }
  }
</script>
