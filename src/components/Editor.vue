<template>
  <v-container>
    <div ref="editor"></div>
  </v-container>
</template>

<script>
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { commonmark } from '@milkdown/preset-commonmark'

export default {
  name: 'Editor',
  data () {
    return {}
  },
  mounted () {
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, this.$refs.editor)
        ctx.set(defaultValueCtx, '# Write your markdown here')
      })
      .use(nord)
      .use(commonmark)
      .create()
  }
}
</script>
