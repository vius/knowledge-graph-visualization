<template>
  <section class="w-full h-[100vh] min-h-[779px] flex flex-col overflow-hidden auction-container">
    <section class="text-white h-16 flex justify-between items-center px-4 py-2 header">
      <span class="text-white text-opacity-85 text-lg min-w-48">{{ dayjs().format('YYYY年M月D日') }} 星期{{ ['日', '一', '二', '三', '四', '五', '六'][dayjs().day()] }}</span>
      <span class="font-bold text-2xl flex-1 text-center title">网络空间多要素知识图谱可视化大屏</span>
      <section class="min-w-48 flex justify-end">
        <ExitFullScreenIcon v-if="isFullscreen" @click="fullScreen" class="w-6 h-6 cursor-pointer" />
        <EnterFullScreenIcon v-else @click="fullScreen" class="w-6 h-6 cursor-pointer" />
      </section>
    </section>
    <section class="flex-1 px-3 py-3 flex flex-col overflow-hidden">
      <section class="w-full h-full flex-1 grid grid-rows-12 grid-cols-24 gap-1">
        <BlockItem class="row-span-3 col-span-7">
          <template #header>
            <img src="@/assets/auction/Frame1.png" alt="">
            <p>知识图谱管理</p>
          </template>
          <Config></Config>
        </BlockItem>
        <Agents class="row-span-12 col-span-17"></Agents>
        <BlockItem class="row-span-3 col-span-7">
          <template #header>
            <img src="@/assets/auction/Frame2.png" alt="">
            <p>知识图谱信息</p>
          </template>
          <PriceList></PriceList>
        </BlockItem>
        <BlockItem class="row-span-3 col-span-7">
          <template #header>
            <img src="@/assets/auction/Frame3.png" alt="">
            <p>跨域关联分析</p>
          </template>
          <Bidders></Bidders>
        </BlockItem>
        <BlockItem class="row-span-2 col-span-7">
          <template #header>
            <img src="@/assets/auction/Frame4.png" alt="">
            <p>历史/预测显示</p>
          </template>
          <Availability></Availability>
        </BlockItem>
        <section class="row-span-1 col-span-7 text-white text-opacity-85 text-[21px] font-bold flex pl-3 items-center">
          国防科技大学&中国科学技术大学
        </section>
      </section>
    </section>
  </section>
</template>
<script setup lang="ts">
import { EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-icons/vue'
import { useFullscreen } from '@vueuse/core'
import dayjs from 'dayjs'
import BlockItem from './block.vue'
import Agents from './components/agents/index.vue'
import Availability from './components/availability/index.vue'
import Bidders from './components/bidders/index.vue'
import Config from './components/config/index.vue'
import PriceList from './components/price-list/index.vue'

const { isFullscreen, enter, exit } = useFullscreen()
const fullScreen = () => {
  if (isFullscreen.value) {
    exit()
  } else {
    enter()
  }
}
</script>
<style scoped lang="less">
.auction-container {
  background-image: url('@/assets/auction/bg.png');
  background-size: 100% 100%;
  background-color: rgb(24, 33, 51);

  ::-webkit-scrollbar {
    width: 3px;
    /* 滚动条宽度 */
    overflow: overlay;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    /* 滚动条轨道的背景色 */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #0A436C;
    /* 滚动条的颜色 */
    border-radius: 10px;
    /* 滚动条圆角 */
  }
}

.header {
  background-image: url('@/assets/auction/header-bg.png');
  background-size: 100% 100%;
}

.header .title {
  background-clip: text;
  color: transparent;
  /* background-image: linear-gradient(rgba(255, 255, 255, 1), rgba(88, 131, 255, 1)); */
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(88, 131, 255, 1) 150%);
}
.agentHidden{
  visibility: hidden;
}
</style>