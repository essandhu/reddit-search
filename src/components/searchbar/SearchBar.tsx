import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurSubreddit } from "../../features/reddit/redditSlice"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch<any>()
  const searchTerm = useSelector((state: any) => state.reddit?.searchTerm)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(setCurSubreddit(query))
  }

  useEffect(() => {
    setQuery(searchTerm)
  }, [searchTerm])

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="../../public/images/reddit-alien.svg"
            alt="Reddit Alien"
            className="w-12 h-12 mr-4"
          />
          <h1 className="text-3xl font-bold">Reddit Search</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm items-center space-x-2"
        >
          <Input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search Reddit..."
            className="flex-grow"
          />
          <Button type="submit" variant="secondary">
            <SearchIcon className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>
    </header>
  )
}
