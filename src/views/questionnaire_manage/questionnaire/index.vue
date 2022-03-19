<style>
</style>
<template>
  <div class="question">
    <div class="flex">
      <div class="flex-1">
        <Button type="primary" @click="openForm()" class="m-r-8" icon="md-add">新增</Button><Button @click="del(ids)" class="m-r-8">批量删除</Button><Button @click="makeQuesForm(ids)" class="m-r-8">问卷制作</Button><Dropdown @on-click="handleDropDownMore">
        <Button type="primary">
          更多
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list" @on-click="handleDropDownMore">
          <DropdownItem name="1">数据分析</DropdownItem>
          <DropdownItem name="2">设置</DropdownItem>
          <DropdownItem name="3">沟通</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
      <div>
        <Input v-model="condition.name" placeholder="请输入问卷标题" class="m-r-8" style="width: 130px" @on-change="handleSearch" @on-blur="handleSearch"/>
        <DatePicker v-model="createDateRange" type="daterange" placement="bottom-end" placeholder="问卷创建时间" @on-change="handleDateRange" style="width: 180px" class="m-r-8"></DatePicker>
        <AutoComplete v-model="condition.customerId" :data="[]" placeholder="所属客户" style="width:130px" icon="md-search" @on-change="handleCustomerChange" @on-search="handleCustomerSearch" class="m-r-8">
          <Option v-for="item in customerList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </AutoComplete>
        <AutoComplete v-model="condition.state" placeholder="问卷状态" style="width:130px" icon="md-search" @on-change="handleStateChange" @on-search="handleStateSearch" class="m-r-8">
          <Option v-for="item in stateList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </AutoComplete>
      </div>
    </div>
    <!--按钮操作行-->
    <div>

    </div>
    <!--数据过滤条件行-->
    <div class="m-t-16">

    </div>
    <UrlTable ref="table" :url="url" :columns="columns" :params="condition" @on-selection-change="handleSelectChange"></UrlTable>
    <QuestionForm ref="QuestionForm" @success="getList"></QuestionForm>
    <AnalysisForm ref="AnalysisForm"></AnalysisForm>
    <CommunicateForm ref="CommunicateForm"></CommunicateForm>
    <SetForm ref="SetForm"></SetForm>
    <MakeForm ref="MakeForm"></MakeForm>
  </div>
