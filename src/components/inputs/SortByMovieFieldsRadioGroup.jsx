import { useId, useCallback, forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from '../prop-types'
import { handleComponentInputOnChange } from './utils'

/**
 * A SortByMovieFieldsRadioGroup React component
 * @returns {import('react').FunctionComponent}
 */
export const SortByMovieFieldsRadioGroup = forwardRef(
  /**
   * @param {Object} props -
   * @param {string=} props.formId -
   *      The html id of the form that this input is a part of
   * @param {string=} [props.name="title"] -
   * @param {any=} props.value -
   * @param {Function=} props.valueSetter -
   *      A callback function that receives the new/setted value as argument.
   * @param {string=} [props.labelText="Title"] -
   * @param {string|string[]=} props.className -
   * @param {boolean=} [props.required=false] -
   * @param {string=} props.placeholder -
   * @param {Function=} props.onValueChange -
   *      A callback function that receives the event as argument.
   *      It will be called when the value changes
   * @param {boolean=} [props.requestSubmitOnValueChange=false] -
   *      Experimental. If true, the form will be submitted when the value changes
   * @param {import('react').ForwardedRef<*>=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {JSX.Element}
   */
  (
    {
      formId,
      name = 'sortBy',
      value,
      valueSetter,
      labelText = 'Sort by',
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
          <option value="">None</option>
          <optgroup label="= Properties =">
            <option value="title">Title</option>
            <option value="year">Release Year</option>
            <option value="type">Type</option>
          </optgroup>
        </select>
      </fieldset>
    )
  }
)

SortByMovieFieldsRadioGroup.displayName = 'SortByMovieFieldsRadioGroup'

SortByMovieFieldsRadioGroup.propTypes = {
  formId: reactPropTypes.string,
  name: reactPropTypes.string,
  value: reactPropTypes.any,
  valueSetter: reactPropTypes.func,
  className: corePropTypes.clsxClassName,
  labelText: reactPropTypes.string,
  required: reactPropTypes.bool,
  placeholder: reactPropTypes.string,
  onValueChange: reactPropTypes.func,
  requestSubmitOnValueChange: reactPropTypes.bool
}
