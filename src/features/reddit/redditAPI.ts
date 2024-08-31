export const API_ROOT = "https://www.reddit.com"

export const redditAPI = {
  getPosts: async (subreddit: string) => {
    const response = await fetch(`${API_ROOT}/r/${subreddit}.json`)
    const json = await response.json()
    return json.data.children.map((child: any) => child.data)
  },
  getSubreddits: async () => {
    const response = await fetch(`${API_ROOT}/subreddits.json`)
    const json = await response.json()
    return json.data.children.map((child: any) => child.data)
  },
  getPostComments: async (permalink: string) => {
    const response = await fetch(`${API_ROOT}${permalink}.json`)
    const json = await response.json()
    return json[1].data.children.map((child: any) => child.data)
  },
}
