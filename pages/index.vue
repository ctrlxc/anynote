<template>
  <section class="section">
    <div class="columns">
      <div class="column is-four-fifths">
        <b-field label="Note">
          <b-input v-model="newContent" maxlength="200" type="textarea" />
        </b-field>
      </div>
      <div class="column" style="margin-top: auto; margin-bottom: 20px">
        <b-button type="is-success" @click="save">
          Save
        </b-button>
      </div>
    </div>
    <h1>Notes Index</h1>
    <ul>
      <li v-for="(item, key) of notes" :key="key">
        {{ key }}
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { INote } from '~/components/Note.vue'
import { db } from '~/plugins/firebase'

@Component({
  components: {
    Note: () => import('~/components/Note.vue')
  }
})
export default class Index extends Vue {
  newContent: string = ''
  notes_: INote[] = []

  get notes () {
    if (this.notes_.length > 0) {
      return this.notes_
    }

    db.collection('notes')
      .orderBy('createtime', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.notes_.push({
            id: doc.id,
            content: doc.data().content,
            createtime: doc.data().createtime
          })
        })
      })

    return this.notes_
  }

  save () {
    if (!this.newContent) {
      return
    }

    const note = {
      content: this.newContent,
      createtime: new Date()
    }

    db.collection('notes').add(note)
      .then((doc) => {
        this.notes_.unshift({
          id: doc.id,
          ...note
        })
      })

    this.newContent = ''
  }
}
</script>
