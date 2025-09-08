// https://js2me.github.io/mobx-tanstack-query/
import type {
  InfiniteQueryConfig,
  MutationConfig,
  QueryFn,
} from 'mobx-tanstack-query'
import type { DefaultError, InfiniteData, InvalidateOptions, InvalidateQueryFilters, QueryKey } from '@tanstack/query-core'
import type {
  CreateInfiniteQueryParams,
  CreateMutationParams,
  CreateQueryParams,
} from 'mobx-tanstack-query/preset'

import { hashKey } from '@tanstack/query-core'
import {
  QueryClient,
} from 'mobx-tanstack-query'
import {
  createInfiniteQuery as $createInfiniteQuery,
  createMutation as $createMutation,
  createQuery as $createQuery,
} from 'mobx-tanstack-query/preset'

export class CacheService {
  private readonly abortController: AbortController
  private readonly queryClient: QueryClient

  constructor(queryClient?: QueryClient) {
    this.abortController = new AbortController()
    this.queryClient = queryClient || new QueryClient({
      defaultOptions: {
        queries: {
          throwOnError: true,
          queryKeyHashFn: hashKey,
          staleTime: 5 * 60 * 1000,
          refetchOnReconnect: 'always',
          retry: 3,
        },
        mutations: {
          throwOnError: true,
        },
      },
    })
  }

  public createQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    queryFn: QueryFn<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
    params?: CreateQueryParams<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
  ) {
    return $createQuery(queryFn, { ...params, queryClient: this.queryClient, abortSignal: this.abortController.signal })
  }

  public createInfiniteQuery<TQueryFnData = unknown, TError = Error, TPageParam = unknown, TData = InfiniteData<TQueryFnData, TPageParam>, TQueryKey extends readonly unknown[] = readonly unknown[]>(fn: InfiniteQueryConfig<TQueryFnData, TError, TPageParam, TData, TQueryKey>['queryFn'], params: CreateInfiniteQueryParams<TQueryFnData, TError, TPageParam, TData, TQueryKey>) {
    return $createInfiniteQuery(fn, { ...params, queryClient: this.queryClient, abortSignal: this.abortController.signal })
  }

  public createMutation<
    TData = unknown,
    TVariables = void,
    TError = Error,
    TContext = unknown,
  >(
    mutationFn: MutationConfig<TData, TVariables, TError, TContext>['mutationFn'],
    params?: Omit<CreateMutationParams<TData, TVariables, TError, TContext>, 'queryClient'>,
  ) {
    return $createMutation(mutationFn, {
      ...params,
      queryClient: this.queryClient,
      abortSignal: this.abortController.signal,
    })
  }

  public async invalidateQueries<TTaggedQueryKey extends QueryKey = QueryKey>(filters?: InvalidateQueryFilters<TTaggedQueryKey>, options?: InvalidateOptions): Promise<void> {
    await this.queryClient.invalidateQueries(filters, options)
  }

  public clear(): void {
    this.queryClient.clear()
  }

  public setQueryData<TData>(queryKey: QueryKey, data: TData): void {
    this.queryClient.setQueryData(queryKey, data)
  }

  public getQueryData<TData>(queryKey: QueryKey): TData | undefined {
    return this.queryClient.getQueryData<TData>(queryKey)
  }

  public get client(): QueryClient {
    return this.queryClient
  }
}

export function createCacheService() {
  return new CacheService()
}

export const cacheInstance = createCacheService()
