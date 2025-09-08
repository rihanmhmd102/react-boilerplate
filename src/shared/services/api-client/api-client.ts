import type { ApiDataError } from './error'

import { formatApiError } from './utils'
import { configService } from '../config'
import { createHttpService } from '../http'

/**
 * Create httpService instance
 */
const httpService = createHttpService()

/**
 *
 *@description apiClient initialization
 */
export function initApiHttpClient() {
  const apiHttpClient = httpService.init({
    baseURL: configService.config.apiUrl,
  })

  apiHttpClient.initErrorFormatter<ApiDataError>(formatApiError)
}

/**
 * @description Http service for interacting with main api
 */
export const apiHttpClient = httpService
