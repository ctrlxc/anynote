<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="" alt="any-picture">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ note.user }}</strong> <small>@any-name</small> <small>{{ note.createtime }}}</small>
          <br>
          {{ note.content }}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-reply"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-heart"></i></span>
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <button class="delete"></button>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

export interface INote {
  id: string
  content: string
  // pics: IPic[]
  createtime: Date
  user: string | null
}

// export interface IPic {
//   id: string
//   path: string
//   location: string
//   createtime: Date
// }

@Component
export default class Note extends Vue {
  @Prop({ type: Object, required: true }) readonly note!: INote
}
</script>
