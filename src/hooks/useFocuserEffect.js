import { useEffect, useRef } from 'react'

/**
 * Hook to be used in a component that needs to focus on a specific
 * DOM element with errors or scroll to the DOM element that contains
 * the component that consumes the datasource list.
 *
 * @function useFocuserEffect
 * @memberof module:hooks
 * @param {Array<*>} list - Datasource list used to inspect for focus or scroll
 * @returns {Array<import('react').Ref<Element>>} - Refs to be used in the component.
 *      One for the DOM element that needs to be scrolled to when the list has items
 *      and another for the that which needs to be focused when is empty.
 */
export function useFocuserEffect(list) {
  const scrollerRef = useRef(null)
  const focusedRef = useRef(null)

  const effectMonitorRef = useRef(true)
  useEffect(() => {
    // only when list datasource changes, not when component is mounted
    if (effectMonitorRef.current) {
      effectMonitorRef.current = false
      return
    }
    // fire actions
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
