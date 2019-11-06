<template>
  <el-card>
    <div slot="header">
      <bread-path>个人设置</bread-path>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="userInfo" label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机号：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input rows="3" type="textarea" v-model="userInfo.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUser">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="margin-top:50px;text-align:center">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :http-request="savePhoto"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>上传头像</p>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import local from './../../utils/localuser'
import eventBus from './../../utils/eventBus'
export default {
  data () {
    return {
      userInfo: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('/user/profile')
      this.userInfo = data
    },
    saveUser () {
      this.saveInfo()
      // this.savePhoto()
      this.$message.success('成功')
    },
    async saveInfo () {
      let {
        data: { data }
      } = await this.$http.patch('/user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })

      let user = local.getUser()
      user.name = data.name
      local.setUser(user)

      eventBus.$emit('giveName', data.name)
    },
    async savePhoto (item) {
      console.log(item)

      let photo = item.file
      let fd = new FormData()
      fd.append('photo', photo)

      let {
        data: { data }
      } = await this.$http.patch('/user/photo', fd)

      this.userInfo.photo = data.photo

      let user = local.getUser()
      user.photo = data.photo
      local.setUser(user)

      eventBus.$emit('givePhoto', data.photo)
    }
  }
}
</script>

<style>
</style>
