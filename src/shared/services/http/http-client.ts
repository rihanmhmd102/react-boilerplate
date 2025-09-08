import type {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

import axios from 'axios'
import qs from 'query-string'
import axiosRetry from 'axios-retry'

import { NetError } from './net-error'

type ErrorHandler = (error: HttpServiceError<unknown, unknown>) => unknown
type ErrorFormatter<
  CurrentDataError extends NetError<Record<string, unknown>>,
> = (error: HttpServiceError<any, any>) => CurrentDataError

export type HttpService = {
  init: (config: HttpServiceInitConfig) => HttpService
  subscribeOnError: (func: ErrorHandler) => void
  initErrorFormatter: <
    CurrentDataError extends NetError<Record<string, unknown>>,
  >(
    func: ErrorFormatter<CurrentDataError>,
  ) => void
} & AxiosInstance

export type HttpServiceError<T, D> = AxiosError<T, D>

export type HttpServiceResponse<T, D = T> = AxiosResponse<T, D>

export type HttpServicePromise<T> = AxiosPromise<T>

type HttpServiceConfig = AxiosRequestConfig

type HttpServiceInitConfig = Pick<HttpServiceConfig, 'baseURL'>

export function createHttpService(config: HttpServiceConfig = {}): HttpService {
  const errorListeners: ErrorHandler[] = []
  let errorFormatter: ErrorFormatter<NetError<Record<string, unknown>>> = () =>
    new NetError({
      errors: [{ message: 'Unknown error', additionalInfo: {} }],
    })

  const httpService = axios.create({
    timeout: 3000,
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params)
      },
    },
    ...config,
  }) as HttpService

  axiosRetry(httpService, { retries: 3 })

  httpService.subscribeOnError = (func) => {
    errorListeners.push(func)
  }

  httpService.initErrorFormatter = (func) => {
    errorFormatter = func
  }

  httpService.interceptors.response.use(
    res => res,
    (error) => {
      errorListeners.forEach((func) => {
        func(error)
      })

      return Promise.reject(errorFormatter(error))
    },
  )

  httpService.init = (newConfig?: HttpServiceInitConfig) => {
    if (newConfig) {
      httpService.defaults.baseURL = newConfig.baseURL
    }

    return httpService
  }

  return httpService
}

export function setStaticAuthToken(httpService: HttpService, token: string) {
  httpService.defaults.headers.common.authorization = token
}
