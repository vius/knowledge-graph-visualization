<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-icons/vue'
import {
DropdownMenuArrow,
} from 'radix-vue'

import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { logoutAction, state } from '@/hooks/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const logAction = () => {
  router.push({
    path: '/login'
  })
}
const signupAction = () => {
  router.push({
    path: '/signup'
  })
}
const go2MockAuction = () => {
  window.open(`${location.origin}/#/agent-auction`)
}
</script>

<template>
  <section class="h-16 w-full flex items-center justify-between pl-4 pr-4 bg-white left-0 right-0 fixed z-[1000]">
    <section class="flex items-center">
      <img alt="logo" src="@/assets/logo-1.png" class="h-8 mr-2" />
      <span class="ml-2 font-bold text-[20px] text-black text-opacity-90">数据要素交易平台</span>
      <!-- <span class="ml-2 font-bold text-[20px] text-black text-opacity-90">tailwindcss demo</span> -->
    </section>
    <ul class="flex flex-wrap -mb-px flex-1 ml-24 h-full">
      <li class="me-2 cursor-pointer mx-5">
        <span class="flex items-center h-full text-blue-600 border-b-[3px] border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">挂牌大厅</span>
      </li>
      <li class="me-2 cursor-pointer flex items-center mx-5" @click="go2MockAuction">
        <span class="flex items-center h-full rounded-t-lg border-b-[3px] border-transparent active" aria-current="page">模拟拍卖</span>
      </li>
    </ul>
    <section class="flex items-center">
      <template v-if="!state.hasLogin">
        <Button variant="ghost" aria-haspopup="dialog" aria-expanded="false" data-state="closed" @click="logAction">登录</Button>
        <Separator orientation="vertical" class="h-4 mx-1" />
        <Button variant="ghost" aria-haspopup="dialog" aria-expanded="false" data-state="closed" @click="signupAction">注册</Button>
      </template>
      <DropdownMenu v-else>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost">
            {{ state.user.username }}
            <HamburgerMenuIcon class="ml-1"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="z-[5000]">
          <DropdownMenuItem>
            <span @click="logoutAction">退出登录</span>
          </DropdownMenuItem>
          <DropdownMenuArrow class="fill-white"/>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  </section>
  <section class="w-full mt-16 mb-6 main-container flex">
    <router-view />
  </section>
  <section class="flex flex-col w-full items-center bg-primary bg-opacity-90">
    <section class="w-[1000px] xl:w-[1160px] 2xl:w-[1400px] 3xl:w-[1600px] py-8 text-white text-opacity-95">
      <div class="flex flex-row">
        <img src="@/assets/logo-2.png" alt=""  class="w-16 h-16"/>
        <section class="ml-6 leading-8">
          <p>办公电话：0551-65361800</p>
          <p>地址：安徽省合肥市高新区创新大道288号</p>
        </section>
      </div>
      <div class="w-full h-[1px] bg-gray-300 bg-opacity-45 my-8"></div>
      <div class="text-center">
        <span>©2024 数据要素交易平台</span>
      </div>
    </section>
  </section>
</template>

<style scoped>
.main-container {
  min-height: calc(100vh - 120px);
}
</style>
