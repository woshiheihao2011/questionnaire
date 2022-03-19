<style lang="less">
  .make-ques{
    .title{
      border: 1px solid #ebebeb;
      text-align: center;
      padding: 8px 0 8px 0;
    }
    .ques-type{
      background-color: #ebebeb;
      padding: 8px;
    }
    ul{
      list-style: none;
      li{
        cursor:pointer;
        i{
          margin-right: 8px;
        }
      }
    }
    .ques-inline-block{
      display: inline-block;
    }
    .ques-close-icon{
      float: right;
      display: inline-block;
      line-height: 21px;
    }
  }
</style>
<template>
  <div class="make-ques">
    <div class="title">
      <Button @click="makeQues" class="m-r-8">制作问卷</Button><Button @click="logicalSet">逻辑设置</Button>
      <Button type="primary" @click="exportQues" class="m-r-8" style="float:right">导出</Button>
      <Button type="primary" @click="preview" class="m-r-8" style="float:right">预览</Button>
    </div>
    <div class="content flex m-t-8">
      <div class="flex-1">
        <!--基础题型-->
        <div class="ques-type">
          <ul>
            <li>
              <div @dragstart="dragStart(arguments, 'radio')" draggable="true" @dblclick="quesTypeDbClick(arguments, 'radio')">
                <Icon type="md-radio-button-on" class="m-r-8"/>单选题
              </div>
            </li>
            <li>
              <div @dragstart="dragStart(arguments, 'checkbox')" draggable="true">
                <Icon type="md-checkbox" class="m-r-8"/>多选题
              </div>
            </li>
            <li>
              <div @dragstart="dragStart" draggable="true">
                <Icon type="md-arrow-dropdown-circle" />下拉框
              </div>
            </li>
            <li>
              <div @dragstart="dragStart" draggable="true">
                <Icon type="md-help" />问答题
              </div>
            </li>
          </ul>
        </div>
        <!--高级题型-->
        <div class="ques-type">

        </div>
      </div>
      <div class="flex-2 ques-type m-l-8" @drop="drop" @dragover.prevent>
        <Form :model="quesList[quesList.length-1]" ref="formData" :label-width="80" :rules="formRule" v-if="quesList.length">
          <template v-if="quesList[quesList.length-1].type =='radio'">
            <FormItem :label="'题目'+quesList.length+':'" prop="name" >
              <Input v-model="quesList[quesList.length-1].name" placeholder="请输入题目"></Input>
            </FormItem>
            <FormItem v-for="(option, key) in quesList[quesList.length-1].options" :key="key" :label="'选项'+(key+1)+':'">
              <Input v-model="option.name" placeholder="请输入选项"></Input>
            </FormItem>
            <!--<FormItem label="样本数量:" prop="price">-->
              <!--<Input v-model="formData.price" placeholder="请输入样本数量" :disabled="disabled"></Input>-->
            <!--</FormItem>-->
            <div class="text-center">
              <Button @click="handleAddOptions(quesList[quesList.length-1].options)" icon="md-add">添加选项</Button><Button type="primary" @click="handleSubmit" style="float:right">确定</Button><Button @click="cancel" style="float:right" class="m-r-8">取消</Button></div>
          </template>

        </Form>
      </div>
    </div>
    <!--已生成的题-->
    <div>
      <div v-for="(item, key) in quesList" :key="key">
      </div>
    </div>
    <div v-show="true">
      <div id="radio" class="m-8">
        <Radio :data="testList" value="id" label="name" @value-change="handleChange" class="ques-inline-block"></Radio><Icon type="md-close" class="ques-close-icon" @click.native="quesRemove"/>
      </div>
      <div id="checkbox" class="m-8">
        <CheckBox :data="testList" value="id" label="name" @value-change="handleChange" class="ques-inline-block"></CheckBox><Icon type="md-close" class="ques-close-icon"/>
      </div>
    </div>
  </div>
</template>
<script>
  import demoData from '../../../data/demo_data'
  import Radio from './question_type_components/radio.vue'
  import CheckBox from './question_type_components/checkbox.vue'
  export default {
    components: {
      Radio, CheckBox
    },
    created () {
      this.$emit('updateActive', '6-1')
    },
    data () {
      return {
        dragged: null, // 被拖拽元素
        queId: '', // 问卷id
        quesList: [],
        formRule: {},
        testList: demoData.role
      }
    },
    methods: {
      makeQues () {

      },
      logicalSet () {

      },
      exportQues () {

      },
      preview () {

      },
      dragStart (arg, type) {
          arg[0].dataTransfer.setData('Text', type)
      },
      drop (ev) {
        let id = ev.dataTransfer.getData('Text')
        let draged = document.getElementById(id).cloneNode(true)
        draged.lastChild.addEventListener('click', this.quesRemove)
        ev.target.appendChild(draged)
      },
      handleChange (arg) {
        console.log(arg)
      },
      quesRemove (event) {
        event.target.parentNode.remove()
//        let parentNode = event.target.parentNode.parentNode
//        parentNode.removeChild(event.target.parentNode)
      },
      quesTypeDbClick (arg, type) {
        console.log('quesTypeDbClick:', event)
        this.quesList.push({
          type: type,
          name: '', // 题目的标题
          options: [{name: ''}]
        })
        console.log(this.quesList)
      },
      handleAddOptions (list) {
        list.push({name: ''})
      },
      handleSubmit () {
      },
      cancel () {
      }
    }
  }
</script>
