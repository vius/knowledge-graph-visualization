<template>
  <section class="h-full w-full bg-[#111D34] overflow-auto flex flex-col justify-around px-2 py-4">
    <section class="flex justify-between items-center">
      <span class="mr-2 min-w-10 text-sm">按类型</span>
      <section class="flex flex-1 justify-between items-center px-2">
        <Button @click="check(1)" class="w-20 h-8 bg-[#008FFF] rounded-[3px]">资产类要素</Button>
        <Button @click="check(2)" class="w-20 h-8 bg-[#008FFF] rounded-[3px]">内容类要素</Button>
        <Button @click="check(3)" class="w-20 h-8 bg-[rgb(0,143,255)] rounded-[3px]">社工类要素</Button>
      </section>
    </section>
    <section class="flex justify-between items-center">
      <span class="mr-2 min-w-10 text-sm">按层级</span>
      <section class="flex justify-between items-center flex-1  px-2">
        <Button @click="check(4)" class="w-16 h-8 bg-[#008FFF] rounded-[3px]">用户层</Button>
        <Button @click="check(5)" class="w-16 h-8 bg-[#008FFF] rounded-[3px]">网络层</Button>
        <Button @click="check(6)" class="w-16 h-8 bg-[#008FFF] rounded-[3px]">地理层</Button>
        <Button @click="check(7)" class="w-16 h-8 bg-[#008FFF] rounded-[3px]">物理层</Button>
      </section>
    </section>
  </section>
  <SearchDialog v-if="dialog.show" :title="dialog.title" :query="dialog.query" @close="dialog.show = false"></SearchDialog>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { reactive } from 'vue';
import SearchDialog from '../search-dialog/index.vue'
const dataArray = [{
  title: '资产类要素',
  query: 'MATCH (a:device)-[r]-(b:os) RETURN a, r, b limit 25'
}, {
  title: '内容类要素',
  query: 'MATCH (a:title)-[r]-(b) WHERE size(a.value) > 100 RETURN a, r, b LIMIT 25'
}, {
  title: '社工类要素',
  query: `MATCH (a:id)-[r]-(b) WHERE 'email' IN labels(b) OR 'qq' IN labels(b) RETURN a, r, b LIMIT 25`
},
{
  title: '用户层',
  query: 'MATCH (a:id)-[r]-(b) RETURN a, r, b LIMIT 25'
}, {
  title: '网络层',
  query: 'MATCH (a:ip)-[r]-(b) RETURN a, r, b LIMIT 50'
}, {
  title: '地理层',
  query: 'MATCH (a)-[r]-(b:geo_city) RETURN a, r, b LIMIT 25'
}, {
  title: '物理层',
  query: 'MATCH (a)-[r]-(b:device) WHERE b.value="router" RETURN a, r, b LIMIT 25'
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