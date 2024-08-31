import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Post from "../../features/post/Post"
import PostLoading from "../../features/post/PostLoading"
import {
  fetchPosts,
  selectPosts,
  fetchComments,
  selectSearchTerm,
  selectCurSubreddit,
  selectLoading,
  selectError,
} from "../../features/reddit/redditSlice"
import "./PostList.css"

const PostList = () => {
  const dispatch = useDispatch<any>()
  const posts = useSelector(selectPosts)
  const searchTerm = useSelector(selectSearchTerm)
  const curSubreddit = useSelector(selectCurSubreddit)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  //const [showComments, setShowComments] = useState(false);
  //const comments = useSelector(selectComments);

  const handleToggleComments = (index: number) => {
    const getComments = (permalink: string) => {
      dispatch(fetchComments(index, permalink))
    }
    return getComments
  }

  useEffect(() => {
    dispatch(fetchPosts(curSubreddit))
  }, [curSubreddit])

  // When the posts are loading
  if (loading) {
    return (
      <div className="loading-list">
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </div>
    )
  }

  // When there is an error
  if (error && searchTerm !== "") {
    return (
      <div className="error">
        <h2>Error loading posts.</h2>
        <h3>Please try again.</h3>
        {/*<button
                    type="button"
                    onClick={() => dispatch(fetchPosts(curSubreddit))}
                >
                    Retry Search?
                </button>*/}
      </div>
    )
  }

  // When there are no posts
  if (posts.length === 0) {
    return (
      <div className="empty">
        <h1>Welcome to Reddit Search!</h1>
        <p>
          To view posts, enter a subreddit name in the search bar at the top
          left, or select a subreddit from the list below.
        </p>
        <p>
          Note: Due to limitations on the Reddit API, new posts will not be
          rendered until a certain timer has elapsed.
        </p>
        <p>
          If you notice pages failing to load, please try again after waiting
          for a brief period.
        </p>
      </div>
    )
  }

  // When there are posts
  return (
    <div className="post-list">
      <h1>Currently browsing: r/{curSubreddit}</h1>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          post={post}
          onToggleComments={handleToggleComments(index)}
        />
      ))}
    </div>
  )
}

export default PostList
