export class RequestError extends Error {
  statusCode: number

  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const callApi = async (url: RequestInfo, options?: RequestInit) => {
  const response = await window.fetch(url, options)
  const contentType = response.headers.get('Content-Type')

  if (!response.ok) {
    throw new RequestError(`Request completed with error code ${response.status}`, response.status)
  }

  if (
    contentType != null &&
    contentType.includes('application/json')
  ) {
    return response.json()
  }

  return response.text()
}
