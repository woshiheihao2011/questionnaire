<style lang="less">

</style>
<template>
  <Modal v-model="show" :title="title" @on-cancel="cancel">
    <Form :model="formData" ref="formData" :label-width="100" :rules="formRule">
      <FormItem label="兼职人员姓名:" prop="name">
        <Input v-model="formData.name" placeholder="请输入人员姓名" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="联系电话:" prop="phone">
        <Input v-model="formData.phone" placeholder="请输入联系电话" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="性别:" prop="sex">
        <RadioGroup v-model="formData.sex" :disabled="disabled">
          <Radio label="未知" :disabled="disabled">
            <span>未知</span>
          </Radio>
          <Radio label="男" :disabled="disabled">
            <span>男</span>
          </Radio>
          <Radio label="女" :disabled="disabled">
            <span>女</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="身份证号:" prop="idNumber">
        <Input v-model="formData.idNumber" placeholder="请输入身份证号" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="职业:" prop="name">
        <Input v-model="formData.name" placeholder="请输入职业" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="所在城市:" prop="name">
        <Cascader :data="cityList" v-model="selCity" placeholder="请选择城市" @on-change="handleCityChange"></Cascader>
      </FormItem>
      <FormItem label="兼职人员姓名:" prop="name">
        <Input v-model="formData.name" placeholder="请输入人员姓名" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="手机品牌:" prop="name">
        <Input v-model="formData.name" placeholder="请输入手机品牌" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="手机型号:" prop="name">
        <Input v-model="formData.name" placeholder="请输入手机型号" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="月收入范围:" prop="name">
        <Input v-model="formData.name" placeholder="请输入月收入范围" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="银行卡所属银行:" prop="name">
        <Select v-model="formData.typeId" filterable>
          <Option v-for="item in bankList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="银行卡号:" prop="weChat">
        <Input v-model="formData.bankNum" placeholder="请输入银行卡号" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="微信号码:" prop="weChat">
        <Input v-model="formData.weChat" placeholder="请输入微信号码" :disabled="disabled"></Input>
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
  import demoData from '../../../data/demo_data'
  import StaffHttp from 'server/http/staff'
  import Pattern from '@/util/pattern.js'
  export default {
    data () {
      return {
        show: false,
        title: '员工',
        disabled: false,
        cityList: [],
        selCity: [],
        bankList: [],
        formData: {
          id: '',
          name: '',
          phone: '',
          sex: '女',
          idNumber: '',
          entryDate: '',
          city: '',
          roleId: '',
          weChat: ''
        },
        formRule: {
          name: [
            {required: true, message: '请输入人员姓名', trigger: 'blur'}
          ],
          phone: [
            {type: 'string', message: '手机号不合法', pattern: Pattern.phone, trigger: 'blur'}
          ]
        },
        demoData: demoData,
        btnLoading: false,
        staffRole: ['系统管理员']
      }
    },
    mounted () {
      // todo 获取城市列表数据源
      // bankList
    },
    methods: {
      open (id = '', editable = true) {
        this.show = true
        this.disabled = !editable
        if (id) {
          this.title = '修改人员信息'
          StaffHttp.getDetail(id)
            .then(data => {
              this.formData = this._.cloneDeep(data)
              this.staffRole = this.formData.roleId.split(',')
            })
            .catch(error => {
              console.warn('获取客户详情失败：', error)
            })
        } else {
          this.title = '新增人员信息'
          this.formData = this._.cloneDeep(this.formData) // todo 正式场景时需注释掉
          this.formData.id = ''
        }
      },
      handleSubmit () {
        if (this.staffRole.length) {
          this.formData.roleId = this.staffRole.join()
        }
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            StaffHttp.save(this._.cloneDeep(this.formData))
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
        this.staffRole = ['系统管理员']
      },
      handleEntryDate (formatDate, value2) {
        this.formData.entryDate = formatDate
      },
      handleCityChange (value, selectData) {
        this.formData.city = value.join()
      }
    }
  }
</script>
