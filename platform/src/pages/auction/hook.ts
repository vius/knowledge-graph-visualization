import { reactive } from 'vue'

export const state: any = reactive({
  showNeo: false,
  showUpLayer: false,
  type: 1
})


export const confirmPostMessage = (query: string) => {
  state.showNeo = true
  state.showUpLayer = false
  const target: any = document.querySelector('#neo-iframe')
  target?.contentWindow.postMessage({
    query,
    type: 'set-query'
  }, "*")
}

export const showLabels = () => {
  state.showUpLayer = true
  state.type = 1
}


export const hiddenUpLayer = () => {
  state.showUpLayer = false
}

export const data2Vision = () => {
  state.showUpLayer = true
  state.type = 2
}

