<script setup lang="ts">
import { signup } from '@/api'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { updateUserInfo } from '@/hooks/user'

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})
const signupAction = async () => {
  await signup(form)
  updateUserInfo(form.username)
  router.replace({
    path: '/'
  })
}
const jump2login = () => {
  router.replace({
    path: '/login'
  })
}
</script>

<template>
  <section class="h-[100vh] w-[100vw] flex justify-center items-center container-login">
    <div class="form relative z-20 p-12 bg-white shadow-lg w-[450px] rounded-sm">
      <h2 class="text-3xl text-center">注册</h2>
      <div class="flex flex-col gap-4 mt-7 mb-5">
        <div>
          <div>
            <label for="email">用户名称</label>
          </div>
          <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
            <input class="ipt w-full px-3 py-3" type="text" id="email" placeholder="请输入用户名称" v-model="form.username">
            <div class="ipt-line absolute left-0 top-0 w-full h-full pointer-events-none"></div>
          </div>
        </div>
        <div>
          <div>
            <label for="password">密码</label>
          </div>
          <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
            <input class="ipt w-full px-3 py-3" type="password" id="password" placeholder="请输入密码" v-model="form.password">
            <div class="ipt-line absolute left-0 top-0 w-full h-full pointer-events-none"></div>
          </div>
        </div>
        <button class="btn-login w-full py-3 rounded text-white shadow-lg bg-green-800" @click="signupAction">注册</button>
      </div>
      <div class="text-center">已有账号？<a class="text-cyan-750 hover_text-cyan-850 text-blue-400 text-decoration-line: underline cursor-pointer" @click="jump2login">立即登录</a></div>
    </div>
  </section>
</template>

<style scoped>
.container-login {
  background-image: url('@/assets/login-bg.png');
  background-size: contain;
}
</style>