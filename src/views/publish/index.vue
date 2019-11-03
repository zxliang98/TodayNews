<template>
  <div>
    <el-card>
      <div slot="header">
        <bread-path>发布文章</bread-path>
      </div>
      <div>
        <el-form :model="articleInfo" label-width="80px">
          <el-form-item label="标题：">
            <el-input v-model="articleInfo.title" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item class="richText" label="内容：">
            <quillEditor v-model="articleInfo.content" :options="editorOption"></quillEditor>
          </el-form-item>
          <el-form-item label="封面：">
            <el-radio-group style="display:block;margin:10px 0" v-model="articleInfo.cover.type">
              <el-radio :label="1">一张</el-radio>
              <el-radio :label="3">三张</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <select-cover v-model="articleInfo.cover.images[0]" v-if="articleInfo.cover.type===1"></select-cover>
            <select-cover v-model="articleInfo.cover.images[0]" v-if="articleInfo.cover.type===3"></select-cover>
            <select-cover v-model="articleInfo.cover.images[1]" v-if="articleInfo.cover.type===3"></select-cover>
            <select-cover v-model="articleInfo.cover.images[2]" v-if="articleInfo.cover.type===3"></select-cover>
          </el-form-item>
          <el-form-item label="频道：">
            <get-channels v-model="articleInfo.channel_id"></get-channels>
          </el-form-item>
          <el-form-item>
            <el-button @click="pubIt" type="primary">发布</el-button>
            <el-button @click="saveIt">存草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleInfo: {
        id: null,
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  methods: {
    async pubIt () {
      // await this.$http.post({
      //   path: `/articles`,
      //   data: this.articleInfo,
      //   query: { draft: false }
      // })
      await this.$http.post(`/articles`, this.articleInfo)
      this.$message.success('发表文章成功！')
      this.$router.push('/article')
    },
    async saveIt () {
      // await this.$http.post({
      //   path: `/articles`,
      //   data: this.articleInfo,
      //   query: { draft: true }
      // })
      await this.$http.post(`/articles?draft=true`, this.articleInfo)
      this.$message.success('存为草稿成功！')
    },
    async getInfo (id) {
      let {
        data: { data }
      } = await this.$http.get(`/articles/${id}`)
      this.articleInfo = data
    }
  },
  created () {
    if (JSON.stringify(this.$route.query) !== '{}') {
      // console.log(this.$route.query)
      this.getInfo(this.$route.query.id)
    }
  }
}
</script>

<style>
</style>
