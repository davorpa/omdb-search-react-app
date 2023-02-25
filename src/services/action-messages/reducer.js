export const DispatcherActions = Object.freeze({
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR'
})

export const initialState = Object.freeze({})

export const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case DispatcherActions.ADD: {
      const [key, message] = actionPayload
      const newState = { ...state }
      if (Object.prototype.hasOwnProperty.call(newState, key)) {
        // append message to array if key exists
        newState[key] = [...newState[key], message]
      } else {
        newState[key] = [message] // initialize array
      }
      return newState
    }
    case DispatcherActions.REMOVE: {
      const key = actionPayload
      const newState = { ...state }
      delete newState[key]
      return newState
    }
    case DispatcherActions.CLEAR: {
      return initialState
    }
  }
}
