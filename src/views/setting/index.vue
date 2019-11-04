<template>
  <el-card>
    <div slot="header">
      <bread-path>个人设置</bread-path>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="userInfo" label-width="120px">
            <el-form-item label="编号：">1</el-form-item>
            <el-form-item label="手机号：">11111111111111111111</el-form-item>
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
              <el-button type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light" style="margin-top:50px;text-align:center">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p>上传头像</p>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      imageUrl: ''
    }
  }
}
</script>

<style>
</style>
