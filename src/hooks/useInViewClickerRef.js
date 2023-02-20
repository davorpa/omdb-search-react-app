import { useCallback, useRef } from 'react'

const defaultObserverOptions = {
  /** @type {Element} */
  root: null, // viewport
  rootMargin: '0px',
  threshold: 1.0
}

/**
 * React custom Hook that could be used as React reference to inspect if the
 * DOM element on which is attached to is currently visible in the viewport.
 * If it is, it will fire a click event on the target element.
 *
 * Usefull to trigger the pager action in charge of fetch more data / pages.
 *
 * @param {Object} observerOptions -
 *    Options to be passed to the Intersection Observer API as:
 * @param {Element=} observerOptions.root -
 *      The element that is used as the viewport for checking visibility
 *      of the target. Must be the ancestor of the target.
 *      Defaults to the browser viewport if not specified or if `null`.
 * @param {string=} [observerOptions.rootMargin="0px"] -
 *      Margin around the root. Can have values similar to the CSS `margin`
 *      property, e.g. "`10px 20px 30px 40px`" (top, right, bottom, left).
 *      The values can be percentages. This set of values serves to grow or
 *      shrink each side of the root element's bounding box before computing
 *      intersections. Defaults to all zeros.
 * @param {(number|number[])=} [observerOptions.threshold=1.0] -
 *      Either a single number or an array of numbers which indicate at what
 *      percentage of the target's visibility the observer's callback should
 *      be executed. If you only want to detect when visibility passes the 50%
 *      mark, you can use a value of 0.5. If you want the callback to run every
 *      time visibility passes another 25%, you would specify the array
 *      `[0, 0.25, 0.5, 0.75, 1]`.
 *      A value of `0.0` value means as soon as even one pixel is visible,
 *      the callback will be run.
 *      A value of `1.0`, the default, means that the threshold isn't considered
 *      passed until every pixel is visible.
 * @param {boolean} more - true if there's more data/pages to be fetched
 * @returns {import('react').Ref}
 *      A function to be used as reference over the DOM element to be observed
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
export function useInViewClickerRef(
  observerOptions = defaultObserverOptions,
  more
) {
  // Ensure each defaults are set
  const { root, rootMargin, threshold } = Object.assign(
    {},
    defaultObserverOptions,
    observerOptions
  )

  // Ref to store the Intersection Observer instance
  const observer = useRef(null)

  const measureRef = useCallback(
    // element is the react element being referenced
    (element) => {
      // disconnect / dispose observer set on previous last element
      observer.current && observer.current.disconnect()

      // avoid recreate the observer if there's no more data to be fetched
      // or if the element is not valid (normally if not rendered)
      if (!more || !element) return

      // create new observer
      observer.current = new IntersectionObserver(
        ([entry]) => {
          // fire click when element enters (is intersecting with).
          // This triggers the pager hook to fetch more items in the new page
          more && entry.isIntersecting && entry.target.click()
        },
        { root, rootMargin, threshold }
      )

      // observe/monitor last element
      observer.current.observe(element)
    },
    [root, rootMargin, threshold, more]
  )

  return measureRef
}