</template>
<script>
  import QuestionHttp from 'server/http/questionnaire'
  import QuestionForm from './component/question_form.vue'
  import AnalysisForm from './component/analysis_form.vue'
  import CommunicateForm from './component/communicate_form.vue'
  import SetForm from './component/set_form.vue'
  import MakeForm from './component/make_form.vue'
  export default {
    components: {
      QuestionForm, AnalysisForm, CommunicateForm, SetForm, MakeForm
    },
    created () {
      this.$emit('updateActive', '6-1')
    },
    data () {
      return {
        url: this.routeMap.questionnaireList,
        columns: [
          {
            type: 'selection',
            title: '选择',
            minWidth: 50,
            tooltip: true
          },
          {
            title: '编号',
            key: 'id',
            width: 60,
            tooltip: true
          },
          {
            title: '问卷标题',
            key: 'name',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '所属项目',
            key: 'projectId',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '状态',
            key: 'stateId',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '创建时间',
            key: 'createTime',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '创建人',
            key: 'creater',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '单价',
            key: 'price',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '样本数',
            key: 'sampleSize',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '答卷数',
            key: 'answerNum',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '已发送/已接受',
            key: 'sendOrReceive',
            minWidth: 120,
            tooltip: true
          },
          {
            title: '完成比例',
            key: 'finishRate',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '操作',
            minWidth: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  'class': 'm-r-8',
                  on: {
                    click: (e) => {
                      e.stopPropagation()
                      this.openForm(params.row.id, false)
                    }
                  }
                }, '查看'),
                h('a', {
                  class: 'm-r-8',
                  on: {
                    click: (e) => {
                      e.stopPropagation()
                      this.openForm(params.row.id, true)
                    }
                  }
                }, '编辑'),
                h('a', {
                  class: 'text-red nohover',
                  on: {
                    click: (e) => {
                      e.stopPropagation()
                      this.del(params.row.id)
                    }
                  }
                }, '删除'),
                h('a', {
                  'class': 'm-r-8',
                  on: {
                    click: (e) => {
                      e.stopPropagation()
                      this.makeQuesForm(params.row.id)
                    }
                  }
                }, '制作问卷')
              ])
            }
          }
        ],
        condition: {
          name: '',
          begin: '',
          end: ''
        },
        customerData: [],
        customerList: [], // 客户列表
        stateData: [],
        stateList: [], // 问卷状态
        createDateRange: [], // 问卷创建时间范围，用来生成condition的begin，end
        ids: '',
        timer: null
      }
    },
    mounted () {
      this.getList()
      // 获取客户列表
      QuestionHttp.getCustomerList()
        .then(data => {
          this.customerData = data
          this.customerList = this._.cloneDeep(this.customerData)
        })
        .catch(error => {
          console.warn('获取客户列表失败:', error)
        })

      QuestionHttp.getQuestionState()
        .then(data => {
          this.stateData = data
          this.stateList = this._.cloneDeep(this.stateData)
        })
        .catch(error => {
          console.warn('获取客户列表失败:', error)
        })
    },
    methods: {
      openForm (id = '', editable = true) {
        this.$refs['QuestionForm'].open(id, editable)
      },
      getList () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs['table'].list()
        }, 1000)
      },
      del (ids) {
        QuestionHttp.del(ids)
          .then(data => {
            this.$Message.success('删除成功！')
            this.$refs['table'].list()
          })
          .catch(error => {
            this.$Message.warning('删除失败！')
            console.warn('删除问卷失败：', error)
          })
      },
      makeQuesForm (id) {
        if (!id || id.constructor.name === 'Array' && id.length !== 1) {
          this.$Message.warning('请选择一个问卷进行制作')
          return
        }
        let temp = ''
        if (id.constructor.name === 'Array') {
          temp = id.join()
        } else {
          temp = id
        }
        this.$route.params.id = temp
//        location.href = '/#/questionnaire/make/' + temp
        this.$router.push('/questionnaire/make/' + temp)
//        this.$refs['MakeForm'].open(temp)
      },
      handleSelectChange (selection) {
        this.ids = this._.map(selection, 'id')
//        this.idObjs = selection
      },
      handleCustomerSearch (value) {
        this.customerList = this.customerData.filter(item => {
          return item.name.indexOf(value) !== -1
        })
      },
      handleCustomerChange (value) {
        if (!value) {
          this.customerList = this._.cloneDeep(this.customerData)
        }
        this.condition.customerId = value
        this.getList()
      },
      handleStateSearch (value) {
        this.stateList = this.stateData.filter(item => {
          return item.name.indexOf(value) !== -1
        })
      },
      handleStateChange (value) {
        if (!value) {
          this.stateList = this._.cloneDeep(this.stateData)
        }
        this.condition.state = value
        this.getList()
      },
      handleSearch () {
        this.getList()
      },
      handleDateRange (value, type) {
        if (value.length) {
          this.condition.begin = value[0]
          this.condition.end = value[1]
        } else {
          this.condition.begin = ''
          this.condition.end = ''
        }
        this.getList()
      },
      handleDropDownMore (menu) {
        if (menu === '1') {
          // 数据分析
          this.$refs['AnalysisForm'].open()
        } else if (menu === '2') {
          // 设置
          this.$refs['SetForm'].open()
        } else if (menu === '3') {
          // 沟通
          this.$refs['CommunicateForm'].open()
        }
      }
    }
  }
</script>
