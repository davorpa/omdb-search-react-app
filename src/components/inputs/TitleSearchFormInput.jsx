import { useId, useCallback, forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from '../prop-types'
import { handleComponentInputOnChange } from './utils'

/**
 * `TitleSearchFormInput` is a React component that renders a input field
 * to search by title in a movie list view component (e.g. MovieList)
 *
 * @function TitleSearchFormInput
 * @param {Object} props -
 * @param {string=} props.formId -
 *      The HTML id of the form that this input is a part of
 * @param {string=} [props.name="title"] -
 * @param {any=} props.value -
 * @param {Function=} props.valueSetter -
 *      A callback function that receives the new/setted value as argument.
 * @param {string=} [props.labelText="Title"] -
 * @param {(string|string[])=} props.className -
 * @param {boolean=} [props.required=false] -
 * @param {string=} props.placeholder -
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
 * @param {import('react').ForwardedRef=} ref -
 *      A `React.useRef` reference to hook this wrapped input
 * @returns {import('react').FunctionComponent}
 * @memberof module:components
 */
export const TitleSearchFormInput = forwardRef(
  /**
   * @param {Object} props -
   * @param {string=} props.formId -
   *      The HTML id of the form that this input is a part of
   * @param {string=} [props.name="title"] -
   * @param {any=} props.value -
   * @param {Function=} props.valueSetter -
   *      A callback function that receives the new/setted value as argument.
   * @param {string=} [props.labelText="Title"] -
   * @param {(string|string[])=} props.className -
   * @param {boolean=} [props.required=false] -
   * @param {string=} props.placeholder -
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
   * @param {import('react').ForwardedRef=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {import('react').FunctionComponent}
   */
  (
    {
      formId,
      name = 'title',
      value,
      valueSetter,
      labelText = 'Title',
      className,
      required = false,
      placeholder = 'Avengers, Batman, Start Wars, The Matrix...',
      onValueChange,
      requestSubmitOnValueChange = false
    },
    ref
  ) => {
    const inputId = useId() + '-search-title'

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
          ref={ref}
          id={inputId}
          form={formId}
          name={name}
          value={value}
          readOnly={!valueSetter}
          onChange={handleInputOnChange}
          type="text"
          required={required}
          placeholder={placeholder}
        />
      </fieldset>
    )
  }
)

TitleSearchFormInput.displayName = 'TitleSearchFormInput'

TitleSearchFormInput.propTypes = {
  formId: reactPropTypes.string,
  name: reactPropTypes.string,
  value: reactPropTypes.any,
  valueSetter: reactPropTypes.func,
  className: corePropTypes.clsxClassName,
  labelText: reactPropTypes.string,
  required: reactPropTypes.bool,
  placeholder: reactPropTypes.string,
  onValueChange: reactPropTypes.func,
  requestSubmitOnValueChange: corePropTypes.requestSubmitOnValueChange
}
