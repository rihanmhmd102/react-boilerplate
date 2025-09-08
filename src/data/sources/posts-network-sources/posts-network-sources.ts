import { apiHttpClient } from '@/shared'

import type * as PostsNetworkSourcesDTO from './dto'

export const postsNetworkSources = {
  getPostList: (params?: PostsNetworkSourcesDTO.PostListParams) =>
    apiHttpClient.get<PostsNetworkSourcesDTO.PostList>('/posts', { params }),

  getPostById: (id: string) =>
    apiHttpClient.get<PostsNetworkSourcesDTO.Post>(`/posts/${id}`),

  createPost: (data: PostsNetworkSourcesDTO.CreatePostInput) =>
    apiHttpClient.post<PostsNetworkSourcesDTO.Post>('/posts', data),

  updatePost: (data: PostsNetworkSourcesDTO.UpdatePostInput) =>
    apiHttpClient.put<PostsNetworkSourcesDTO.Post>(`/posts/${data.id}`, data),

  deletePost: (id: string) =>
    apiHttpClient.delete<{ success: boolean }>(`/posts/${id}`),
}

export type PostsNetworkSources = typeof postsNetworkSources
