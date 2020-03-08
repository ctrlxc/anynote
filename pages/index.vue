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

    <div class="">
      <note v-for="(item, key) of notes" :key="key" :note="item" />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { INote } from '~/components/Note.vue'
import { db, auth } from '~/plugins/firebase'

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
            createtime: doc.data().createtime,
            user: auth().currentUser?.uid || ''
            // user: db.doc(`users/${auth().currentUser.uid}`).ref
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
      createtime: new Date(),
      user: auth().currentUser?.uid || ''
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
