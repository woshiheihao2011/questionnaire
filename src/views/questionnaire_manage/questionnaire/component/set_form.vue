<style lang="less">
</style>
<template>
  <Modal v-model="show" title="设置" @on-cancel="cancel">
    <Form :model="formData" ref="formData" :label-width="250">
      <FormItem label="问卷发送后多长时间未接受剔除该人员:" prop="removeTime">
        <InputNumber :max="max" :min="1" v-model="formData.removeTime"></InputNumber>分钟
      </FormItem>
      <FormItem label="问卷发送后多长时间未接受催促该人员:" prop="urgeTime">
        <InputNumber :max="max" :min="1" v-model="formData.urgeTime"></InputNumber>分钟
      </FormItem>
      <FormItem label="是否自动筛选人员发送问卷:" prop="isAutofilter">
        <RadioGroup v-model="formData.isAutofilter">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="答卷时是否开启录屏功能:" prop="isScreencap">
        <RadioGroup v-model="formData.isScreencap">
          <Radio label="1">是</Radio>
          <Radio label="0">否</Radio>
        </RadioGroup>
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
  import SetHttp from 'server/http/set'
  export default {
    data () {
      return {
        show: false,
        max: 2147483647,
        btnLoading: false,
        formData: {
          removeTime: 120,
          urgeTime: 60,
          isAutofilter: '1',
          isScreencap: '1'
        }
      }
    },
    methods: {
      open () {
        this.show = true
        SetHttp.get()
          .then(data => {
            this.formData = data
          })
          .catch(error => {
            console.warn('获取设置数据失败。。。', error)
          })
      },
      handleSubmit () {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            SetHttp.save(this._.cloneDeep(this.formData))
              .then(data => {
                this.$Message.success('保存成功!')
                this.btnLoading = false
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
    }
  }
</script>
