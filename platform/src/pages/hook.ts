import { getDataSetList } from '@/api'
import { reactive } from 'vue'

export const state: any = reactive({
  list: []
})

export const getDataList = async () => {
  const { data = {} } = await getDataSetList()
  state.list = data.list || []
}
