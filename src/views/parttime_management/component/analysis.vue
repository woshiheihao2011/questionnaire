<style lang="less"></style>
<template>
  <div>
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
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
          }
        ]
      }
    },
    mounted () {

    },
    methods: {
      handleSelectChange (selection) {
        this.ids = this._.map(selection, 'id')
      }
    }
  }
</script>
