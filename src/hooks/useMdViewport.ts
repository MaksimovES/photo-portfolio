import { useState, useEffect } from 'react'

const MD_QUERY = '(min-width: 768px)'

export function useMdViewport() {
  const [isMd, setIsMd] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MD_QUERY).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(MD_QUERY)
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMd
}
