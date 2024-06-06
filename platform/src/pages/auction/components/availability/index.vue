<template>
  <section class="h-full w-full bg-[#111D34] overflow-auto flex justify-around p-4 items-center">
    <Button @click="check(1)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">历史信息</Button>
    <Button @click="check(2)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">预测信息</Button>
  </section>
  <SearchDialog v-if="dialog.show" :title="dialog.title" :query="dialog.query" @close="dialog.show = false"></SearchDialog>

</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { reactive } from 'vue';
import SearchDialog from '../search-dialog/index.vue'
const dataArray = [{
  title: '历史信息',
  query: 'MATCH (a)-[r]-(b) WHERE r.tuid <> "prediction" RETURN a, r, b LIMIT 25'
}, {
  title: '预测信息',
  query: 'MATCH (a:geo_org)-[r]-(b) WHERE r.tuid = "prediction" RETURN a, r, b LIMIT 25'
}]
const dialog: any = reactive({
  title: '',
  query: '',
  show: false
})

const check = (index = 1) => {
  dialog.show = true
  const data = dataArray[index - 1]
  dialog.title = data.title
  dialog.query = data.query
}
</script>