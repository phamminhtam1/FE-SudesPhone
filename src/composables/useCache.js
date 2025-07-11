export const setCache = (key, data) => {
  const cachedData = {
    data,
    timestamp: Date.now(),
  }
  localStorage.setItem(key, JSON.stringify(cachedData))
}

export const getCache = (key, maxAgeMs = 1000 * 60 * 5) => {
  const raw = localStorage.getItem(key)
  if (!raw) return null

  try {
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > maxAgeMs) {
      localStorage.removeItem(key)
      return null
    }
    return data
  } catch (e) {
    console.error('Failed to parse cache:', e)
    localStorage.removeItem(key)
    return null
  }
}
