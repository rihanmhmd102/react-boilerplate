import { faker } from '@faker-js/faker'

import type * as PostsNetworkSourcesDTO from './dto'
import type { PostsNetworkSources } from './posts-network-sources'

import { postsNetworkSources } from './posts-network-sources'
import { makeFakeSourceRes } from '../utils/make-fake-source-res'

const postsNetworkSourcesFaker = {
  makePost(data?: Partial<PostsNetworkSourcesDTO.Post>): PostsNetworkSourcesDTO.Post {
    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      content: faker.lorem.paragraphs({ min: 2, max: 5 }, '\n\n'),
      authorId: faker.string.uuid(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      ...data,
    }
  },

  makePostListItem(data?: Partial<PostsNetworkSourcesDTO.PostListItem>): PostsNetworkSourcesDTO.PostListItem {
    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      content: faker.lorem.paragraph({ min: 1, max: 3 }),
      authorId: faker.string.uuid(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      ...data,
    }
  },

  makePostList(length: number = 10, overrides?: Partial<PostsNetworkSourcesDTO.PostListItem>): PostsNetworkSourcesDTO.PostList {
    const posts = Array.from({ length }, () =>
      this.makePostListItem(overrides))

    return {
      data: posts,
      meta: {
        total: faker.number.int({ min: length, max: length * 2 }),
        page: faker.number.int({ min: 1, max: 5 }),
        limit: length,
        totalPages: faker.number.int({ min: 1, max: 10 }),
      },
    }
  },

  makeCreatePostInput(data?: Partial<PostsNetworkSourcesDTO.CreatePostInput>): PostsNetworkSourcesDTO.CreatePostInput {
    return {
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      content: faker.lorem.paragraphs({ min: 2, max: 4 }, '\n\n'),
      ...data,
    }
  },

  makeUpdatePostInput(data?: Partial<PostsNetworkSourcesDTO.UpdatePostInput>): PostsNetworkSourcesDTO.UpdatePostInput {
    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 3, max: 8 }),
      content: faker.lorem.paragraphs({ min: 2, max: 4 }, '\n\n'),
      ...data,
    }
  },
}

export { postsNetworkSourcesFaker }

export const fakePostsNetworkSources: PostsNetworkSources = {
  ...postsNetworkSources,
  getPostList: async () =>
    makeFakeSourceRes(postsNetworkSourcesFaker.makePostList()),

  getPostById: async (id: string) =>
    makeFakeSourceRes(postsNetworkSourcesFaker.makePost({ id })),

  createPost: async (data: PostsNetworkSourcesDTO.CreatePostInput) =>
    makeFakeSourceRes(postsNetworkSourcesFaker.makePost({
      title: data.title,
      content: data.content,
    })),

  updatePost: async (data: PostsNetworkSourcesDTO.UpdatePostInput) =>
    makeFakeSourceRes(postsNetworkSourcesFaker.makePost({
      id: data.id,
      title: data.title,
      content: data.content,
    })),

  deletePost: async () =>
    makeFakeSourceRes({ success: true }),
}
