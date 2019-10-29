<template>
  <div class="welcome">
    <img src="./../../assets/images/welcome.jpg" alt />
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('articles').then(res => {
      console.log(res)
    })
  }
}
</script>

<style>
.welcome img {
  width: 700px;
  display: block;
  margin: 0 auto;
}
</style>
