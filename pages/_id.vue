<template>
  <section class="section">
    {{ note }}
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { INote } from '~/components/Note.vue'
import { db } from '~/plugins/firebase'

@Component({
  components: {
    Note: () => import('~/components/Note.vue')
  },
  validate ({ params }: any): boolean {
    return /^.+$/.test(params.id)
  }
})
export default class NotesId extends Vue {
  note: INote = {
    id: '',
    content: '',
    createtime: new Date()
  }

  get getNote (): any {
    return db.collection('notes').doc(this.$route.params.id).get()
      .then((one) => {
        this.note.id = one.id
        this.note.content = one.data()?.content
        this.note.createtime = one.data()?.createtime
      })
  }
}
</script>
