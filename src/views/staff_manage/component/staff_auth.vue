<style lang="less">
  .staff-auth{
    .title{
      height: 34px;
      line-height: 34px;
      background: #d7d7d7;
      text-align: center;
    }
    .role{
      border: 1px solid #ebebeb;
      padding-bottom: 16px;
      .role-add{
        float: right;
        line-height: 34px;
        font-size: 20px;
        margin-right: 16px;
      }
      .role-content{
        margin-top: 16px;
        .ivu-dropdown-menu{
          min-width: inherit;
        }
      }
    }
    .auth{
      border: 1px solid #ebebeb;
      margin-top: 8px;
      .auth-sub-title{
        background: #ebebeb;
        height: 34px;
        line-height: 34px;
        text-align: center;
      }
      .auth-menu{
        border-right: 1px solid #ebebeb;
      }
      .auth-auth{
        .check-all{
          border-bottom: 1px solid #e9e9e9;
          padding-bottom:8px;
          margin-bottom:8px;
        }
        .auth-btn{
          margin-top: 8px;
          border-top: 1px solid #e9e9e9;
          padding-top:8px;
          margin-bottom:16px;
          text-align: right;
        }
      }
    }
  }
  #authTree{
    height: 255px;
    overflow-y: auto;
  }
</style>
<template>
  <div class="staff-auth">
    <div class="role">
      <div class="title">
        角色
        <Icon type="md-add-circle" class="role-add" @click="handleRoleAdd"/>
      </div>
      <div class="role-content">
        <RadioGroup v-model="curRole" type="button">
          <Radio v-for="(role, key) in roleList" :label="role.id" :key="key">{{role.name}}<Dropdown placement="bottom-end" @on-click="handleRoleOpt(arguments, role)">
            <a href="javascript:void(0)">
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="1">修改</DropdownItem>
              <DropdownItem name="2">{{role.enable?'禁用':'启用'}}</DropdownItem>
              <DropdownItem name="3">删除</DropdownItem>
            </DropdownMenu>
          </Dropdown></Radio>
        </RadioGroup>
      </div>
    </div>
    <div class="auth">
      <div class="title">
        权限
      </div>
      <div class="flex">
        <div class="flex-1 auth-menu">
          <div class="auth-sub-title">菜单</div>
          <div id="authTree" class="ztree m-lr-16 m-b-16"></div>
        </div>
        <div class="flex-2">
          <div class="auth-sub-title">权限</div>
          <div class="auth-auth m-16">
            <div>
              <div class="check-all" v-show="authList.length">
                <!--@click.prevent.native="handleCheckAll"-->
                <Checkbox v-model="checkAll" @on-change = "handleCheckAll" size="large">全选</Checkbox>
              </div>
              <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" >
                <Checkbox v-for="(auth,key) in authList" :label="auth" :key="key" class="m-r-16" size="large">{{auth}}</Checkbox>
              </CheckboxGroup>
            </div>
            <div class="auth-btn" v-show="authList.length">
              <Button type="primary" @click="handleSubmit" :loading="btnLoading">确定</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AuthForm ref="AuthForm" @success="getList"></AuthForm>
  </div>
</template>
<script>
  import RoleHttp from 'server/http/role'
  import AuthForm from './auth_form.vue'
  import ztree from '@/mixins/ztree'
  import demoData from '../../../data/demo_data.js'
  export default {
    mixins: [ ztree ],
    components: {
      AuthForm
    },
    data () {
      return {
        curRole: '',
        roleList: [],
        checkAll: false,
        checkAllGroup: [],
        authList: [],
        zTreeObj: null,
        btnLoading: false,
        setting: {
          treeId: 'org',
          data: {
            key: {
              name: 'title'
            }
          },
          check: {
            enable: true,
            chkboxType: { 'Y': 'p', 'N': 's' }
          },
          callback: {
            onClick: this.zTreeOnClick
          },
          view: {
            showIcon: false,
            selectedMulti: false
          }
        } // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
      }
    },
    mounted () {
      this.getList()
      this.initTree()
    },
    methods: {
      getList () {
        RoleHttp.getList()
          .then(data => {
            this.roleList = data
          })
          .catch(error => {
            console.warn('角色列表失败：', error)
          })
      },
      handleSubmit () {
        // 保存权限设置
      },
      handleRoleAdd () {
        this.$refs['AuthForm'].open()
      },
      handleRoleOpt (arg, role) {
        if (arg[0] === '1') {
          // 修改
          this.$refs['AuthForm'].open(role.id)
        } else if (arg[0] === '2') {
          // 启用/禁用
          RoleHttp.enable(role.id, role.enable ? 0 : 1)
            .then(data => {
              this.$Message.success('设置成功')
              this.getList()
            })
            .catch(error => {
              this.$Message.warning('设置失败')
              console.warn('设置角色失败:', error)
            })
        } else if (arg[0] === '3') {
          // 删除
          RoleHttp.del(role.id)
          this.getList()
        }
      },
      initTree () {
        if (demoData.menuData && demoData.menuData.length) {
          this.addAuthForMenu(demoData.menuData)
        }
        this.zTreeObj = this.zTreeInit(this.$('#authTree'), this.setting, demoData.menuData)
        this.zTreeObj.expandAll(true)
      },
      handleCheckAll (flag) {
        if (flag) {
          this.checkAllGroup = this.authList
        } else {
          this.checkAllGroup = []
        }
      },
      checkAllGroupChange (selList) {
        if (selList.length !== this.authList.length || !this.authList.length) {
          this.checkAll = false
        } else {
          this.checkAll = true
        }
      },
      addAuthForMenu (list) {
        list.forEach(menu => {
          if (!menu.children || !menu.children.length) {
            menu.auth = ['新增', '修改', '删除']
          } else {
            this.addAuthForMenu(menu.children)
          }
        })
      },
      zTreeOnClick (event, treeId, treeNode) {
        this.authList = treeNode.auth
      }
    }
  }
</script>
