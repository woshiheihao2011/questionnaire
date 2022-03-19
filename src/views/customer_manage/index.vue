<style lang="less">
  .customer{
    .operate-area{
      .ivu-select-dropdown-list{
        max-height: 150px;
      }
    }
  }
</style>
<template>
  <div class="customer">
    <div class="operate-area flex">
      <div class="flex-1"><Button type="primary" @click="openForm()" class="m-r-8" icon="md-add">新增</Button><Button @click="del(ids)">批量删除</Button></div>
      <div>
        <AutoComplete v-model="condition.name" :data="companyList" placeholder="请输入客户公司名称" style="width:200px" icon="md-search"  @on-change="handleCompanyChange" :filter-method="filterCompany">
          <!--<Option v-for="item in companyList" :value="item.name" :key="item.id">{{ item.name }}</Option>-->
        </AutoComplete>
        <Input v-model="condition.phone" placeholder="请输入联系人电话" class="m-l-8 m-r-8" style="width: 150px" @on-change="handlePhone" @on-blur="handlePhone"/>
        <Input v-model="condition.contacts" placeholder="请输入联系人名称" style="width: 150px" @on-change="handleContacts" @on-blur="handleContacts"/>
      </div>
    </div>
    <UrlTable ref="table" :url="url" :columns="columns" :params="condition" @on-selection-change="handleSelectChange"></UrlTable>
    <CustomerForm ref="CustomerForm" @success="getList"></CustomerForm>
  </div>
</template>
<script>
  import DataTable from '@/components/data_table.vue'
  import UrlTable from '@/components/url_table.vue'
  import demoData from '../../data/demo_data.js'
  import CustomerForm from './component/customer_form.vue'
  import CustomerHttp from 'server/http/customer'
  export default {
    created () {
      this.$emit('updateActive', '4')
    },
    components: {
      DataTable, UrlTable, CustomerForm
    },
    data () {
      return {
        url: this.routeMap.customerList,
        condition: {
          name: '',
          contacts: '',
          phone: ''
        },
        companyList: [],
        list: [],
        loading: false,
        columns: [
          {
            type: 'selection',
            title: '选择',
            minWidth: 20,
            tooltip: true
          },
          {
            title: '编号',
            key: 'id',
            minWidth: 60,
            tooltip: true
          },
          {
            title: '公司名称',
            key: 'name',
            minWidth: 120,
            tooltip: true
          },
          {
            title: '部门名称',
            key: 'department',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '联系人姓名',
            key: 'contacts',
            minWidth: 100,
            tooltip: true
          },
          {
            title: '联系人电话',
            key: 'phone',
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
        ids: []
      }
    },
    mounted () {
      setTimeout(() => {
        if (demoData.customer.length === 1) {
          for (let i = 0; i < 22; i++) {
            demoData.customer.push({
              id: 10 + i,
              name: '百度' + i,
              department: '',
              contacts: '李广利',
              phone: '13233474068',
              pwd: ''
            })
          }
        }
//        this.companyList = demoData.customer
        this.companyList = this._.map(demoData.customer, 'name')
        this.$refs['table'].list()
      }, 2000)
    },
    methods: {
      filterCompany (value, option) {
        return option.indexOf(value) !== -1
      },
      handleCompanyChange (value) {
        this.condition.name = value
        this.getList()
      },
      handlePhone () {
        this.getList()
      },
      handleContacts () {
        this.getList()
      },
      getList () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs['table'].list()
        }, 1000)
      },
      /*
      * 新增时，id为null，editable为null
      * 修改为id为具体值，editable为true
      * 查看详情id为具体值，editable为false
      * */
      openForm (id = '', editable = true) {
        this.$refs['CustomerForm'].open(id, editable)
      },
      del (ids) {
        CustomerHttp.del(ids)
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
      }
    }
  }
</script>
