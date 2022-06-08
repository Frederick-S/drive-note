import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDriveItem: null
  },
  mutations: {
    setSelectedDriveItem (state, driveItem) {
      state.selectedDriveItem = driveItem
    },
    setSelectedDriveItemContent (state, content) {
      if (state.selectedDriveItem) {
        state.selectedDriveItem.content = content
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
