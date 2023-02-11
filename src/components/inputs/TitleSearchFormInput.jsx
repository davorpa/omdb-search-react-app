import { useId, forwardRef } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from '../prop-types'

/**
 *
 */
export const TitleSearchFormInput = forwardRef(
  /**
   * @param {Object} props -
   * @param {string=} [props.name="title"] -
   * @param {string=} [props.labelText="Title"] -
   * @param {string|string[]=} props.className -
   * @param {boolean=} [props.required=false] -
   * @param {string=} props.placeholder -
   * @param {import('react').ForwardedRef<*>=} ref -
   *      A `React.useRef` reference to hook this wrapped input
   * @returns {JSX.Element}
   */
  (
    {
      name = 'title',
      labelText = 'Title',
      className,
      required = false,
      placeholder = 'Avengers, Batman, Start Wars, The Matrix...'
    },
    ref
  ) => {
    const inputId = useId() + '-search-title'

    return (
      <fieldset
        className={clsx('form-input', required && 'required', className)}
      >
        <label htmlFor={inputId}>{labelText}:</label>
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="text"
          required={required}
          placeholder={placeholder}
        />
      </fieldset>
    )
  }
)

TitleSearchFormInput.propTypes = {
  name: reactPropTypes.string,
  className: corePropTypes.clsxClassName,
  labelText: reactPropTypes.string,
  required: reactPropTypes.bool,
  placeholder: reactPropTypes.string
}
