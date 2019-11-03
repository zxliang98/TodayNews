<template>
  <div class="selectCover" :value="value">
    <div @click="open" class="default">
      <img :src="defaultImage" alt />
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="900px" center>
      <el-tabs v-model="selectMethod" type="card">
        <el-tab-pane label="选择图片" name="select">
          <!-- 搬运工 -->
          <div>
            <el-radio-group @change="getCollect" v-model="isCollect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <div class="img_list">
            <div
              @click="setClass(item.url)"
              class="img_item"
              v-for="item in imageList"
              :key="item.id"
              :class="{'collect':item.url===selectUrl}"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <div style="text-align:center;">
            <el-pagination
              @current-change="changeImg"
              background
              layout="prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane style="text-align:center" label="上传图片" name="upload">
          <!-- 搬运工 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="reqHeader"
            name="image"
            :on-success="uploadOK"
          >
            <img v-if="uploadUrl" :src="uploadUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCover">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/localuser'
import defaultImage from './../assets/images/default.png'
export default {
  name: 'select-cover',
  props: ['value'],
  data () {
    return {
      centerDialogVisible: false,
      selectMethod: 'select',
      isCollect: false,
      imageList: [],
      total: 0,
      searchImg: {
        collect: false,
        page: 1,
        per_page: 8
      },
      uploadUrl: '',
      selectUrl: '',
      reqHeader: { Authorization: `Bearer ${local.getUser().token}` },
      defaultImage
    }
  },
  methods: {
    open () {
      this.centerDialogVisible = true
      this.getImg()
    },
    getCollect () {
      this.searchImg.collect = this.isCollect
      this.searchImg.page = 1
      this.getImg()
    },
    async getImg () {
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.searchImg })
      this.imageList = data.results
      this.total = data.total_count
    },
    changeImg (current) {
      this.searchImg.page = current
      this.getImg()
    },
    uploadOK (response) {
      this.uploadUrl = response.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
      }, 2000)
      this.getImg()
    },
    setClass (url) {
      this.selectUrl = url
    },
    getCover () {
      if (this.selectMethod === 'select') {
        if (!this.selectUrl) {
          return this.$message.warning('请选择一张图片！')
        }
        this.defaultImage = this.selectUrl
        this.centerDialogVisible = false
        this.$emit('input', this.selectUrl)
      } else {
        if (!this.uploadUrl) {
          return this.$message.warning('请上传一张图片！')
        }
        this.defaultImage = this.uploadUrl
        this.centerDialogVisible = false
        this.$emit('input', this.uploadUrl)
      }
    }
  },
  created () {
    if (this.value) {
      this.defaultImage = this.value
    }
  }
}
</script>

<style lang="less" scoped>
.selectCover {
  float: left;
  margin-right: 20px;
}
.default {
  width: 200px;
  height: 200px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
  }
}
.img_list {
  margin-top: 20px;
  .img_item {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    position: relative;
    margin: 0 30px 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.collect::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url('./../assets/images/selected.png')
        no-repeat center / 30px 30px;
    }
  }
}
</style>
