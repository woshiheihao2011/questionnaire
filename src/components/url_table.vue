<style lang="less">
</style>
<template>
  <div class="m-tb-16">
    <Table :data="data" :columns="columns" stripe :loading="loading" @on-selection-change="handleSelectChange" class="table">
    </Table>
    <div v-if="showPage" class="text-right m-t-8">
      <Page :total="total" :page-size="pageSize" show-sizer show-elevator show-total @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"></Page>
    </div>
  </div>
</template>
<script>
  import demoData from '../data/demo_data'
  export default {
    name: 'UrlTable',
    props: {
      url: {
        type: String,
        default: ''
      },
      params: {
        type: Object,
        default: () => Object.create(null)
      },
      columns: {
        type: Array,
        default: () => []
      },
      showPage: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        data: [],
        curPage: 1,
        pageSize: 10,
        total: 0,
        loading: false
//        height: 521,
      }
    },
    methods: {
      list (page = 1, pageSize = 10) {
        if (!this.url) {
          this.data = []
          return
        }
        this.loading = true
        this.curPage = page
        this.pageSize = pageSize
        switch (this.url) {
          case this.routeMap.customerList:
            this.getCustomerList(page, pageSize)
            break
          case this.routeMap.staffList:
            this.getStaffList(page, pageSize)
            break
          case this.routeMap.projectList:
            this.getProjectList(page, pageSize)
            break
          case this.routeMap.questionnaireList:
            this.getQuestionList(page, pageSize)
            break
          default:
            break
        }
//        if (this.data.length) {
//          if (this.data.length >= 10) {
//            this.height = 521
//          } else {
//            this.height = 40 + 48 * this.data.length
//          }
//        }
        // todo 正式api后，需放开下列代码
        /* let params = {
          page: page,
          iDisplayLength: this.pageSize
        } */
        /* this.axios.get(this.url, {params: Object.assign(params, this.params)})
          .then(data => {
            this.total = data.total
            this.data = data.data
          })
          .catch(error => {
            console.warn('error:', this.url, error)
          }) */
      },
      handlePageChange (page) {
        this.curPage = page
        this.list(this.curPage, this.pageSize)
      },
      handlePageSizeChange (pageSize) {
        this.pageSize = pageSize
        this.list(this.curPage, this.pageSize)
      },
      handleSelectChange (selection) {
        this.$emit('on-selection-change', selection)
      },

      /**
       *下列为模拟数据方法，正式时需删除
       * */
      getCustomerList (page, pageSize) {
        let tempList = demoData.customer
        if (this.params.name) {
          tempList = tempList.filter(item => {
            return item.name.includes(this.params.name)
          })
        }
        if (this.params.contacts) {
          tempList = tempList.filter(item => {
            return item.contacts.includes(this.params.contacts)
          })
        }
        if (this.params.phone) {
          tempList = tempList.filter(item => {
            return item.phone.includes(this.params.phone)
          })
        }
        this.total = tempList.length
        this.data = tempList.slice((page - 1) * pageSize, page * pageSize)
        this.loading = false
      },
      getStaffList (page, pageSize) {
        let staffList = demoData.staff
        if (this.params) {
          if (this.params.name) {
            staffList = staffList.filter(item => {
              return item.name.includes(this.params.name)
            })
          }
          if (this.params.phone) {
            staffList = staffList.filter(item => {
              return item.phone.includes(this.params.phone)
            })
          }
          if (this.params.beginDate) {
            staffList = staffList.filter(item => {
              return item.entryDate >= this.params.beginDate
            })
          }
          if (this.params.endDate) {
            staffList = staffList.filter(item => {
              return item.entryDate <= this.params.endDate
            })
          }
          if (this.params.role) {
            staffList = staffList.filter(item => {
              return item.roleId.indexOf(this.params.role) !== -1
            })
          }
        }
//        for (let i = 0; i < 5; i++) {
//          staffList = staffList.concat(_.cloneDeep(staffList))
//        }
        this.total = staffList.length
        this.data = staffList.slice((page - 1) * pageSize, page * pageSize)
        this.loading = false
      },
      getProjectList (page, pageSize) {
        let list = demoData.project
        if (this.params) {
          if (this.params.name) {
            list = list.filter(item => {
              return item.name.includes(this.params.name)
            })
          }
          if (this.params.typeId) {
            list = list.filter(item => {
              return item.typeId.includes(this.params.typeId)
            })
          }
          if (this.params.manager) {
            list = list.filter(item => {
              return item.manager.includes(this.params.manager)
            })
          }
          if (this.params.customerId) {
            list = list.filter(item => {
              return item.customerId.includes(this.params.customerId)
            })
          }
          if (this.params.begin) {
            list = list.filter(item => {
              return item.begin >= this.params.begin
            })
          }
          if (this.params.end) {
            list = list.filter(item => {
              return item.begin <= this.params.end
            })
          }
        }
//        for (let i = 0; i < 5; i++) {
//          list = list.concat(_.cloneDeep(list))
//        }
        this.total = list.length
        this.data = list.slice((page - 1) * pageSize, page * pageSize)
        this.loading = false
      },
      getQuestionList (page, pageSize) {
        let list = demoData.questionnaire
        if (this.params) {
          if (this.params.name) {
            list = list.filter(item => {
              return item.name.includes(this.params.name)
            })
          }
          if (this.params.stateId) {
            list = list.filter(item => {
              return item.stateId.includes(this.params.stateId)
            })
          }
          if (this.params.begin) {
            list = list.filter(item => {
              return item.begin >= this.params.begin
            })
          }
          if (this.params.end) {
            list = list.filter(item => {
              return item.begin <= this.params.end
            })
          }
        }
        this.total = list.length
        this.data = list.slice((page - 1) * pageSize, page * pageSize)
        this.loading = false
      }
    }
  }
</script>
<style lang="less">
</style>
