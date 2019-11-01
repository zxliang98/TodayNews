<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <bread-path>内容管理</bread-path>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="searchInfo.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <get-channels v-model="searchInfo.channel_id"></get-channels>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="pubDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="selectDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchArticle">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total_count}} 条结果：</div>
      <el-table :data="articles" stripe style="width: 100%">
        <el-table-column label="封面" width="170px">
          <!-- <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>-->
          <template slot-scope="scope">
            <el-image
              fit="cover"
              :src="scope.row.cover.images[0]"
              style="width: 150px; height: 100px"
            >
              <div slot="error" class="image-slot">
                <img width="150" height="100" src="./../../assets/images/error.gif" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              @click="toEdit(scope.row.id)"
              plain
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              @click="delArticle(scope.row.id)"
              plain
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total_count"
        :page-size="searchInfo.per_page"
        :current-page="searchInfo.page"
        @current-change="selectPage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchInfo: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        per_page: 10,
        page: 1
      },
      channelOptions: [],
      pubDate: [],
      articles: [],
      total_count: 0
    }
  },
  methods: {
    // 获取文章
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.searchInfo })
      this.articles = data.results
      this.total_count = data.total_count
      // this.per_page = data.per_page
    },
    // 处理选择的日期
    selectDate () {
      // ;[
      //   this.searchInfo.begin_pubdate,
      //   this.searchInfo.end_pubdate
      // ] = this.pubDate
      if (this.pubDate) {
        this.searchInfo.begin_pubdate = this.pubDate[0]
        this.searchInfo.end_pubdate = this.pubDate[1]
      } else {
        this.searchInfo.begin_pubdate = null
        this.searchInfo.end_pubdate = null
      }
      // console.log(this.pubDate)
    },
    // 点击筛选文章
    searchArticle () {
      this.searchInfo.page = 1
      this.getArticles()
    },
    // 改变分页
    selectPage (currentPage) {
      this.searchInfo.page = currentPage
      this.getArticles()
    },
    // 点击去编辑
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除文章
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/articles/${id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getArticles()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  // 初始化
  created () {
    this.getArticles()
  }
}
</script>

<style>
</style>
