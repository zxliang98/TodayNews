<template>
  <div>
    <el-card>
      <div slot="header">
        <bread-path>评论管理</bread-path>
      </div>
      <el-table :data="commentList" stripe style="width: 100%">
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评价数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评价数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag
              style="width:80px;text-align:center"
              v-if="scope.row.comment_status"
              type="success"
            >正常</el-tag>
            <el-tag style="width:80px;text-align:center" v-else type="danger">已关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="comment(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
            >关闭评论</el-button>
            <el-button @click="comment(scope.row)" v-else type="success">开启评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        @current-change="pager"
        background
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentInfo: {
        page: 1,
        per_page: 10,
        response_type: 'comment'
      },
      commentList: [],
      // title: null,
      // total_comment_count: null,
      // fans_comment_count: null,
      // comment_status: null
      total: 0
    }
  },
  methods: {
    async getComment () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.commentInfo })
      this.commentList = data.results
      this.total = data.total_count
    },
    pager (current) {
      this.commentInfo.page = current
      this.getComment()
    },
    async comment (row) {
      const {
        data: { data }
      } = await this.$http.put(`/comments/status?article_id=${row.id}`, {
        allow_comment: !row.comment_status
      })
      row.comment_status = data.allow_comment
      console.log(data)
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style lang="less" scoped>
</style>
