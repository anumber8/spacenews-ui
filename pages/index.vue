<template>
  <div>
    <p v-if="error">Sorry, an error has occurred.</p>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <a href="">{{ post.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    try {
      const response = await app.$axios.get('/api/posts/')
      return {
        posts: response.data.results,
        error: false
      }
    } catch (e) {
      console.log('error', e)
      return {
        posts: [],
        error: true
      }
    }
  }
}

</script>

<style>

</style>
