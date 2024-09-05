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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function PostList() {
  const dispatch = useDispatch<any>()
  const posts = useSelector(selectPosts)
  const searchTerm = useSelector(selectSearchTerm)
  const curSubreddit = useSelector(selectCurSubreddit)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  const handleToggleComments = (index: number) => {
    const getComments = (permalink: string) => {
      dispatch(fetchComments(index, permalink))
    }
    return getComments
  }

  useEffect(() => {
    dispatch(fetchPosts(curSubreddit))
  }, [curSubreddit, dispatch])

  if (loading) {
    return (
      <div className="space-y-4">
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </div>
    )
  }

  if (error && searchTerm !== "") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Error loading posts. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4 bg-gradient-to-b from-primary/10 to-background rounded-lg shadow-inner">
        <h1 className="text-4xl font-bold mb-6 text-primary mt-[8rem]">
          Welcome to Reddit Search!
        </h1>
        <div className="max-w-2xl space-y-4">
          <p className="text-lg text-foreground/80">
            Explore the vast world of Reddit right from this app. Here's how to
            get started:
          </p>
          <ul className="list-disc list-inside text-left space-y-2 text-foreground/70">
            <li>Enter a subreddit name in the search bar at the top</li>
            <li>Or select a popular subreddit from the list on the right</li>
            <li>Discover trending posts and engage in discussions</li>
          </ul>
          <div className="mt-8 p-4 bg-secondary/50 rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-secondary-foreground">
              Please Note:
            </h2>
            <p className="text-secondary-foreground/80">
              Due to Reddit API limitations, there might be a slight delay in
              loading new posts. If you encounter any issues, please wait a
              moment and try again.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Currently browsing: r/{curSubreddit}
      </h1>
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
