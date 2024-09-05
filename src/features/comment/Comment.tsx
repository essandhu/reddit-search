import moment from "moment"
import ReactMarkdown from "react-markdown"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Comment({ comment }: any) {
  return (
    <div className="flex space-x-4 p-4 bg-secondary rounded-lg">
      <Avatar>
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`}
        />
        <AvatarFallback>
          {comment.author.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <p className="font-semibold">{comment.author}</p>
          <p className="text-sm text-muted-foreground">
            {moment.unix(comment.created_utc).fromNow()}
          </p>
        </div>
        <ReactMarkdown className="prose prose-sm max-w-none">
          {comment.body}
        </ReactMarkdown>
      </div>
    </div>
  )
}
