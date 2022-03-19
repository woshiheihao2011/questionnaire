<style></style>
<template>
  <div>
    <CheckboxGroup v-model="selValue" @on-change="handleChange">
      <Checkbox v-for="(item, key) in data" :label="item[value]" :key="key">{{item[label]}}</Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      },
      value: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        selValue: []
      }
    },
    methods: {
      handleChange (value) {
        this.$emit('value-change', value, this.selValue)
      }
    }
  }
</script>
