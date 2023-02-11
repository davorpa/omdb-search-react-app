import { useId } from 'react'
import reactPropTypes from 'prop-types'
import clsx from 'clsx'
import corePropTypes from '../prop-types'

/**
 *
 * @param {Object} props -
 * @param {string=} [props.name="title"] -
 * @param {string=} [props.labelText="Title"] -
 * @param {string|string[]=} props.className -
 * @param {boolean=} [props.required=false] -
 * @param {string=} props.placeholder -
 * @returns {JSX.Element}
 */
export function TitleSearchFormInput({
  name = 'title',
  labelText = 'Title',
  className,
  required = false,
  placeholder = 'Avengers, Batman, Start Wars, The Matrix...'
}) {
  const inputId = useId() + '-search-title'

  return (
    <fieldset className={clsx('form-input', required && 'required', className)}>
      <label htmlFor={inputId}>{labelText}:</label>
      <input
        id={inputId}
        name={name}
        type="text"
        required={required}
        placeholder={placeholder}
      />
    </fieldset>
  )
}

TitleSearchFormInput.propTypes = {
  name: reactPropTypes.string,
  className: corePropTypes.clsxClassName,
  labelText: reactPropTypes.string,
  required: reactPropTypes.bool,
  placeholder: reactPropTypes.string
}
