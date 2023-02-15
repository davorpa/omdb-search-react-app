import reactPropTypes from 'prop-types'

const stringOrNumberPropType = reactPropTypes.oneOfType([
  reactPropTypes.string,
  reactPropTypes.number
])

const stringOrBoolPropType = reactPropTypes.oneOfType([
  reactPropTypes.string,
  reactPropTypes.bool
])

const stringNumberOrBoolPropType = reactPropTypes.oneOfType([
  reactPropTypes.string,
  reactPropTypes.number,
  reactPropTypes.bool
])

const clsxClassNamePropType = reactPropTypes.oneOfType([
  reactPropTypes.string,
  reactPropTypes.arrayOf(stringNumberOrBoolPropType),
  reactPropTypes.objectOf(stringNumberOrBoolPropType)
])

const requestSubmitOnValueChangePropType = reactPropTypes.oneOf([
  false,
  true,
  'immediate',
  'debounce',
  'debounce-immediate'
])

export default {
  stringOrNumber: stringOrNumberPropType,
  stringOrBool: stringOrBoolPropType,
  stringNumberOrBool: stringNumberOrBoolPropType,
  clsxClassName: clsxClassNamePropType,
  requestSubmitOnValueChange: requestSubmitOnValueChangePropType
}
