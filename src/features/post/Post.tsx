import { useState } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpIcon, ArrowDownIcon, MessageSquareIcon } from "lucide-react"
import moment from "moment"
import shortenNumber from "../../utils/shortenNumber"
import Comment from "../comment/Comment"

export default function Post({ post, onToggleComments }: any) {
  const [voteValue, setVoteValue] = useState(0)

  const onHandleVote = (newValue: number) => {
    setVoteValue(newValue === voteValue ? 0 : newValue)
  }

  const renderComments = () => {
    if (post.errorComments) {
      return <div className="text-red-500">Error loading comments.</div>
    }

    if (post.loadingComments) {
      return <div className="animate-pulse">Loading comments...</div>
    }

    if (post.showingComments) {
      return (
        <div className="space-y-4">
          {post.comments.map((comment: any) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`}
          />
          <AvatarFallback>
            {post.author.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{post.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Posted by u/{post.author} {moment.unix(post.created_utc).fromNow()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {post.url && (
          <img
            src={post.url}
            alt={post.title}
            className="w-full h-auto rounded-md mb-4"
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant={voteValue === 1 ? "default" : "ghost"}
            onClick={() => onHandleVote(1)}
          >
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            {shortenNumber(post.ups, 1)}
          </Button>
          <Button
            size="sm"
            variant={voteValue === -1 ? "default" : "ghost"}
            onClick={() => onHandleVote(-1)}
          >
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          </Button>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onToggleComments(post.permalink)}
        >
          <MessageSquareIcon className="h-4 w-4 mr-1" />
          {shortenNumber(post.num_comments, 1)} Comments
        </Button>
      </CardFooter>
      {renderComments()}
    </Card>
  )
}
