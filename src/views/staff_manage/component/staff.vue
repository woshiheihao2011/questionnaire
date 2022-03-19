<style lang="less">
</style>
<template>
  <div class="staff">
    <div class="operate-area flex">
      <div class="flex-1"><Button type="primary" @click="openForm()" class="m-r-8" icon="md-add">新增</Button><Button @click="del(ids)">批量删除</Button></div>
      <div>
        <Input v-model="condition.name" placeholder="请输入联系人名称" style="width: 150px" @on-change="handleName" @on-blur="handleName"/>
        <Input v-model="condition.phone" placeholder="请输入联系人电话" class="m-l-8 m-r-8" style="width: 150px" @on-change="handlePhone" @on-blur="handlePhone"/>
        <DatePicker v-model="condition.entryDate" type="daterange" placement="bottom-end" placeholder="选择入职时间" style="width: 150px"  @on-change="handleEntry" format="yyyy-MM-dd" class="m-r-8"></DatePicker>
        <AutoComplete v-model="condition.role" placeholder="请输入角色名称" style="width:150px" icon="md-search" :filter-method="filterRole" @on-search="handleRoleSearch" @on-change="handleRoleChange">
          <Option v-for="item in roleList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </AutoComplete>
    </div>
    </div>
    <UrlTable ref="table" :url="url" :columns="columns" :params="condition" @on-selection-change="handleSelectChange" ></UrlTable>
    <StaffForm ref="StaffForm" @success="getList"></StaffForm>
  </div>
</template>
<script>
  import StaffForm from './staff_form.vue'
  import StaffHttp from 'server/http/staff'
  export default {
    components: {
      StaffForm
    },
    data () {
      return {
        ids: '',
        entryDate: [],
        condition: {
          name: '',
          phone: '',
          beginDate: '',
          endDate: '',
          role: ''
        },
        url: this.routeMap.staffList,
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
            title: '姓名',
            key: 'name',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '电话',
            key: 'phone',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '性别',
            key: 'sex',
            minWidth: 60,
            tooltip: true
          },
          {
            title: '角色',
            key: 'roleId',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '入职时间',
            key: 'entryDate',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '操作',
            minWidth: 120,
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
        timer: null,
        roleData: [],
        roleList: []
      }
    },
    mounted () {
      this.getList()
      StaffHttp.getRoleList()
        .then(data => {
          this.roleData = data
          this.roleList = this._.cloneDeep(this.roleData)
        })
        .catch(error => {
          console.warn('获取角色列表失败：', error)
        })
    },
    methods: {
      getList () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs['table'].list()
        }, 1000)
      },
      openForm (id = '', editable = true) {
        this.$refs['StaffForm'].open(id, editable)
      },
      del (ids) {
        StaffHttp.del(ids)
          .then(data => {
            this.$Message.success('删除成功！')
            this.$refs['table'].list()
          })
          .catch(error => {
            this.$Message.warning('删除失败！')
            console.warn('删除客户失败：', error)
          })
      },
      handleSelectChange (selection) {
        this.ids = this._.map(selection, 'id')
      },
      handleName () {
        this.getList()
      },
      handlePhone () {
        this.getList()
      },
      handleEntry (date) {
        this.condition.beginDate = date[0]
        this.condition.endDate = date[1]
        this.getList()
      },
      filterRole (value, option) {
        return option.indexOf(value) !== -1
      },
      handleRoleChange (value) {
        if (!value) {
          this.roleList = this._.cloneDeep(this.roleData)
        }
        this.condition.role = value
        this.getList()
      },
      handleRoleSearch (value) {
        this.roleList = this.roleData.filter(item => {
          return item.name.indexOf(value) !== -1
        })
      }
    }
  }
</script>
