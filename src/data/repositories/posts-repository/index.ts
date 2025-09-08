import { cacheInstance, configService } from '@/shared'

import { PostsRepository } from './posts-repository'
import { fakePostsNetworkSources, postsNetworkSources } from '../../sources/posts-network-sources'

const isDevelopment = configService.config.isDevelopment
const useRealAPI = configService.config.useRealAPI

export const postsRepository = new PostsRepository(
  isDevelopment && !useRealAPI ? fakePostsNetworkSources : postsNetworkSources,
  cacheInstance,
)

export * as PostsRepositoryDTO from './dto'
export { PostsRepository } from './posts-repository'
