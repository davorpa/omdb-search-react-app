import React from 'react'
import reactPropTypes from 'prop-types'
import { omdbClient } from '@/context'

/** A React Context that provides access to the OMDbClient */
export const OMDbClientContext = React.createContext(omdbClient)

/**
 * A React Context.Provider to gain access to the current OMDbClient module instance
 * @param {Object} props -
 * @param {import('react').ReactNode} props.children -
 *      the children to render within the context
 * @returns {import('react').ProviderExoticComponent}
 */
export function OMDbClientContextProvider({ children }) {
  return (
    <OMDbClientContext.Provider value={omdbClient}>
      {children}
    </OMDbClientContext.Provider>
  )
}

OMDbClientContextProvider.propTypes = {
  children: reactPropTypes.node.isRequired
}

/**
 * A HOC that wraps a component with the OMDbClientContextProvider around it
 *
 * @param {import('react').Component|Function} Component - the component to wrap with
 *      the OMDbClientContextProvider around it
 * @returns {import('react').NamedExoticComponent} - the wrapped component
 */
export function withinOMDbClientContextProvider(Component) {
  const wrapper = (props) => (
    <OMDbClientContextProvider>
      <Component {...props} />
    </OMDbClientContextProvider>
  )
  wrapper.displayName = `OMDbClientContextProvider$Wrapper(${
    Component.displayName || Component.name || 'Component'
  })`
  return wrapper
}