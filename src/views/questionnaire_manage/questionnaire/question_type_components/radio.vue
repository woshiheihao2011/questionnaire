<style></style>
<template>
  <div>
    <RadioGroup  @on-change="handleChange">
      <Radio v-for="(item, key) in data" :label="item[value]" :key="key">{{item[label]}}</Radio>
    </RadioGroup>
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
    methods: {
      handleChange (value) {
        this.$emit('value-change', value)
      }
    }
  }
</script>
