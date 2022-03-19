<style>
</style>
<template>
  <div class="publish">
    <!--筛选条件区域-->
    <div class="flex">
        <div class="flex-1">
          <Button type="primary" @click="send" class="m-r-8">发送问卷</Button><Button @click="sendAll" class="m-r-8">全部发送问卷</Button>
        </div>
      <div class="flex">
        <Select v-model="city" filterable multiple class="m-r-8" placeholder="请选择城市">
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select><Select v-model="age" filterable multiple class="m-r-8" placeholder="请选择年龄">
        <Option v-for="item in ageList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select><Select v-model="sex" filterable multiple placeholder="请选择性别">
        <Option v-for="item in sexList" :value="item.id" :key="item.id">{{ item.name}}</Option>
      </Select>
      </div>
    </div>
    <!--表格区域-->
    <UrlTable ref="table" :url="url" :columns="columns" :params="condition" @on-selection-change="handleSelectChange"></UrlTable>
  </div>
</template>
<script>
  export default {
    created () {
      this.$emit('updateActive', '6-2')
    },
    data () {
      return {
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
        city: [],
        age: [],
        sex: [],
        condition: {
          city: '',
          age: '',
          sex: ''
        },
        cityList: [
          {
            id: 1,
            name: '北京'
          },
          {
            id: 2,
            name: '上海'
          },
          {
            id: 3,
            name: '广州'
          },
          {
            id: 4,
            name: '深圳'
          }
        ],
        ageList: [
          {
            id: 1,
            name: '20-30'
          },
          {
            id: 2,
            name: '30-40'
          },
          {
            id: 3,
            name: '40-50'
          },
          {
            id: 4,
            name: '50-60'
          }
        ],
        sexList: [
          {
            id: 1,
            name: '男'
          },
          {
            id: 2,
            name: '女'
          },
          {
            id: 3,
            name: '未知'
          }
        ],
        ids: [],
        timer: null
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      getList () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs['table'].list()
        }, 1000)
      },
      send () {
        // this.ids
      },
      sendAll () { // this.condition
      },
      handleSelectChange (selection) {
        this.ids = this._.map(selection, 'id')
      }
    }
  }
</script>
