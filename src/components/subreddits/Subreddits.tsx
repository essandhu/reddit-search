import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchSubreddits,
  selectSubreddits,
} from "../../features/reddit/subredditSlice"
import {
  setCurSubreddit,
  selectCurSubreddit,
} from "../../features/reddit/redditSlice"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Subreddits() {
  const dispatch = useDispatch<any>()
  const subreddits = useSelector(selectSubreddits)
  const selectedSubreddit = useSelector(selectCurSubreddit)

  useEffect(() => {
    dispatch(fetchSubreddits())
  }, [dispatch])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Popular Subreddits</h2>
      <div className="space-y-2">
        {subreddits.map(subreddit => (
          <Button
            key={subreddit.id}
            variant={
              selectedSubreddit === subreddit.url ? "secondary" : "ghost"
            }
            className="w-full justify-start"
            onClick={() => dispatch(setCurSubreddit(subreddit.display_name))}
          >
            <Avatar className="mr-2">
              <AvatarImage
                src={subreddit.icon_img}
                alt={subreddit.display_name}
              />
              <AvatarFallback>
                {subreddit.display_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {subreddit.display_name}
          </Button>
        ))}
      </div>
    </div>
  )
}
