import { getUserInfo, logout, login } from '@/api'
import { reactive } from 'vue'

export const state: any = reactive({
  user: {},
  hasLogin: false
})

export const loginAction = async (params: any) => {
  await login(params)
  getUserInfoAction()
}

export const getUserInfoAction = async () => {
  const data = await getUserInfo()
  if (data) {
    state.user = data
    state.hasLogin = true
  }
}

export const updateUserInfo = async (name: string) => {
  if (name) {
    state.user.username = name
    state.hasLogin = true
  }
}


export const logoutAction = async () => {
  await logout()
  state.user = {}
  state.hasLogin = false
}