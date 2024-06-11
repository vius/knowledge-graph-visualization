<template>
  <section class="h-full w-full bg-[#111D34] overflow-auto flex flex-col justify-around px-2 py-4">
    <section class="flex justify-between items-center">
      <span class="mr-4 min-w-10 text-sm">按类型</span>
      <section class="flex flex-1 justify-between items-center gap-2 px-2">
        <Tabs v-model="state.type">
          <TabsList class="grid tab-list w-full grid-cols-3 h-[28px] p-0 bg-[#11294A] rounded-[3px] border-0 hover:bg-[#11294A] hover:text-[#D0DEEE]">
            <TabsTrigger :value="1" class="h-[28px] rounded-[3px] border-0 text-[13px]">
              设备信息
            </TabsTrigger>
            <TabsTrigger :value="2" class="h-[28px] bg-transparent rounded-[3px] border-0 text-[13px]">
              文档
            </TabsTrigger>
            <TabsTrigger :value="3" class="h-[28px] bg-transparent rounded-[3px] border-0 text-[13px]">
              邮箱
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button @click="check(state.type)" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">查询</Button>
      </section>
    </section>
    <section class="flex justify-between items-center">
      <span class="mr-4 min-w-10 text-sm">按层级</span>
      <section class="flex justify-between items-center flex-1  px-2">
        <Button @click="check(4)" class="w-[70px] h-8 bg-[#008FFF] rounded-[3px]">用户层</Button>
        <Button @click="check(5)" class="w-[70px] h-8 bg-[#008FFF] rounded-[3px]">网络层</Button>
        <Button @click="check(6)" class="w-[70px] h-8 bg-[#008FFF] rounded-[3px]">地理层</Button>
        <Button @click="check(7)" class="w-[70px] h-8 bg-[#008FFF] rounded-[3px]">物理层</Button>
      </section>
    </section>
  </section>
  <SearchDialog v-if="dialog.show" :title="dialog.title" :query="dialog.query" @close="dialog.show = false"></SearchDialog>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { reactive } from 'vue';
import SearchDialog from '../search-dialog/index.vue'
import { confirmPostMessage } from '../../hook'

const dataArray = [{
  title: '资产类要素',
  query: 'MATCH (a:device)-[r]-(b:os) RETURN a, r, b limit 25'
}, {
  title: '内容类要素',
  query: `MATCH (a:title)-[r]-(b) WHERE a.value CONTAINS 'html' and size(a.value) > 100 RETURN a, r, b LIMIT 50`
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
const state: any = reactive({
  type: 1
})


const check = (index = 1) => {
  const data = dataArray[index - 1]
  const query = data.query
  confirmPostMessage(query)
}
</script>