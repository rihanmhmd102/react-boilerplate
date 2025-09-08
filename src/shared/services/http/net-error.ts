export type NetErrorItem<AdditionalInfo extends Record<string, unknown>> = {
  message: string
  additionalInfo: AdditionalInfo
}

export class NetError<
  AdditionalInfo extends Record<string, unknown>,
> extends Error {
  errors: NetErrorItem<AdditionalInfo>[]

  constructor({ errors }: { errors: NetErrorItem<AdditionalInfo>[] }) {
    super(errors[0].message)
    this.errors = errors
  }
}

export const UNAUTHORIZED_HTTP_CODE = 401

export const FORBIDDEN_HTTP_CODE = 403

export const BAD_REQUEST_HTTP_CODE = 400

export const NOT_FOUND_HTTP_CODE = 404

export const INTERNAL_ERROR_HTTP_CODE = 500

export const BAD_REQUEST_ERROR_INFO = {
  code: BAD_REQUEST_HTTP_CODE,
  message: 'Request error',
}

export const NOT_FOUND_ERROR_INFO = {
  code: NOT_FOUND_HTTP_CODE,
  message: 'Server not responding',
}

export const UNAUTHORIZED_HTTP_INFO = {
  code: UNAUTHORIZED_HTTP_CODE,
  message: 'User not authorized',
}

export const INTERNAL_ERROR_INFO = {
  httpCode: INTERNAL_ERROR_HTTP_CODE,
  message: 'Unknown error',
}
