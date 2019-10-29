<template>
  <div>
    <el-container class="bigIndex">
      <el-aside class="leftAside" :width="isCollapse?'64px':'200px'">
        <el-col style="height:100%;">
          <el-menu
            style="border:0 none;"
            default-active="/"
            class="el-menu-vertical-demo"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <div class="logoIndex" :class="{collapseLogo:isCollapse}"></div>
            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/article">
              <i class="el-icon-document"></i>
              <span slot="title">内容管理</span>
            </el-menu-item>
            <el-menu-item index="/images">
              <i class="el-icon-picture-outline"></i>
              <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="/publish">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="/comment">
              <i class="el-icon-chat-dot-round"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/fans">
              <i class="el-icon-present"></i>
              <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="/setting">
              <i class="el-icon-setting"></i>
              <span slot="title">个人设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header class="topAside">
          <span
            @click="collapse"
            class="close"
            :class="[{'el-icon-s-fold':!isCollapse},{'el-icon-s-unfold':isCollapse}]"
          ></span>
          <span class="head">江苏传智播客科技教育有限公司</span>
          <el-dropdown class="icon_log" @command="dropdowmClivk">
            <span class="el-dropdown-link">
              <img class="user_icon" :src="userInfo.photo" alt />
              {{userInfo.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu class slot="dropdown">
              <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout" icon="el-icon-unlock">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import localUser from './../../utils/localuser'
export default {
  data () {
    return {
      isCollapse: false,
      userInfo: {
        name: '',
        photo: ''
      }
    }
  },
  methods: {
    collapse () {
      this.isCollapse = !this.isCollapse
    },
    dropdowmClivk (command) {
      switch (command) {
        case 'setting':
          this.$router.push('/setting')
          break
        case 'logout':
          localUser.remUser()
          this.$router.push('/login')
          break
      }
    }
  },
  created () {
    let user = localUser.getUser() || {}
    this.userInfo = user
  }
}
</script>

<style scoped lang='less'>
.bigIndex {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .leftAside {
    // width: 200px;
    background-color: #002033;
    .logoIndex {
      height: 60px;
      background: #002244 url('./../../assets/images/logo_admin.png') no-repeat
        center / 140px auto;
    }
    .collapseLogo {
      background: #002244 url('./../../assets/images/logo_admin_01.png')
        no-repeat center / 40px auto;
    }
  }
  .topAside {
    height: 60px;
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .close {
      font-size: 30px;
      vertical-align: middle;
    }
    .head {
      font-size: 20px;
      margin-left: 10px;
    }
    .icon_log {
      float: right;
      .user_icon {
        vertical-align: middle;
        width: 30px;
      }
    }
  }
}
</style>
