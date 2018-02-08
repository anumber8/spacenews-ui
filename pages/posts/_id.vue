<template>
  <div>
    <h3>{{ post.title }}</h3>
    <b-form v-if="$auth.state.loggedIn" @submit.prevent="submitComment" novalidate>
      <b-form-group
        :invalid-feedback="errors.first('content')"
        :state="!errors.has('content')">
        <b-form-textarea
          name="content"
          v-model="form.content"
          placeholder="Add your comment"
          rows="8"
          class="mb-3"
          v-validate="'required'"></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit comment</b-button>
    </b-form>
    <p v-if="post.description">{{ post.description }}</p>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData ({ app, params }) {

    //TBD handle 404 gracefully

    let response = await app.$axios.get(`/api/posts/${params.id}/`)
    const post = response.data

    response = await app.$axios.get(`/api/posts/${params.id}/comments/`)
    // TBD: re-arrange comments into tree structure
    const comments = response.data

    return {
      post,
      comments
    }

  },
  data() {
    return {
      form: {
        content: ''
      }
    }
  },
  methods: {
    async submitComment () {

      await this.$validator.validateAll()

      if (this.errors.any()) {
        return
      }

      // handle 400 etc...
      const response = await this.$axios.post(`/api/posts/${this.post.id}/add_comment/`, this.form)

      this.comments.splice(0, 0, response.data)
      this.$validator.reset()
      this.form.comment = ''
    }
  }
}
</script>
