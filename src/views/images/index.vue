<template>
  <el-card>
    <div slot="header">
      <bread-path>素材管理</bread-path>
    </div>
    <div>
      <el-radio-group @change="getCollect" v-model="isCollect">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button @click="dialogVisible = true" style="float:right" type="primary" plain>添加素材</el-button>
    </div>
    <div class="img_list">
      <div class="img_item" v-for="item in imageList" :key="item.id">
        <img :src="item.url" alt />
        <div class="img_footer" v-show="!isCollect">
          <span
            @click="collectIt(item)"
            :class="[{'red':item.is_collected},{'el-icon-star-on':item.is_collected},{'el-icon-star-off':!item.is_collected}]"
          ></span>
          <span @click="delIt(item.id)" class="el-icon-delete"></span>
        </div>
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
    <el-dialog
      @closed="clearImg"
      title="添加素材"
      :visible.sync="dialogVisible"
      width="30%"
      style="text-align:center"
    >
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="reqHeader"
        name="image"
        :on-success="uploadOK"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </el-card>
</template>

<script>
import local from './../../utils/localuser'
export default {
  data () {
    // isCollect是绑定的单选按钮，查看的全部 或 收藏
    return {
      searchImg: {
        collect: false,
        page: 1,
        per_page: 10
      },
      isCollect: false,
      imageList: [],
      total: 0,
      dialogVisible: false,
      imageUrl: '',
      reqHeader: { Authorization: `Bearer ${local.getUser().token}` }
    }
  },
  methods: {
    async collectIt (item) {
      const {
        data: { data }
      } = await this.$http.put(`/user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
      this.$message.success(item.is_collected ? '收藏成功' : '取消收藏成功')
      // this.getImg()
    },
    delIt (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/user/images/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getImg()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getCollect () {
      this.searchImg.collect = this.isCollect
      this.searchImg.page = 1
      this.getImg()
    },
    changeImg (current) {
      this.searchImg.page = current
      this.getImg()
    },
    async getImg () {
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.searchImg })
      this.imageList = data.results
      this.total = data.total_count
    },
    uploadOK (response) {
      this.imageUrl = response.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
      }, 2000)
      this.getImg()
    },
    clearImg () {
      this.imageUrl = ''
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.img_list {
  margin-top: 20px;
  .img_item {
    display: inline-block;
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    margin: 0 50px 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .img_footer {
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        line-height: 25px;
        font-size: 18px;
        margin: 0 20px;
        color: #fff;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
