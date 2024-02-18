import { http, HttpResponse } from 'msw'
import platforms from './data/platforms.json'
import gameScores from './data/game-scores.json'
import game from './data/game.json'
import reviewedGames from './data/reviewed-games.json'
import reviews from './data/reviews.json'
import screenshots from './data/screenshots.json'

export const handlers = [
  http.post('/platforms', () => {
    return HttpResponse.json(platforms)
  }),
  http.post('/game', () => {
    return HttpResponse.json(game)
  }),
  http.post('/reviewed-games', () => {
    return HttpResponse.json(reviewedGames)
  }),
  http.post('/game-scores', () => {
    return HttpResponse.json(gameScores)
  }),
  http.post('/review', () => {
    return HttpResponse.json()
  }),
  http.post('/review-snippets', () => {
    return HttpResponse.json(reviews)
  }),
  http.post('/screenshots', () => {
    return HttpResponse.json(screenshots)
  })
]