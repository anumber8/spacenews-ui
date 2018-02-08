<template>
  <div v-show="!deleted">
  <b-card>
    <h6 v-if="post.url"><a :href="post.url">{{ post.title }}</a></h6>
    <h6 v-if="!post.url"><nuxt-link to="/">{{ post.title }}</nuxt-link></h6>
    <p>
      Posted by [ <nuxt-link to="/">{{ post.author.username }}</nuxt-link> ] on {{ post.created }}
    </p>
    <p v-if="$auth.state.loggedIn">
      [ <nuxt-link :to="`/posts/${post.id}`">Discuss</nuxt-link> ]
      [ <nuxt-link to="/">Edit</nuxt-link> ]
      [ <b-btn variant="link" class="p-0" v-b-modal="modalId">Delete</b-btn> ]
    </p>
  </b-card>
  <b-modal :id="modalId" title="Delete Post" @ok="deletePost">
    <p>Are you sure you want to delete this post? All comments will be deleted too!</p>
  </b-modal>
</div>
</template>


<script>
export default {
  props: ['post'],
  data () {
    return {
      deleted: false,
      modalId: `deleteConfirm-${this.post.id}`
    }
  },
  methods: {
    deletePost () {
      this.$axios.delete(`/api/posts/${this.post.id}/`)
      this.deleted = true
      this.$toast.success('Post deleted')
    }
  }
}
</script>
