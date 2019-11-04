<template>
  <div>
    <el-card>
      <div slot="header">
        <bread-path>{{$route.query.id?'修改':'发布'}}文章</bread-path>
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
            <el-radio-group @change="radioChange" v-model="articleInfo.cover.type">
              <el-radio :label="1">一张</el-radio>
              <el-radio :label="3">三张</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <div v-if="articleInfo.cover.type===1">
              <select-cover v-model="articleInfo.cover.images[0]"></select-cover>
            </div>
            <div v-if="articleInfo.cover.type===3">
              <select-cover v-for="i in 3" :key="i" v-model="articleInfo.cover.images[i-1]"></select-cover>
            </div>
          </el-form-item>
          <el-form-item label="频道：">
            <get-channels v-model="articleInfo.channel_id"></get-channels>
          </el-form-item>
          <el-form-item v-if="$route.query.id">
            <el-button @click="saveIt(false)" type="primary">修改</el-button>
            <el-button @click="saveIt(true)">存草稿</el-button>
          </el-form-item>
          <el-form-item v-else>
            <el-button @click="pubIt(false)" type="primary">发布</el-button>
            <el-button @click="pubIt(true)">存草稿</el-button>
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
    async pubIt (draft) {
      await this.$http.post(`/articles?draft=${draft}`, this.articleInfo)
      this.$message.success(draft ? '存为草稿成功！' : '发布成功！！！')
      this.$router.push('/article')
    },
    async saveIt (draft) {
      await this.$http.put(
        `/articles/${this.articleInfo.id}?draft=${draft}`,
        this.articleInfo
      )
      this.$message.success(draft ? '存为草稿成功！' : '修改成功！！！')
      this.$router.push('/article')
    },
    async getInfo (id) {
      let {
        data: { data }
      } = await this.$http.get(`/articles/${id}`)
      this.articleInfo = data
    },
    radioChange () {
      this.articleInfo.cover.images = []
    }
  },
  created () {
    if (JSON.stringify(this.$route.query) !== '{}') {
      // console.log(this.$route.query)
      this.getInfo(this.$route.query.id)
    }
  },
  watch: {
    '$route.query.id' (newVal) {
      if (!newVal) {
        this.articleInfo = {
          id: null,
          title: '',
          content: '',
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  }
}
</script>

<style>
</style>
