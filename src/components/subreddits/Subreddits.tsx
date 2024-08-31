import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from "../../components/card/Card"
import {
  fetchSubreddits,
  selectSubreddits,
} from "../../features/reddit/subredditSlice"
import "./Subreddits.css"
import {
  setCurSubreddit,
  selectCurSubreddit,
} from "../../features/reddit/redditSlice"
import defaultSubredditImage from "../../images/reddit-alien.png"

const Subreddits = () => {
  const dispatch = useDispatch<any>()
  const subreddits = useSelector(selectSubreddits)
  const selectedSubreddit = useSelector(selectCurSubreddit)

  useEffect(() => {
    dispatch(fetchSubreddits())
  }, [dispatch])

  return (
    <Card className="subreddit-card">
      <h2>Popular Subreddits</h2>
      <ul className="subreddits-list">
        {subreddits.map(subreddit => (
          <li
            key={subreddit.id}
            className={`${
              selectedSubreddit === subreddit.url && `selected-subreddit`
            }`}
          >
            <button
              type="button"
              onClick={() => {
                dispatch(setCurSubreddit(subreddit.display_name))
              }}
            >
              <img
                src={subreddit.icon_img || defaultSubredditImage}
                alt={`${subreddit.display_name}`}
                className="subreddit-icon"
                style={{ border: `3px solid ${subreddit.primary_color}` }}
              />
              {subreddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default Subreddits
