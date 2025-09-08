import { makeAutoObservable } from 'mobx'

import type { PostsRepository, PostsRepositoryDTO } from '../../external'

import { postsRepository } from '../../external'

export class UIStore {
  constructor(private readonly postsRepository: PostsRepository) {
    makeAutoObservable(this)
  }

  private get listQuery() {
    return this.postsRepository.getPostListQuery()
  }

  public get posts(): PostsRepositoryDTO.PostListItem[] {
    return this.listQuery.result.data?.data || []
  }

  public get isLoading(): boolean {
    return this.listQuery.result.isPending
  }

  public get isError(): boolean {
    return this.listQuery.result.isError
  }

  public get error(): Error | null {
    return this.listQuery.result.error
  }

  public get isEmpty(): boolean {
    return this.posts.length === 0
  }
}

export function createUIStore() {
  return new UIStore(postsRepository)
}
