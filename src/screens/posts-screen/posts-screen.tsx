import { observer } from 'mobx-react-lite'

import { PostList } from '@/modules/post'

import './posts-screen.css'

const PostsScreen = observer(() => {
  return (
    <div className="hero-content">
      <div className="posts-screen__container">
        <div className="posts-screen__content">
          <PostList />
        </div>
      </div>
    </div>
  )
})

export default PostsScreen
