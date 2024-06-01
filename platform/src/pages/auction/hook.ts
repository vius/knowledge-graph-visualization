import { reactive } from 'vue'

export const state: any = reactive({
  showNeo: false,
})


export const confirmPostMessage = (query: string) => {
  state.showNeo = true
  const target: any = document.querySelector('#neo-iframe')
  target?.contentWindow.postMessage({
    query,
    type: 'set-query'
  }, "*")
}
