/**
 * Represents an inmutable error that happens in the OMDb service layer.
 *
 * @extends {Error}
 * @memberof module:services/omdb
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
 */
class OMDbError extends Error {
  /**
   * Creates a new instance of the OMDb Error class.
   */
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
   *
   * @return {string}
   * @readonly
   * @type {string}
   * @override
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name
   */
  get name() {
    return 'OMDbError'
  }

  /**
   * Converts this class instances to JSON string.
   * `JSON.stringify()` calls this mixin when marshalling to JSON.
   *
   * @return {Object}
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior
   */
  toJSON(/* key */) {
    const obj = {
      name: this.name,
      error: this.error,
      message: this.message
    }
    // Only include stack trace in development mode
    if (this.stack && import.meta.env.MODE === 'development') {
      obj.stack = this.stack
    }
    return obj
  }

  /**
   * Property that acts as an exportable JSON mark. Always `true`.
   * This property is used to identify the error type when exporting to JSON.
   *
   * @return {bool}
   * @readonly
   * @type {bool}
   * @protected
   */
  get error() {
    return true
  }
}

export default OMDbError
