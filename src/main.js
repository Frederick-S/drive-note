import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import VueMarkdownEditor from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import hljs from 'highlight.js'
import Codemirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/lib/codemirror.css'

Vue.config.productionTip = false

VueMarkdownEditor.Codemirror = Codemirror
VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs
})

Vue.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 2000
})
Vue.use(VueMarkdownEditor)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
