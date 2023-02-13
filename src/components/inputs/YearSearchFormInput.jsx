import { useId, useCallback, forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from '../prop-types'

/**
 * A YearSearchFormInput React component
 */
export const YearSearchFormInput = forwardRef(
  /**
   * @param {Object} props -
   * @param {string=} [props.name="year"] -
   * @param {any=} props.value -
   * @param {Function=} props.valueSetter -
   * @param {string=} [props.labelText="Year"] -
   * @param {string|string[]=} props.className -
   * @param {boolean=} [props.required=false] -
   * @param {import('react').ForwardedRef<*>=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {JSX.Element}
   **/
  (
    {
      name = 'year',
      value,
      valueSetter,
      labelText = 'Year',
      className,
      required = false
    },
    ref
  ) => {
    const inputId = useId() + '-search-year'

    const handleInputOnChange = useCallback(
      (/** @type {import('react').SyntheticEvent} */ event) => {
        const input = event.target
        valueSetter && valueSetter(input.value, input.name)
      },
      [valueSetter]
    )

    return (
      <fieldset
        className={clsx('form-input', required && 'required', className)}
      >
        <label htmlFor={inputId}>{labelText}:</label>
        <input
          id={inputId}
          ref={ref}
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

YearSearchFormInput.propTypes = {
  name: reactPropTypes.string,
  value: reactPropTypes.any,
  valueSetter: reactPropTypes.func,
  className: corePropTypes.clsxClassName,
  labelText: reactPropTypes.string,
  required: reactPropTypes.bool
}
