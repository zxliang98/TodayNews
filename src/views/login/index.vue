<template>
  <div class="login_bg">
    <el-card class="login_card">
      <img src="./../../assets/images/logo_index.png" alt />
      <!-- <el-form :model="form"> -->
      <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
        <el-form-item prop="phoneNum">
          <el-input v-model="loginForm.phoneNum" placeholder="请输入你的手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true" label="已阅读协议" name="type"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="login('loginForm')" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import localUser from './../../utils/localuser.js'
export default {
  data () {
    const phoneNumCheck = function (rule, value, callback) {
      if (
        // !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
        !/^1[3-9]\d{9}$/.test(value)
      ) {
        return callback(new Error('手机号格式错误！'))
      } else {
        return callback()
      }
    }
    return {
      loginForm: {
        phoneNum: '13233334444',
        code: '246810'
      },
      rules: {
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneNumCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (loginForm) {
      // console.log(this.$refs[loginForm])

      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.$http
            .post('/authorizations', {
              mobile: this.loginForm.phoneNum,
              code: this.loginForm.code
            })
            .then(res => {
              if (res.status === 201) {
                // console.log(res)
                // 用户登录时设置一个token
                localUser.setUser(res.data.data)
                this.$router.push('/')
              }
            })
        } else {
          console.log('error submit!!')
          this.$message.error('手机号或验证码错误！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.login_bg {
  width: 100%;
  height: 100%;
  /* background-color: #fcc; */
  background: url('../../assets/images/login_bg.jpg') no-repeat center/cover;
  position: absolute;
  left: 0;
  top: 0;
  .login_card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      display: block;
      width: 250px;
      margin: 0 auto 30px;
    }
  }
}
</style>
