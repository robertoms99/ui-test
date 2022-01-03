export default interface IThumb {
  name: string
  description: string
  category: string
  picture: string
  lastUpdated: string
  votes: Votes
}

interface Votes {
  positive: number
  negative: number
}
