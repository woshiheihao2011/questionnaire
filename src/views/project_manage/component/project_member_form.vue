<style lang="less"></style>
<template>
  <Modal v-model="show" :title="title + '项目人员'" @on-cancel="cancel">
    <Form :model="formData" ref="formData" :label-width="100" :rules="formRule">
      <FormItem label="项目名称:">
        {{projectName}}
      </FormItem>
      <FormItem label="项目经理:" prop="manager">
        <Select v-model="formData.manager">
          <Option v-for="item in staffList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="培训专员:" prop="trainer">
        <Select v-model="formData.trainer" multiple>
          <Option v-for="item in staffList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="小组长:" prop="groupLeader">
        <Select v-model="formData.groupLeader" multiple>
          <Option v-for="item in staffList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <div>
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
      staffList: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        show: false,
        title: '添加',
        projectId: '',
        projectName: '',
        btnLoading: false,
        formData: {
          manager: '',
          trainer: '',
          groupLeader: ''
        },
        formRule: {
          manager: [
            {required: true, message: '请选择项目经理', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      open (projectObj) {
        this.show = true
        this.projectId = projectObj.id
        this.projectName = projectObj.name
        this.formData.manager = projectObj.manager
        this.formData.trainer = projectObj.trainer
        this.formData.groupLeader = projectObj.groupLeader
        if (this.projectId && this.formData.manager) {
          this.title = '修改'
        } else {
          this.title = '添加'
        }
      },
      handleSubmit () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            ProjectHttp.saveProjectMember(this.projectId, this._.cloneDeep(this.formData))
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
        this.projectId = ''
        this.projectName = ''
        this.$refs['formData'].resetFields()
      }
    }
  }
</script>
