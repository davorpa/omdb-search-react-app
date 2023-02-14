import { useId, useCallback, forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from '../prop-types'
import { handleComponentInputOnChange } from './utils'
import { stringToTitleCase } from '@services/utils'
import OMDbResultType from '@services/omdb/OMDbResultType'

/**
 * A TypeSearchFormSelectInput React component
 */
export const TypeSearchFormSelectInput = forwardRef(
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
      name = 'type',
      value,
      valueSetter,
      labelText = 'Type',
      className,
      required = false,
      placeholder = '',
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
        className={clsx(
          'form-input',
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
          <option value="">Any</option>
          <optgroup label="= Types =">
            {Object.values(OMDbResultType).map((type) => (
              <option key={type} value={type}>
                {stringToTitleCase(type)}
              </option>
            ))}
          </optgroup>
        </select>
      </fieldset>
    )
  }
)

TypeSearchFormSelectInput.propTypes = {
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
