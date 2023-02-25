import { useEffect, useRef } from 'react'

export function useFocuserEffect(list) {
  const scrollerRef = useRef(null)
  const focusedRef = useRef(null)

  const effectMonitorRef = useRef(true)
  useEffect(() => {
    if (effectMonitorRef.current) {
      effectMonitorRef.current = false
      return
    }
    if (list?.length) {
      scrollerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    } else {
      focusedRef.current.focus()
    }
  }, [list])
  return [scrollerRef, focusedRef]
}
