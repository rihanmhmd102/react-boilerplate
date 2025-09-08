import './post-error.css'

type Props = {
  error: Error | string
}

export function PostError({ error }: Props) {
  const errorMessage = typeof error === 'string' ? error : error.message

  return (
    <div className="post-error">
      <div className="post-error__icon">
        ⚠️
      </div>

      <h2 className="post-error__title">
        Failed to Load Posts
      </h2>

      <p className="post-error__subtitle">
        Something went wrong
      </p>

      <div className="post-error__description">
        {errorMessage}
      </div>
    </div>
  )
}
