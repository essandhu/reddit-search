import "./App.css"
import PostList from "./components/postlist/PostList"
import SearchBar from "./components/searchbar/SearchBar"
import Subreddits from "./components/subreddits/Subreddits"

const App = () => {
  return (
    <div className="App">
      <div>
        <SearchBar />
      </div>
      <div>
        <PostList />
      </div>
      <div>
        <Subreddits />
      </div>
    </div>
  )
}

export default App
