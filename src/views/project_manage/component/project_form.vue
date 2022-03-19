<style lang="less">

</style>
<template>
  <Modal v-model="show" :title="title" @on-cancel="cancel">
    <Form :model="formData" ref="formData" :label-width="100" :rules="formRule">
      <FormItem label="项目名称:" prop="name">
        <Input v-model="formData.name" placeholder="请输入项目名称" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="客户名称:" prop="customerId">
        <Select v-model="formData.customerId" filterable>
          <Option v-for="item in customerList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
        <!--<AutoComplete v-model="formData.customerId" placeholder="请选择客户名称" icon="md-search" @on-change="handleCustomerChange" @on-search="handleCustomerSearch" @on-blur="handleCustomerBlur" :disabled="disabled">-->
          <!--<Option v-for="item in customerList" :value="item.name" :key="item.id">{{ item.name }}</Option>-->
        <!--</AutoComplete>-->
      </FormItem>
      <FormItem label="联系人:" prop="contacts">
        <Input v-model="formData.contacts" placeholder="请输入联系人" :disabled="disabled"></Input>
      </FormItem>
      <FormItem label="项目类型:" prop="typeId">
        <Select v-model="formData.typeId" filterable>
          <Option v-for="item in typeList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
        <!--<AutoComplete v-model="formData.typeId" placeholder="请选择项目类型" icon="md-search" @on-change="handleTypeChange" @on-search="handleTypeSearch" @on-blur="handleTypeBlur" :disabled="disabled">-->
          <!--<Option v-for="item in typeList" :value="item.name" :key="item.id">{{ item.name }}</Option>-->
        <!--</AutoComplete>-->
      </FormItem>
      <FormItem label="立项日期:" prop="begin">
        <DatePicker v-model="formData.begin" format="yyyy-MM-dd" type="date" placeholder="请选择立项日期" @on-change="handleDate(arguments, 0)" :disabled="disabled" style="width:100%"></DatePicker>
      </FormItem>
      <FormItem label="截止日期:" prop="end">
        <DatePicker v-model="formData.end" format="yyyy-MM-dd" type="date" placeholder="请选择截止日期" @on-change="handleDate(arguments, 1)" :disabled="disabled" style="width:100%"></DatePicker>
      </FormItem>
      <div class="text-center" v-show="!disabled"><a @click="handleAddMember">{{memberFlag?'取消项目成员':'添加项目成员'}}</a></div>
      <div v-if="memberFlag">
        <FormItem label="项目经理:" prop="manager">
          <Select v-model="formData.manager" :disabled="disabled">
            <Option v-for="item in managerData" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="培训专员:" prop="trainer">
          <Select v-model="formData.trainer" multiple :disabled="disabled">
            <Option v-for="item in managerData" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="小组长:" prop="groupLeader">
          <Select v-model="formData.groupLeader" multiple :disabled="disabled">
            <Option v-for="item in managerData" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </div>
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
  import {dateTimeFormat} from '@/util/datetime_format.js'
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
          typeId: '',
          customerId: '',
          contacts: '', // 联系人
          begin: '',
          end: '',
          manager: '',
          trainer: '',
          groupLeader: ''
        },
        formRule: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'}
          ]
        },
        btnLoading: false,
        customerList: [],
        typeList: [],
        memberFlag: false // 添加项目成员标识，默认待添加，true时为取消添加
      }
    },
    methods: {
      open (id = '', editable = true) {
        this.show = true
        this.disabled = !editable
        if (id) {
          this.title = '修改项目'
          ProjectHttp.getDetail(id)
            .then(data => {
              this.formData = data
            })
            .catch(error => {
              console.warn('获取客户详情失败：', error)
            })
        } else {
          this.title = '新增项目'
          this.formData = this._.cloneDeep(this.formData) // todo 正式场景时需注释掉
          this.formData.id = ''
        }
        this.customerList = this._.cloneDeep(this.customerData)
        this.typeList = this._.cloneDeep(this.typeData)
        if (this.formData.id && this.formData.manager) {
          this.memberFlag = true
        } else {
          return false // 新增时默认待添加
        }
      },
      handleSubmit () {
        if (this.formData.begin.constructor.name === 'Date') {
          this.formData.begin = dateTimeFormat(this.formData.begin, 'yyyy-MM-dd')
        }
        if (this.formData.end.constructor.name === 'Date') {
          this.formData.end = dateTimeFormat(this.formData.end, 'yyyy-MM-dd')
        }
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
      /* handleCustomerSearch (value) {
        this.customerList = this.customerData.filter(item => {
          return item.name.indexOf(value) !== -1
        })
      },
      handleCustomerChange (value) {
        if (!value) {
          this.customerList = this._.cloneDeep(this.customerData)
        }
      },
      handleCustomerBlur (event) {
        // 如果文本框中的内容在客户列表中没有匹配项，则默认选第一个
        let flag = this.customerData.find(item => {
          return item.name == this.formData.customerId
        })
        if (!flag) {
          if (this.customerList.length) {
            this.formData.customerId = this.customerList[0].name
          } else {
            this.formData.customerId = ''
          }
        }
      },
      handleTypeChange (value) {
        if (!value) {
          this.typeList = this._.cloneDeep(this.typeData)
        }
      },
      handleTypeSearch (value) {
        this.typeList = this.typeData.filter(item => {
          return item.name.indexOf(value) !== -1
        })
      },
      handleTypeBlur (event) {
        // 如果文本框中的内容在项目类型列表中没有匹配项，则默认选第一个
        let flag = this.typeData.find(item => {
          return item.name == this.formData.typeId
        })
        if (!flag) {
          if (this.typeList.length) {
            this.formData.typeId = this.typeList[0].name
          } else {
            this.formData.typeId = ''
          }
        }
      }, */
      handleDate (arg, type) {
        if (type) {
          // 截止时间
          this.formData.end = this._.cloneDeep(arg[0])
        } else {
          // 立项时间
          this.formData.begin = this._.cloneDeep(arg[0])
        }
      },
      handleAddMember () {
        this.memberFlag = !this.memberFlag
      },
      cancel () {
        this.show = false
        this.$refs['formData'].resetFields()
      }
    },
    watch: {
      memberFlag: function (value) {
        if (!value) {
          this.formData.manager = ''
          this.formData.trainer = ''
          this.formData.groupLeader = ''
        }
      }
    }
  }
</script>
