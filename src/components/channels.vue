<template>
  <el-select :value="value" placeholder="请选择" clearable @change="giveOut">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'get-channels',
  data () {
    return {
      channelOptions: []
    }
  },
  props: ['value'],
  methods: {
    async getChannels () {
      const {
        data: { data }
      } = await this.$http.get('/channels')
      this.channelOptions = data.channels
    },
    giveOut (value) {
      this.$emit('input', value === '' ? null : value)
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
