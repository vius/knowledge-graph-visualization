<template>
  <section class="h-full w-full bg-[#111D34] overflow-auto flex flex-col justify-around p-4">
    <section class="flex justify-center items-center gap-2">
      <Tabs v-model="state.type">
        <TabsList class="grid tab-list w-full grid-cols-3 h-[28px] p-0 bg-[#11294A] rounded-[3px] border-0 hover:bg-[#11294A] hover:text-[#D0DEEE]">
          <TabsTrigger value="1" class="h-[28px] rounded-[3px] border-0 text-[13px]">
            网络资产
          </TabsTrigger>
          <TabsTrigger value="2" class="h-[28px] bg-transparent rounded-[3px] border-0 text-[13px]">
            开源情报
          </TabsTrigger>
          <TabsTrigger value="3" class="h-[28px] bg-transparent rounded-[3px] border-0 text-[13px]">
            社工情报
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Button @click="check" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">本体图查看</Button>
    </section>
    <section class="flex justify-between items-center">
      <Button @click="check" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">图谱标签</Button>
      <Button @click="check" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">图谱统计</Button>
      <Button @click="check" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">数据可视化</Button>
    </section>
  </section>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
const check = () => { }
const state = reactive({
  type: "1"
})
</script>

<style scoped>
tbody tr {
  background-image: url('@/assets/auction/table-border.png');
  background-size: 100% 100%;
  height: 32px;
}
</style>