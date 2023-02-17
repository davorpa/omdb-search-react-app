/**
 * @file Helper functions used by several components.
 * @module components/utils
 */
import debounce from 'just-debounce-it'

/**
 * Internal utility function to handle the OnChange event of any component.
 *
 * @param {Object} param0 - object with the following parameters
 * @param {import('react').SyntheticEvent} param0.event -
 *     The event object received by the onChange handler of the target component
 * @param {Function=} param0.valueSetter -
 *     A callback function that receives the new/setted value as argument.
 * @param {Function=} param0.onValueChange -
 *     A callback function that receives the event as argument.
 *     It will be called when the value changes
 * @param {boolean|string=} [param0.requestSubmitOnValueChange=false] -
 *     Experimental!! for uncontrolled components.
 *     - If true, the form will be submitted when the value changes
 *     - If "debounce", the form will be submitted after some debounce
 *       timeout when the value changes
 *     - If "debounce-immediate" the form will be submitted the first time
 *       and also after some debounce timeout when the value changes
 * @param {number=} [param0.debounceWaitMillis=600] -
 *     The debounce timeout in milliseconds
 */
export async function handleComponentInputOnChange({
  event,
  valueSetter,
  onValueChange,
  requestSubmitOnValueChange = false,
  debounceWaitMillis = 600
}) {
  const input = event.target
  // Bind and validate the input value
  // adding async/sync support
  let valid = true
  try {
    valueSetter &&
      (valid =
        (await Promise.resolve(valueSetter(input.value, input.name))) ?? true)
  } catch (error) {
    valid = false
  }
  // execute external onChange handler
  onValueChange && onValueChange(event)
  // XXX: experimental requestSubmitOnValueChange for uncontrolled components
  if (
    valid &&
    requestSubmitOnValueChange &&
    !event.isDefaultPrevented() &&
    input.form
  ) {
    // select invoke strategy
    const needsDebouncing =
      typeof requestSubmitOnValueChange === 'string' &&
      requestSubmitOnValueChange.startsWith('debounce')
    if (needsDebouncing) {
      debounce(
        input.form.requestSubmit,
        debounceWaitMillis,
        requestSubmitOnValueChange === 'debounce-immediate'
      ).bind(input.form)()
    } else {
      // queue the form submit to the next tick
      // so that controlled value has time to be updated first
      setTimeout(input.form.requestSubmit.bind(input.form), 0)
    }
  }
}
