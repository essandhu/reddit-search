import moment from "moment"
import ReactMarkdown from "react-markdown"
import "./Comment.css"
import Avatar from "../avatar/Avatar"

const Comment = (props: any) => {
  const { comment } = props
  return (
    <div className="comment">
      <div className="comment-metadata">
        <Avatar name={comment.author} />
        <p className="comment-author">{comment.author}</p>
        <p className="comment-created-time">
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <ReactMarkdown>{comment.body}</ReactMarkdown>
    </div>
  )
}

export default Comment
