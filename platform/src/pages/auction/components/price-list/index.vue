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
      <Button @click="checkImage" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">本体图查看</Button>
    </section>
    <section class="flex justify-between items-center">
      <Button @click="showLabels" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">图谱标签</Button>
      <Button @click="graphSummary" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">图谱统计</Button>
      <Button @click="data2Vision" class="w-24 h-8 bg-[#008FFF] rounded-[3px]">数据可视化</Button>
    </section>
  </section>
  <el-dialog v-model="state.imagePreview">
    <img :src="imageUrl" />
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Wlzc from '@/assets/wlzc.jpg'
import Sgqb from '@/assets/sgqb.jpg'
import Kyqb from '@/assets/kyqb.jpg'
import { showLabels, data2Vision, confirmPostMessage } from '../../hook'
const graphSummary = () => {
  const query = `MATCH (g:geo_org) WITH count(g) AS 组织机构
MATCH (n) WITH 组织机构, count(n) AS 网络空间要素
MATCH ()-[r]->() WITH 组织机构, 网络空间要素, count(r) AS 跨域关联关系
MATCH (c:country) WITH 组织机构, 网络空间要素, 跨域关联关系, count(c) AS 地区
MATCH (h:hy) RETURN 组织机构, 网络空间要素, 跨域关联关系, 地区, count(h) AS 行业;`
confirmPostMessage(query)
}
const state = reactive({
  type: "1",
  imagePreview: false,
})
const imageUrl = computed(() => {
  const { type } = state
  if (type === '1') {
    return Wlzc
  }
  if (type === '2') {
    return Kyqb
  }
  return Sgqb
})
const checkImage = () => {
  state.imagePreview = true
}
</script>

<style scoped>
tbody tr {
  background-image: url('@/assets/auction/table-border.png');
  background-size: 100% 100%;
  height: 32px;
}
</style>