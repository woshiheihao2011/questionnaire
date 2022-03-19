<style lang="less">
</style>
<template>
  <Modal v-model="show" title="发送明细" @on-cancel="cancel" :width="800">
    <RadioGroup v-model="type" type="button">
      <Radio label="1">已接收</Radio>
      <Radio label="0">未接受</Radio>
    </RadioGroup>
    <DataTable ref="table" :data="data" :columns="columns" :loading="false"></DataTable>
    <div slot="footer">
    </div>
  </Modal>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        type: '1',
        data: [
          {
            time: '2019-02-13 17:31:31',
            name: '张小刚',
            age: '24',
            address: '北京市海淀区西二旗'
          },
          {
            time: '2019-02-13 17:31:31',
            name: '李小红',
            age: '30',
            address: '上海市浦东新区世纪大道'
          }
        ],
        columns: [
          {
            title: '发送时间',
            key: 'time',
            minWidth: 120,
            tooltip: true
          },
          {
            title: '姓名',
            key: 'name',
            minWidth: 80,
            tooltip: true
          },
          {
            title: '年龄',
            key: 'age',
            minWidth: 60,
            tooltip: true
          },
          {
            title: '地址',
            key: 'address',
            minWidth: 150,
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
                    }
                  }
                }, '查看'),
                h('a', {
                  class: 'm-r-8',
                  on: {
                    click: (e) => {
                      e.stopPropagation()
                    }
                  }
                }, '下载')
              ])
            }
          }
        ]
      }
    },
    methods: {
      open () {
        this.show = true
      },
      cancel () {
        this.show = false
      }
    }
  }
</script>
