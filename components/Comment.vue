<template>
  <b-card class="mt-4">
    <p>{{ comment.content }}</p>
    <p>
      Posted by [ <nuxt-link to="/">{{ comment.author.username }}</nuxt-link> ] {{ ago }}
    </p>
    <comment v-for="comment in comment.comments" 
             :comment="comment"
             :key="comment.id" 
             :style="style" 
             :depth="depth + 10">
    </comment>
  </b-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'comment',
  props: ['comment', 'depth'],
  data () {
    return {
      style: {
        paddingLeft: this.depth * 10
      },
      ago: moment(this.comment.created).fromNow()
    }
  }
}
</script>
