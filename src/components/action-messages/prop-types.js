import reactPropTypes from 'prop-types'

const actionMessagePropType = reactPropTypes.oneOfType([
  reactPropTypes.string.isRequired,
  reactPropTypes.exact({
    text: reactPropTypes.string.isRequired,
    type: reactPropTypes.oneOf(['error', 'info', 'success', 'warning'])
  }).isRequired
])

const actionMessageListPropType = reactPropTypes.arrayOf(
  actionMessagePropType.isRequired
)

const actionMessagesMapPropType = reactPropTypes.objectOf(
  actionMessageListPropType.isRequired
)

export default {
  actionMessagesMap: actionMessagesMapPropType,
  actionMessageList: actionMessageListPropType,
  actionMessage: actionMessagePropType
}
