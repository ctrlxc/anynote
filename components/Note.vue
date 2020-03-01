<template>
  <div class="column">
    {{ note }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

export interface INote {
  id: string
  content: string
  // pics: IPic[]
  createtime: Date
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
