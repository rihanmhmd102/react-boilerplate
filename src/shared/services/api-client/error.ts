import { NetError } from '../http'

export class ApiDataError extends NetError<{
  errorCustomField?: string
}> { }
