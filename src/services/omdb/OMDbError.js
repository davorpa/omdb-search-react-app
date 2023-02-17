/**
 * Represents an inmutable error over the OMDb service.
 *
 * @class OMDbError
 * @extends {Error}
 * @memberof module:services/omdb
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
 */
export class OMDbError extends Error {
  constructor(message, ...params) {
    // provide toString() message and
    // pass remaining arguments (including vendor specific ones) to parent constructor
    super(message instanceof Error ? message.message : message, ...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OMDbError)
    }
  }

  /**
   * The inmutable name error itself with extensibility support.
   * ex. Eg in this context: `OMDbError`.
   * @return string
   */
  get name() {
    return this.constructor.name
  }

  /**
   * Converts this class instances to JSON string.
   * `JSON.stringify()` calls this mixin when marshalling to JSON.
   * @return object
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior
   */
  toJSON(/* key */) {
    // start with an empty object
    const jsonObj = {}
    // or emit all properties and all fields
    //   const jsonObj = Object.assign({}, this)

    // add all getter properties
    const proto = Object.getPrototypeOf(this)
    for (const key of Object.getOwnPropertyNames(proto)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key)
      const hasGetter = descriptor && typeof descriptor.get === 'function'
      if (hasGetter) {
        jsonObj[key] = descriptor.get()
      }
    }

    return jsonObj
  }

  /**
   * An exportable JSON mark. Always true.
   * @return bool
   */
  get error() {
    return true
  }
}
