/**
 * Internal utility function to handle the OnChange event of any component.
 *
 * @param {Object} param0 - object with the following parameters
 * @param {import('react').SyntheticEvent} param0.event -
 *     The event object received by the onChange handler of the target component
 * @param {Function=} param0.valueSetter -
 *      A callback function that receives the new/setted value as argument.
 * @param {Function=} param0.onValueChange -
 *      A callback function that receives the event as argument.
 *      It will be called when the value changes
 * @param {boolean=} [param0.requestSubmitOnValueChange=false] -
 *      Experimental!! for uncontrolled components.
 *      If true, the form will be submitted when the value changes
 */
export async function handleComponentInputOnChange({
  event,
  valueSetter,
  onValueChange,
  requestSubmitOnValueChange = false
}) {
  const input = event.target
  // Bind and validate the input value
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
    // queue the form submit to the next tick
    // so that the controlled value has time to be updated first
    setTimeout(() => {}, input.form.requestSubmit(), 0)
  }
}
