import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import PostList from "./components/postlist/PostList"
import SearchBar from "./components/searchbar/SearchBar"
import Subreddits from "./components/subreddits/Subreddits"

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SearchBar />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-3">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <PostList />
          </ScrollArea>
        </Card>
        <Card>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <Subreddits />
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}
