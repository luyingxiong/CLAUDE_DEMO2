import { ref, computed } from 'vue'

const ALL_GROUPS = [
  { letter: 'A', items: [{ name: '按揭贷款管理', code: 'A001' }, { name: '安全生产管理', code: 'A002' }] },
  { letter: 'B', items: [{ name: '保全服务流程管理', code: 'B001' }, { name: '保险核保管理', code: 'B002' }, { name: '保险理赔处理', code: 'B003' }, { name: '保险销售合规管理', code: 'B004' }] },
  { letter: 'C', items: [{ name: '财务报告管理', code: 'C001' }, { name: '财务预算控制', code: 'C002' }, { name: '操作风险管理', code: 'C003' }, { name: '出纳资金管理', code: 'C004' }] },
  { letter: 'D', items: [{ name: '贷款发放管理', code: 'D001' }, { name: '代理业务合规管理', code: 'D002' }] },
  { letter: 'F', items: [{ name: '法律合规管理', code: 'F001' }, { name: '反洗钱监控管理', code: 'F002' }, { name: '风险评估管理', code: 'F003' }] },
  { letter: 'G', items: [{ name: '供应商资质管理', code: 'G001' }, { name: '公文档案管理', code: 'G002' }] },
  { letter: 'H', items: [{ name: '合同审批管理', code: 'H001' }, { name: '行政后勤管理', code: 'H002' }] },
  { letter: 'J', items: [{ name: '绩效考核管理', code: 'J001' }, { name: '精算评估管理', code: 'J002' }, { name: '决策审批流程', code: 'J003' }] },
  { letter: 'K', items: [{ name: '客户服务质量管理', code: 'K001' }, { name: '客户信息安全管理', code: 'K002' }] },
  { letter: 'L', items: [{ name: '理赔支付审核', code: 'L001' }, { name: '流动性风险管理', code: 'L002' }] },
  { letter: 'M', items: [{ name: '满期保险金管理', code: 'M001' }, { name: '内部审计管理', code: 'M002' }] },
  { letter: 'N', items: [{ name: '内控自评管理', code: 'N001' }, { name: '内部培训体系', code: 'N002' }] },
  { letter: 'Q', items: [{ name: '签单业务管理', code: 'Q001' }, { name: '前台服务控制', code: 'Q002' }] },
  { letter: 'R', items: [{ name: '人力资源规划管理', code: 'R001' }, { name: '日常运营监控', code: 'R002' }] },
  { letter: 'S', items: [{ name: '审计监督管理', code: 'S001' }, { name: '数据安全防护', code: 'S002' }, { name: '索赔业务处理', code: 'S003' }] },
]

export function findProcessByCode(code) {
  for (const group of ALL_GROUPS) {
    const item = group.items.find(i => i.code === code)
    if (item) return item
  }
  return null
}

export function useProcessList() {
  const searchQuery = ref('')

  const filteredGroups = computed(() => {
    const q = searchQuery.value.trim()
    if (!q) return ALL_GROUPS
    return ALL_GROUPS
      .map(g => ({ ...g, items: g.items.filter(i => i.name.includes(q) || i.code.includes(q)) }))
      .filter(g => g.items.length > 0)
  })

  const indexList = computed(() => filteredGroups.value.map(g => g.letter))

  return { searchQuery, filteredGroups, indexList }
}
