/**
 * @file This module provides the OMDbClient Context of the application
 * @module context/omdb/client
 * @see {@link https://reactjs.org/docs/context.html|React Context}
 */
import React from 'react'
import reactPropTypes from 'prop-types'
import { omdbClient } from '@/context'

/**
 * A React `Context` that provides access to the `OMDbClient`
 * @type {import('react').Context<import('../../services/omdb').OMDbAbstractClient>}
 */
export const OMDbClientContext = React.createContext()

/**
 * A React `Context.Provider` to gain access to the current `OMDbClient` module instance
 *
 * @function OMDbClientContextProvider
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
 * @function withinOMDbClientContextProvider
 * @param {import('react').Component|import('react').FunctionComponent} Component - the component to wrap with
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
