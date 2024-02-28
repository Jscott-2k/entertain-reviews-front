import { http, HttpResponse  } from 'msw'
import platforms from './data/platforms.json'
import gameScores from './data/game-scores.json'
import game from './data/game.json'
import reviewedGames from './data/reviewed-games.json'
import reviews from './data/reviews.json'
import screenshots from './data/screenshots.json'
import users from './data/sensitive/user.json';

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
  }),
  http.get('/users', ({request}) => {

    const url = new URL(request.url)
    const id  = url.searchParams.get('id')
    const email = url.searchParams.get('email');
    const display = url.searchParams.get('display');

    console.info("MSW: Searching for user with ID:", id, "Email:", email, "Name:", name);

    let user = null;

    if (id) {
      // Search by ID
      user = users.find(user => user.id === id);
    } else if (email) {
      // Search by email
      user = users.find(user => user.email === email);
    } else if (display) {
      // Search by name
      user = users.filter(user => user.display === display);
    }

    console.info("MSW: Found user:", user);

    return HttpResponse.json(user)
  }),
]