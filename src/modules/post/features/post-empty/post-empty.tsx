import './post-empty.css'

export function PostEmpty() {
  return (
    <div className="post-empty">
      <div className="post-empty__icon">
        📝
      </div>

      <h2 className="post-empty__title">
        No Posts Found
      </h2>

      <p className="post-empty__subtitle">
        There are no posts to display yet
      </p>

      <div className="post-empty__description">
        Posts will appear here once they are created. Check back later or create your first post!
      </div>
    </div>
  )
}
