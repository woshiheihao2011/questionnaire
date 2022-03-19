const PATTERN = {
  justNum: /^([1-9]\d*|[0]{1,1})$/, // 正整数  ，不能为小数
  imagePattern: /^.*[^a][^b][^c]\.(?:png|jpg|bmp|gif|jpeg)$/,
  number: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/, // 大于零的数 包括小数
  email: /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+[.])+[a-zA-Z]{2,3}$/, // 邮箱验证规则
  username: /^([a-zA-Z]|[0-9]|[-._]){1,20}$/, // 用户名验证规则
  phone: /^1[3456789]\d{9}$/, // 手机号验证规则
  financialNo: /^[0-9a-zA-Z#*._\-@\u4E00-\u9FFF]+$/ // 财务资产编号的验证规则
}

export default PATTERN
