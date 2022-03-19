<style lang="less">
  .make-form{
    .title{
      border: 1px solid #ebebeb;
      text-align: center;
      padding: 8px 0 8px 0;
    }
    .ques-type{
      background-color: #ebebeb;
      padding: 8px;
    }
  }
</style>
<template>
  <Modal v-model="show" title="问卷制作" @on-cancel="cancel" class="make-form">
    <div class="title">
      <Button @click="makeQues" class="m-r-8">制作问卷</Button><Button @click="logicalSet">逻辑设置</Button>
      <Button type="primary" @click="exportQues" class="m-r-8" style="float:right">导出</Button>
      <Button type="primary" @click="preview" class="m-r-8" style="float:right">预览</Button>
    </div>
    <div class="content flex">
      <div class="flex-1">
        <!--基础题型-->
        <div class="ques-type">
          <Icon type="md-radio-button-on" />单选题
        </div>
        <!--高级题型-->
        <div class="ques-type">

        </div>
      </div>
      <div class="flex-2 ques-type m-l-8">

      </div>
    </div>
  </Modal>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        queId: '' // 问卷id
      }
    },
    methods: {
      open (quesId) {
        this.show = true
        this.queId = quesId
      },
      makeQues () {

      },
      logicalSet () {

      },
      exportQues () {

      },
      preview () {

      },
      cancel () {
        this.show = false
      }
    }
  }
</script>
