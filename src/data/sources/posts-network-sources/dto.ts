export type Post = {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
}

export type PostListItem = {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
}

export type PostList = {
  data: PostListItem[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type CreatePostInput = {
  title: string
  content: string
}

export type UpdatePostInput = {
  id: string
  title: string
  content: string
}

export type PostListParams = {
  page?: number
  limit?: number
  search?: string
  authorId?: string
}
