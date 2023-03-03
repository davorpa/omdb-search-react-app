export function createJsonResponseImporting(
  jsonFilePath,
  status = 200,
  statusText = 'OK'
) {
  return {
    json: async () => import(jsonFilePath).then((module) => module.default),
    get ok() {
      return isOkResponseStatus(this.status)
    },
    status: status ?? 0,
    statusText: statusText ?? ''
  }
}

export function createJsonResponseResolvedWith(
  data,
  status = 200,
  statusText = 'OK'
) {
  return {
    json: async () => Promise.resolve(data),
    get ok() {
      return isOkResponseStatus(this.status)
    },
    status: status ?? 0,
    statusText: statusText ?? ''
  }
}

export function createJsonResponseRejectedWith(error) {
  return {
    json: () => Promise.reject(error),
    get ok() {
      return isOkResponseStatus(this.status)
    },
    status: 0,
    statusText: ''
  }
}

function isOkResponseStatus(status) {
  return status >= 200 && status < 300
}
