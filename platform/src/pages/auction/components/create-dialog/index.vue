<template>
  <el-dialog v-model="state.show" :title="props.title" :width="isZhuanyong ? '550' : '760px'" :close-on-click-modal="false" @close="close()">
    <el-tabs v-model="state.activeName" v-if="!isZhuanyong">
      <el-tab-pane v-for="tab, index in state.list" :label="tab.name" :name="index">
        <section class="m-4">
          <section class="mb-6">
            <p class="font-bold text-lg">{{ tab.name }}</p>
            <p class="text-sm mt-2 text-opacity-60 text-black">{{ getQueryDesc(tab) }}</p>
          </section>
          <section class="flex flex-row gap-4 flex-wrap">
            <el-input v-for="item in tab.vals" v-model="item.value" :placeholder="'请输入' + item.name" size="large" class="!w-40"></el-input>
          </section>
        </section>
      </el-tab-pane>
    </el-tabs>
    <template #footer v-if="!isZhuanyong">
      <span class="dialog-footer">
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
    <section v-if="isZhuanyong" class="px-12 pb-4">
      <section class="flex items-center my-4">
        <span class="min-w-24">地区查询</span>
        <el-select class="!w-64 grow-0 mr-4" v-model="zhuanYongState.diqu">
          <el-option v-for="item in diquOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="primary" @click="zhuanYongConfirm('diqu')">查询</el-button>
      </section>
      <section class="flex items-center my-4">
        <span class="min-w-24">行业查询</span>
        <el-select class="!w-64 grow-0 mr-4" v-model="zhuanYongState.hangye">
          <el-option v-for="item in hangyeOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-button type="primary" @click="zhuanYongConfirm('hangye')">查询</el-button>
      </section>
      <section class="flex items-center my-4">
        <span class="min-w-24">组织机构查询</span>
        <el-input class="!w-64 grow-0 mr-4" v-model="zhuanYongState.jigou" placeholder="请输入要查询的组织机构"/>
        <el-button type="primary" @click="zhuanYongConfirm('jigou')">查询</el-button>
      </section>
    </section>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { confirmPostMessage } from '../../hook'
import { cloneDeep } from 'lodash-es';
const { toast } = useToast()
const props: any = defineProps({
  title: String,
  list: []
})
const diquOptions = ['台湾', '北京', '上海']
const hangyeOptions = ['企业', '教育', '政务']
const zhuanYongState: any = reactive({
  diqu: '',
  hangye: '',
  jigou: ''
})
const isZhuanyong = props.title === '专用查询'
console.log('isZhuanyong', isZhuanyong)
const state = reactive({
  query: '',
  show: true,
  activeName: 0,
  list: cloneDeep(props.list)
})

const emits = defineEmits(['close'])
const getQuery = (tab: any) => {
  const str = tab.value
  const vals = tab.vals
  let regex = /\${(\w+)}/g;
  let result = str.replace(regex, (_match: any, p1: any) => {
    const index = +p1
    return vals[index].value
  });
  return result
}
const getQueryDesc = (tab: any) => {
  const str = tab.value
  const vals = tab.vals
  let regex = /\${(\w+)}/g;
  let result = str.replace(regex, (_match: any, p1: any) => {
    const index = +p1
    return vals[index].name
  });
  return result
}
const confirm = async () => {
  const { activeName } = state
  const tab = state.list[activeName]
  const pass = tab.vals.every((item: any) => item.value)
  if (!pass) {
    toast({
      title: '请将所有变量填写完成！',
      duration: 1500,
      variant: 'destructive',
    });
    return
  }
  const query: string = getQuery(tab)
  console.log('拼接完成的query：', query)
  confirmPostMessage(query)
  close(true)
}
const getZhuanyongQuery = (value: string, key: string) => {
  const map: any = {
    diqu: `MATCH (a:geo_org) WHERE a.value CONTAINS "${value}" RETURN a`,
    hangye: `MATCH (a:hy)-[r]-(b:geo_org) WHERE a.value="${value}" RETURN a,r,b LIMIT 50`,
    jigou: `MATCH (a:geo_org) WHERE a.value CONTAINS "${value}" RETURN a`
  }
  return map[key]
}
const zhuanYongConfirm = (key: string) => {
  let value = zhuanYongState[key]
  console.log('value', value)
  if (!value) {
    toast({
      title: '请将对应变量填写完成！',
      duration: 1500,
      variant: 'destructive',
    });
    return
  }
  if(key==='diqu' && value === '台湾'){
    value = '臺灣'
  }
  const query = getZhuanyongQuery(value, key)
  console.log('拼接完成的query：', query)
  confirmPostMessage(query)
  close(true)
}
const close = (refresh = false) => {
  emits('close', refresh)
}

</script>
