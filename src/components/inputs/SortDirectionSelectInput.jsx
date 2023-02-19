import { useId, useCallback, forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from '../prop-types'
import { handleComponentInputOnChange } from './utils'

/**
 * `SortDirectionSelectInput` is a React component that renders a select
 * to choose the sort direction used to render a movie list view component
 * (e.g. `MovieList`).
 *
 * @function SortDirectionSelectInput
 * @memberof module:components
 * @param {Object} props -
 * @param {string=} props.formId -
 *      The html id of the form that this input is a part of
 * @param {string=} [props.name="sortDir"] -
 * @param {(boolean|string)=} [props.value="asc"] -
 * @param {Function=} props.valueSetter -
 *      A callback function that receives the new/setted value as argument.
 * @param {string=} [props.labelText="Sort direction"] -
 * @param {(string|string[])=} props.className -
 * @param {boolean=} [props.required=false] -
 * @param {string=} props.placeholder -
 * @param {Function=} props.onValueChange -
 *      A callback function that receives the event as argument.
 *      It will be called when the value changes
 * @param {boolean=} [props.requestSubmitOnValueChange=false] -
 *      Experimental. If true, the form will be submitted when the value changes
 * @param {import('react').ForwardedRef=} ref -
 *      A `React.useRef` reference to hook this wrapped input
 * @returns {import('react').FunctionComponent}
 */
export const SortDirectionSelectInput = forwardRef(
  /**
   * @param {Object} props -
   * @param {string=} props.formId -
   *      The html id of the form that this input is a part of
   * @param {string=} [props.name="sortDir"] -
   * @param {(boolean|string)=} [props.value="asc"] -
   * @param {Function=} props.valueSetter -
   *      A callback function that receives the new/setted value as argument.
   * @param {string=} [props.labelText="Sort direction"] -
   * @param {(string|string[])=} props.className -
   * @param {boolean=} [props.required=false] -
   * @param {string=} props.placeholder -
   * @param {Function=} props.onValueChange -
   *      A callback function that receives the event as argument.
   *      It will be called when the value changes
   * @param {boolean=} [props.requestSubmitOnValueChange=false] -
   *      Experimental. If true, the form will be submitted when the value changes
   * @param {import('react').ForwardedRef=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {import('react').FunctionComponent}
   */
  (
    {
      formId,
      name = 'sortDir',
      value = 'asc',
      valueSetter,
      labelText = 'Sort direction',
      className,
      required = false,
      placeholder = '',
      onValueChange,
      requestSubmitOnValueChange = false
    },
    ref
  ) => {
    const inputId = useId() + '-sort-by'

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
        className={clsx(
          'form-input',
          'inline',
          'form-select',
          required && 'required',
          className
        )}
      >
        <label htmlFor={inputId}>{labelText}:</label>
        <select
          ref={ref}
          id={inputId}
          form={formId}
          name={name}
          value={value}
          onChange={handleInputOnChange}
          required={required}
          placeholder={placeholder}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </fieldset>
    )
  }
)

SortDirectionSelectInput.displayName = 'SortDirectionSelectInput'

SortDirectionSelectInput.propTypes = {
  formId: reactPropTypes.string,
  name: reactPropTypes.string,
  value: reactPropTypes.oneOf(['asc', 'desc']),
  valueSetter: reactPropTypes.func,
  className: corePropTypes.clsxClassName,
  labelText: reactPropTypes.string,
  required: reactPropTypes.bool,
  placeholder: reactPropTypes.string,
  onValueChange: reactPropTypes.func,
  requestSubmitOnValueChange: reactPropTypes.bool
}
