import type { CacheService } from '@/shared'

import type * as PostsRepositoryDTO from './dto'
import type { PostsNetworkSources } from '../../sources'

export class PostsRepository {
  private readonly keys = {
    postList: (params?: PostsRepositoryDTO.PostListParams) => ['posts', 'list', params],
    post: (id: string) => ['posts', 'item', id],
  }

  constructor(
    private readonly postsNetworkSources: PostsNetworkSources,
    private readonly cache: CacheService,
  ) { }

  public getPostListQuery = (params?: PostsRepositoryDTO.PostListParams) =>
    this.cache.createQuery<PostsRepositoryDTO.PostList>(
      async () => {
        const { data } = await this.postsNetworkSources.getPostList(params)
        return data
      },
      {
        queryKey: this.keys.postList(params),
      },
    )

  public getPostByIdQuery = (id: string) =>
    this.cache.createQuery<PostsRepositoryDTO.Post>(
      async () => {
        const { data } = await this.postsNetworkSources.getPostById(id)
        return data
      },
      {
        queryKey: this.keys.post(id),
      },
    )

  public createPostMutation = () =>
    this.cache.createMutation(
      async (newPost: PostsRepositoryDTO.CreatePostInput) => {
        const { data } = await this.postsNetworkSources.createPost(newPost)
        return data
      },
      {
        onSuccess: () => {
          this.getPostListQuery().invalidate()
        },
      },
    )

  public updatePostMutation = () =>
    this.cache.createMutation(
      async (updatedPost: PostsRepositoryDTO.UpdatePostInput) => {
        const { data } = await this.postsNetworkSources.updatePost(updatedPost)
        return data
      },
      {
        onSuccess: (updatedPost) => {
          this.getPostListQuery().invalidate()
          this.getPostByIdQuery(updatedPost.id).invalidate()
        },
      },
    )

  public deletePostMutation = () =>
    this.cache.createMutation(
      async (id: string) => {
        const data = await this.postsNetworkSources.deletePost(id)
        return data
      },
      {
        onSuccess: (_, id) => {
          this.getPostListQuery().invalidate()
          this.getPostByIdQuery(id).invalidate()
        },
      },
    )
}
