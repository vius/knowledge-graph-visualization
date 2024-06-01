<template>
  <section class="h-full w-full p-2 overflow-auto pt-10">
    <table class="w-full flex-1 text-sm text-left table-auto">
      <thead class="">
        <tr>
          <th scope="col" class="px-3 py-1">
            网络资产实体标签
          </th>
          <th scope="col" class="px-3 py-1">
            开源情报实体标签
          </th>
          <th scope="col" class="px-3 py-1">
            社工情报实体标签
          </th>
          <th scope="col" class="px-3 py-1">
            关系标签
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="" v-for="item in  state.list " :key="item.id">
          <th scope="row" class="px-3 font-light">
            {{ item.networkAssetEntities }}
          </th>
          <td scope="row" class="px-3">
            {{ item.osintEntities }}
          </td>
          <td scope="row" class="px-3">
            {{ item.socialEngineeringEntities }}
          </td>
          <td scope="row" class="px-3">
            {{ item.relationshipTags }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
const state: any = reactive({
  list: []
})
const networkAssetEntities = [
  "lasttime", "tuid", "py", "type", "host", "device", "brand", "sid", "ip",
  "ip_c", "ip_b", "port", "domain", "charset", "server", "title", "tz",
  "base_protocol", "waf", "email", "product", "os", "service", "hy",
  "geo_areacode", "geo_country", "geo_city", "geo_isp", "geo_asn", "geo_org",
  "geo_p", "geo_accuracy", "geo_scene", "geo_d", "geo_rpt_lon", "geo_rpt_lat"
];

const osintEntities = [
  "Campaign", "Identity", "Course Of Action", "Email Message", "Privilege",
  "Action", "Author", "Date", "Location", "Task", "Malware", "Vulnerability",
  "Tool", "Attacker", "Infrastructure", "Artifact", "Domain Name", "Ipv4 Addr",
  "File", "Cti Vendor"
];

const socialEngineeringEntities = [
  "id", "address", "birthday", "city", "company", "country", "job", "email",
  "mobile", "name", "pass", "qq", "sex", "sfz", "user", "hy"
];

const relationshipTags = [
  "技术支持", "数据类目", "主域名", "网页字符集", "web服务器", "网页标题", "传输层协议",
  "网络应用协议", "邮箱地址", "属于", "具有", "行业", "探测", "前缀", "组成", "设备厂商",
  "操作系统", "防火墙", "产品名称", "区域代码", "国家名称", "城市名称", "ISP服务商",
  "ASN自治系统", "省份", "精确度", "场景", "详细地址", "经度", "纬度", "Event", "地址",
  "生日", "城市", "公司", "国家", "工作", "邮箱", "手机号码", "姓名", "密码", "qq",
  "性别", "身份证", "用户名", "行业"
];

const length = Math.max(networkAssetEntities.length, osintEntities.length, socialEngineeringEntities.length, relationshipTags.length)

Array.from({ length }, (_, i) => {
  state.list.push({
    networkAssetEntities: networkAssetEntities[i] || '',
    osintEntities: osintEntities[i] || '',
    socialEngineeringEntities: socialEngineeringEntities[i] || '',
    relationshipTags: relationshipTags[i] || ''
  })
})
</script>

<style scoped>
tbody tr {
  /* background-image: url('@/assets/auction/table-border.png'); */
  /* background-size: 100% 100%; */
  height: 32px;
}
</style>