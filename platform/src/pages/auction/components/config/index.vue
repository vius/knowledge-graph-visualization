<script setup lang="ts">
import { Button } from '@/components/ui/button'
import CreateDialog from '../create-dialog/index.vue'
import UploadDialog from '../upload-dialog/index.vue'
import { reactive, ref } from 'vue'

const clickAction = (type = 1) => {
  const map: any = {
    1: {
      title: '数据写入',
      list: [{
        name: '创建实体',
        desc: 'CREATE (n:节点类型 {value: "节点的值"}) RETURN n',
        vals: [{
          name: '节点类型',
          value: ''
        }, {
          name: '节点的值',
          value: ''
        }],
        value: 'CREATE (n:${0} {value: "${1}"}) RETURN n'
      }, {
        name: '创建关系',
        vals: [{
          name: '起始节点类型',
          value: ''
        }, {
          name: '起始节点的值',
          value: ''
        }, {
          name: '终止节点类型',
          value: ''
        }, {
          name: '终止节点的值',
          value: ''
        }, {
          name: '关系类型',
          value: ''
        }],
        value: 'CREATE (n1:${0} {value: "${1}"}), (n2:${2} {value: "${3}"}), (n1)-[r:${4}]->(n2) RETURN n1, r, n2',
        desc: 'CREATE (n1:起始节点类型 {value: "起始节点的值"}), (n2:终止节点类型 {value: "终止节点的值"}), (n1)-[r:关系类型]->(n2) RETURN n1, r, n2'
      }]
    },
    2: {
      title: '数据更新',
      list: [{
        name: '更新实体',
        value: 'MATCH (n:${0} {value: "${1}"}) SET n.value = "${2}" RETURN n',
        vals: [{
          name: '节点类型',
          value: ''
        }, {
          name: '节点的值',
          value: ''
        }, {
          name: '节点的新值',
          value: ''
        }]
      }, {
        name: '更新关系',
        vals: [{
          name: '起始节点类型',
          value: ''
        }, {
          name: '起始节点的值',
          value: ''
        }, {
          name: '关系类型',
          value: ''
        }, {
          name: '终止节点类型',
          value: ''
        }, {
          name: '终止节点的值',
          value: ''
        }, {
          name: '新关系类型',
          value: ''
        }],
        value: 'MATCH (n1:${0} {value: "${1}"})-[r:${2}]->(n2:${3} {value: "${4}"}) DELETE r CREATE (n1)-[r1:${5}]->(n2) RETURN n1, r1, n2'
      }]
    },
    5: {
      title: '普通查询',
      list: [{
        name: '查询实体',
        value: 'MATCH (n:${0} {value: "${1}"}) RETURN n LIMIT 25',
        vals: [{
          name: '节点类型',
          value: ''
        }, {
          name: '节点的值',
          value: ''
        }],
      }, {
        name: '查询关系',
        value: 'MATCH (n1:${0} {value: "${1}"})-[r:${2}]->(n2:${3} {value: "${4}"}) RETURN n1, r, n2 LIMIT 25',
        vals: [{
          name: '起始节点类型',
          value: ''
        }, {
          name: '起始节点的值',
          value: ''
        }, {
          name: '关系类型',
          value: ''
        }, {
          name: '终止节点类型',
          value: ''
        }, {
          name: '终止节点的值',
          value: ''
        }],
      }]
    },
    6: {
      title: '专用查询',
      list: [{
        name: '地区查询模板',
        desc: 'MATCH (a:geo_p) WHERE a.value = "中国台湾" RETURN a'
      }, {
        name: '组织机构查询模板',
        desc: 'MATCH (a:geo_org) WHERE a.value = "佳福股份有限公司" RETURN a'
      }, {
        name: '行业查询模板',
        desc: 'MATCH (a:hy) WHERE a.value = "教育" RETURN a'
      }]
    }
  }
  const { title, list = [], query = {} } = map[type]
  data.title = title
  data.list = list
  data.query = query
  show.value = true
}
const data: any = reactive({
  title: '',
  list: []
})
const show = ref(false)
const uploadDialog = reactive({
  show: false,
  title: '',
  type: 1
})
const uploadAction = (type: number) => {
  uploadDialog.type = type
  uploadDialog.show = true
  uploadDialog.title = type === 1 ? '数据处理' : '知识提取'
}
</script>

<template>
  <section class="flex flex-col  h-full justify-center bg-[#111D34] p-3">
    <section class="flex justify-around flex-1 items-center">
      <Button @click="clickAction(1)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">数据写入</Button>
      <Button @click="clickAction(2)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">数据更新</Button>
      <Button @click="uploadAction(1)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">数据处理</Button>
    </section>
    <section class="flex justify-around flex-1 items-center">
      <Button @click="uploadAction(2)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">知识提取</Button>
      <Button @click="clickAction(5)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">普通查询</Button>
      <Button @click="clickAction(6)" class="w-24 h-9 bg-[#008FFF] rounded-[3px]">专用查询</Button>
    </section>
  </section>
  <CreateDialog v-if="show" :list="data.list" :title="data.title" @close="show = false" />
  <UploadDialog v-if="uploadDialog.show" :type="uploadDialog.type" :title="uploadDialog.title" @close="uploadDialog.show = false" />
</template>

<style lang="less">
.tab-list {
  [data-state="active"] {
    background: linear-gradient(to right, #008FFF 0%, #006299 100%);
  }
}

.config-number {
  width: 100%;

  .el-input {
    .el-input__wrapper {
      background-color: #11294A;
      box-shadow: none;

      input {
        color: #D0DEEE;
        opacity: 1;
      }
    }
  }

  &>span {
    background-color: #11294A;
    color: #D0DEEE;
    border-color: #063154;
  }
}
</style>