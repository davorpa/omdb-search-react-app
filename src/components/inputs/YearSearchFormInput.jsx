import { useId, useCallback, forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from '../prop-types'
import { handleComponentInputOnChange } from './utils'

/**
 * A YearSearchFormInput React component
 * @returns {import('react').FunctionComponent}
 */
export const YearSearchFormInput = forwardRef(
  /**
   * @param {Object} props -
   * @param {string=} props.formId -
   *      The HTML id of the form that this input is a part of
   * @param {string=} [props.name="year"] -
   * @param {any=} props.value -
   * @param {Function=} props.valueSetter -
   * @param {string=} [props.labelText="Year"] -
   * @param {string|string[]=} props.className -
   * @param {boolean=} [props.required=false] -
   * @param {Function=} props.onValueChange -
   *      A callback function that receives the event as argument.
   *      It will be called when the value changes
   * @param {boolean|string=} [props.requestSubmitOnValueChange=false] -
   *      Experimental!! for uncontrolled components.
   *      - If true, the form will be submitted when the value changes
   *      - If "debounce", the form will be submitted after some debounce
   *        timeout when the value changes
   *      - If "debounce-immediate" the form will be submitted the first time
   *        and also after some debounce timeout when the value changes
   * @param {import('react').ForwardedRef<*>=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {import('react').FunctionComponent}
   **/
  (
    {
      formId,
      name = 'year',
      value,
      valueSetter,
      labelText = 'Year',
      className,
      required = false,
      onValueChange,
      requestSubmitOnValueChange = false
    },
    ref
  ) => {
    const inputId = useId() + '-search-year'

    const handleInputOnChange = useCallback(
      (/** @type {import('react').SyntheticEvent} */ event) => {
        handleComponentInputOnChange({
          event,
          valueSetter,
          onValueChange,
          requestSubmitOnValueChange
        })
      },
      [valueSetter, onValueChange, requestSubmitOnValueChange]
    )

    return (
      <fieldset
        className={clsx('form-input', required && 'required', className)}
      >
        <label htmlFor={inputId}>{labelText}:</label>
        <input
          id={inputId}
          ref={ref}
          form={formId}
          name={name}
          value={value}
          readOnly={!valueSetter}
          onChange={handleInputOnChange}
          type="number"
          min={1800}
          max={3000}
          step={1}
          required={required}
          placeholder={new Date().getFullYear()}
        />
      </fieldset>
    )
  }
)

YearSearchFormInput.displayName = 'YearSearchFormInput'

YearSearchFormInput.propTypes = {
  formId: reactPropTypes.string,
  name: reactPropTypes.string,
  value: reactPropTypes.any,
  valueSetter: reactPropTypes.func,
  className: corePropTypes.clsxClassName,
  labelText: reactPropTypes.string,
  required: reactPropTypes.bool,
  onValueChange: reactPropTypes.func,
  requestSubmitOnValueChange: corePropTypes.requestSubmitOnValueChange
}
