import { ref, nextTick } from 'vue'

const AI_REPLIES = {
  '销售环节有哪些风险点？': '销售环节主要风险点包括：①不实陈述与误导销售；②销售人员资质不合规；③销售材料未经审批擅自使用；④双录（录音录像）执行不到位；⑤客户信息采集不完整。建议参照《个险销售合规管理办法》执行。',
  '理赔服务的控制措施有哪些？': '理赔服务控制措施包括：①建立理赔材料核实机制；②实施理赔时效管理（普通案件3个工作日内）；③对大额案件启动专项核查；④定期开展反欺诈排查；⑤理赔结果与客户充分沟通确认。',
  '公共控制措施包括哪些？': '公共控制措施主要涵盖：①授权审批控制；②不相容职务分离；③信息系统访问权限管控；④档案及重要文件管理；⑤内控自评与监督检查；⑥内部举报与合规文化建设。',
  '个险条线的控制措施有哪些？': '个险条线的控制措施包括：①代理人招募与资质审核；②业务培训与考核管理；③保费收付合规控制；④佣金核算与发放审核；⑤业务质量回访抽检；⑥脱落率与续期追踪管理。',
}

function now() {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function useChat() {
  const messages = ref([
    {
      type: 'ai',
      content: '您好！我是内控手册AI助手，可以为您解答关于内部控制执行手册的相关问题，例如，您可以询问：核保环节有什么需要注意的？',
      time: now(),
    },
  ])
  const inputText = ref('')
  const isLoading = ref(false)

  async function sendMessage(chatListRef) {
    const text = inputText.value.trim()
    if (!text || isLoading.value) return

    messages.value.push({ type: 'user', content: text, time: now() })
    inputText.value = ''
    isLoading.value = true

    // 展示打字 loading 气泡
    messages.value.push({ type: 'ai', content: '', time: now(), loading: true })
    await scrollBottom(chatListRef)

    await new Promise(r => setTimeout(r, 1200))

    const reply = AI_REPLIES[text]
      ?? `关于"${text}"，建议您查阅对应业务模块的控制流程章节，或联系合规部门进行专项咨询。`

    messages.value.splice(messages.value.length - 1, 1, { type: 'ai', content: reply, time: now() })
    isLoading.value = false
    await scrollBottom(chatListRef)
  }

  function selectSuggestion(q) {
    inputText.value = q
  }

  async function scrollBottom(chatListRef) {
    await nextTick()
    if (chatListRef?.value?.$el) {
      const el = chatListRef.value.$el.querySelector('.chat-scroll')
      if (el) el.scrollTop = el.scrollHeight
    }
  }

  return { messages, inputText, isLoading, sendMessage, selectSuggestion }
}
