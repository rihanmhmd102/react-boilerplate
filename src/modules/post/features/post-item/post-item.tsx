import { observer } from 'mobx-react-lite'

import { i18n } from '@/shared'

import './post-item.css'
import type { PostsRepositoryDTO } from '../../external'

type Props = {
  post: PostsRepositoryDTO.PostListItem
}

export const PostItem = observer(({ post }: Props) => {
  const { intl } = i18n
  return (
    <article className="post-item">
      <header className="post-item__header">
        <h3 className="post-item__title">
          {post.title}
        </h3>
      </header>

      <div className="post-item__content">
        {post.content}
      </div>

      <footer className="post-item__footer">
        <span className="post-item__updated">
          Updated:
          {' '}
          {intl.formatDate(post.updatedAt)}
        </span>
      </footer>
    </article>
  )
})
