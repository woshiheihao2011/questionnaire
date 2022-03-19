<style lang="less">
.project{
}
</style>
<template>
  <div class="project">
    <div class="flex">
      <div class="flex-1"><Button type="primary" @click="openForm()" class="m-r-8" icon="md-add">新增</Button><Button @click="del(ids)" class="m-r-8">批量删除</Button><Button @click="handleAddMembers" :disabled="btnMemberDisabled">{{btnMemberText}}项目成员</Button></div>
      <div>
        <Input v-model="condition.name" placeholder="请输入项目名称" class="m-r-8" style="width: 130px" @on-change="handleSearch" @on-blur="handleSearch"/>
        <AutoComplete v-model="condition.typeId" placeholder="请输入项目类型" style="width:130px" icon="md-search" @on-change="handleTypeChange" @on-search="handleTypeSearch" class="m-r-8">
          <Option v-for="item in typeList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </AutoComplete>
        <AutoComplete v-model="condition.manager" placeholder="请输入项目负责人" style="width:130px" icon="md-search" @on-change="handleManagerChange" @on-search="handleManagerSearch" class="m-r-8">
          <Option v-for="item in managerList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </AutoComplete>
        <AutoComplete v-model="condition.customerId" :data="[]" placeholder="请输入客户名称" style="width:130px" icon="md-search" @on-change="handleCustomerChange" @on-search="handleCustomerSearch" class="m-r-8">
          <Option v-for="item in customerList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </AutoComplete>
        <DatePicker v-model="projectDateRange" type="daterange" placement="bottom-end" placeholder="请输入立项时间" @on-change="handleDateRange" style="width: 180px"></DatePicker>
      </div>
    </div>
    <UrlTable ref="table" :url="url" :columns="columns" :params="condition" @on-selection-change="handleSelectChange"></UrlTable>
    <ProjectForm ref="ProjectForm" @success="getList" :managerData="managerData" :typeData="typeData" :customerData="customerData"></ProjectForm>
    <ProjectMemberForm ref="ProjectMemberForm" :staffList="managerData"></ProjectMemberForm>
  </div>
</template>
<script>
  import ProjectForm from './component/project_form.vue'
  import ProjectHttp from 'server/http/project'
  import ProjectMemberForm from './component/project_member_form.vue'
  export default {
    components: {
      ProjectForm, ProjectMemberForm
    },
    created () {
      this.$emit('updateActive', '5')
    },
    data () {
      return {
        url: this.routeMap.projectList,
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
            title: '项目名称',
            key: 'name',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '样本量',
            key: 'sampleSize',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '客户名称',
            key: 'customerId',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '项目类型',
            key: 'typeId',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '联系人',
            key: 'contacts',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '立项时间',
            key: 'begin',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '截至时间',
            key: 'end',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '项目经理',
            key: 'manager',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '项目阶段',
            key: 'phase',
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
                }, '删除')
              ])
            }
          }
        ],
        condition: {
          name: '',
          typeId: '',
          manager: '',
          customerId: '',
          begin: '',
          end: ''
        },
        projectDateRange: [], // 项目立项时间，查询条件
        ids: '',
        idObjs: [], // 复选框选中项的对象集合
        typeData: [],
        typeList: [], // 项目类型
        managerData: [],
        managerList: [], // 项目负责人
        customerData: [],
        customerList: [], // 客户列表
        timer: null,
        btnMemberText: '添加',
        btnMemberDisabled: true
      }
    },
    mounted () {
      this.getList()
      // 获取项目类型
      ProjectHttp.getProjectTypeList()
        .then(data => {
          this.typeData = data
          this.typeList = this._.cloneDeep(this.typeData)
        })
        .catch(error => {
          console.warn('获取项目类型失败:', error)
        })

      // 获取项目负责人
      ProjectHttp.getProjectManager()
        .then(data => {
          this.managerData = data
          this.managerList = this._.cloneDeep(this.managerData)
        })
        .catch(error => {
          console.warn('获取项目负责人失败:', error)
        })

      // 获取客户列表
      ProjectHttp.getCustomerList()
        .then(data => {
          this.customerData = data
          this.customerList = this._.cloneDeep(this.customerData)
        })
        .catch(error => {
          console.warn('获取客户列表失败:', error)
        })
    },
    methods: {
      openForm (id = '', editable = true) {
        this.$refs['ProjectForm'].open(id, editable)
      },
      getList () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs['table'].list()
        }, 1000)
      },
      handleSearch () {
        this.getList()
      },
      handleTypeSearch (value) {
        this.typeList = this.typeData.filter(item => {
          return item.name.indexOf(value) !== -1
        })
      },
      handleTypeChange (value) {
        if (!value) {
          this.typeList = this._.cloneDeep(this.typeData)
        }
        this.condition.typeId = value
        this.getList()
      },
      handleManagerSearch (value) {
        this.managerList = this.managerData.filter(item => {
          return item.name.indexOf(value) !== -1
        })
      },
      handleManagerChange (value) {
        if (!value) {
          this.managerList = this._.cloneDeep(this.managerData)
        }
        this.condition.manager = value
        this.getList()
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
      handleSelectChange (selection) {
        this.ids = this._.map(selection, 'id')
        this.idObjs = selection
        if (selection.length === 1) {
          if (selection[0].manager) {
            this.btnMemberText = '修改'
          } else {
            this.btnMemberText = '添加'
          }
          this.btnMemberDisabled = false
        } else {
          this.btnMemberDisabled = true
        }
      },
      del (ids) {
        ProjectHttp.del(ids)
          .then(data => {
            this.$Message.success('删除成功！')
            this.$refs['table'].list()
          })
          .catch(error => {
            this.$Message.warning('删除失败！')
            console.warn('删除客户失败：', error)
          })
      },
      handleAddMembers () {
        if (this.ids.length > 1 || !this.ids.length) {
          this.$Message.warning('请选择一个项目，为该项目添加成员')
        }
        this.$refs['ProjectMemberForm'].open(this._.cloneDeep(this.idObjs[0]))
      }
    }
  }
</script>
