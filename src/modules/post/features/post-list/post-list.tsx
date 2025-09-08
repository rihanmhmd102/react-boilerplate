import type { ComponentProps } from 'react'

import { observer } from 'mobx-react-lite'

import { i18n } from '@/shared'

import { PostItem } from '../post-item'
import { PostError } from '../post-error'
import './post-list.css'
import { PostEmpty } from '../post-empty'
import { createUIStore } from '../ui-store'
import { PostLoading } from '../post-loading'

type PostListProps = ComponentProps<'div'>

const { t } = i18n

export const PostList = observer(({ className, ...props }: PostListProps) => {
  const store = createUIStore()

  if (store.isLoading) {
    return <PostLoading />
  }

  if (store.error) {
    return <PostError error={store.error} />
  }

  if (store.isEmpty) {
    return <PostEmpty />
  }

  return (
    <div className={className} {...props}>
      <div className="post-list">
        <h1>
          {t('posts.title', { defaultMessage: 'Posts' })}
        </h1>
        {store.posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
})
