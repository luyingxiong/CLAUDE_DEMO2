const BASE_URL = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  if (json.code !== 0) throw new Error(json.msg || '请求失败')
  return json.data
}

export const get = (path, params) => {
  const query = params ? '?' + new URLSearchParams(params).toString() : ''
  return request(`${path}${query}`)
}
