<style lang="less">
  .parttime-manage{
    .table .ivu-table-body{
      max-height: 481px;
      min-height: 300px;
      overflow-y: auto;
    }
  }
</style>
<template>
  <div class="parttime-manage">
    <div class="flex">
      <div class="flex-1"><Button type="primary" @click="openForm()" class="m-r-8" icon="md-add">新增</Button><Button @click="del(ids)">批量删除</Button>
      </div>
      <div>
        <Input v-model="condition.name" placeholder="请输入用户名" style="width: 150px" @on-change="getList" @on-blur="getList"/>
        <Input v-model="condition.phone" placeholder="请输入电话号码" class="m-l-8 m-r-8" style="width: 150px" @on-change="getList" @on-blur="getList"/>
        <DatePicker v-model="condition.entryDate" type="daterange" placement="bottom-end" placeholder="请选择入职时间" style="width: 150px"  @on-change="handleEntry" format="yyyy-MM-dd" class="m-r-8"></DatePicker>
        <Cascader :data="cityList" v-model="selCity" placeholder="请选择城市" style="width: 150px" @on-change="handleCityChange" class="inline-block"></Cascader>
      </div>
    </div>
    <UrlTable ref="table" :url="url" :columns="columns" :params="condition" @on-selection-change="handleSelectChange" ></UrlTable>
    <ParttimeForm ref="ParttimeForm" @success="getList"></ParttimeForm>
  </div>
</template>
<script>
  import ParttimeForm from './parttime_form.vue'
  import ParttimeHttp from 'server/http/parttime'
  export default {
    components: {
      ParttimeForm
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
          city: ''
        },
        selCity: [],
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
        cityList: []
      }
    },
    mounted () {
      this.getList()
      // todo 获取城市列表数据源
    },
    methods: {
      getList () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs['table'].list()
        }, 1000)
      },
      openForm (id = '', editable = true) {
        this.$refs['ParttimeForm'].open(id, editable)
      },
      del (ids) {
        // 删除
        ParttimeHttp.del(ids)
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
//      handleName () {
//        this.getList()
//      },
//      handlePhone () {
//        this.getList()
//      },
      handleEntry (date) {
        this.condition.beginDate = date[0]
        this.condition.endDate = date[1]
        this.getList()
      },
      handleCityChange (value, selectedData) {
        if (!value || !value.length) {
          this.condition.city = ''
        } else {
          this.condition.city = value.join()
        }
        this.getList()
      }
    }
  }
</script>
