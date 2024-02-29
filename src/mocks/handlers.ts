import { http, HttpResponse } from 'msw';
import platforms from './data/platforms.json';
import gameScores from './data/game-scores.json';
import game from './data/game.json';
import reviewedGames from './data/reviewed-games.json';
import reviews from './data/reviews.json';
import screenshots from './data/screenshots.json';
import users from './data/sensitive/user.json';

export const handlers = [
  http.post('/platforms', () => {
    return HttpResponse.json(platforms);
  }),
  http.post('/game', () => {
    return HttpResponse.json(game);
  }),
  http.post('/reviewed-games', () => {
    return HttpResponse.json(reviewedGames);
  }),
  http.post('/game-scores', () => {
    return HttpResponse.json(gameScores);
  }),
  http.post('/review', () => {
    return HttpResponse.json();
  }),
  http.post('/review-snippets', () => {
    return HttpResponse.json(reviews);
  }),
  http.post('/screenshots', () => {
    return HttpResponse.json(screenshots);
  }),
  http.get('/users', ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const email = url.searchParams.get('email');
    const display = url.searchParams.get('display');

    console.info(
      'MSW: Searching for user with ID:',
      id,
      'Email:',
      email,
      'Name:',
      name
    );

    let user = null;

    if (id) {
      // Search by ID
      user = users.find((user) => user.google_id === id);
    } else if (email) {
      // Search by email
      user = users.find((user) => user.email === email);
    } else if (display) {
      // Search by name
      user = users.filter((user) => user.display === display);
    }

    console.info('MSW: Found user:', user);

    return HttpResponse.json(user);
  }),
  http.put('/users', async ({ request }) => {
    const requestBody = await request.text();
    const updatedUserData = JSON.parse(requestBody);

    // Find the index of the user object in the users array
    const userIndex = users.findIndex((user) => user.google_id === updatedUserData.google_id);

    // If the user exists, update its properties
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUserData };

      // Return the updated user object in the response
      return new Response(JSON.stringify(users[userIndex]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // If the user does not exist, return an error response
      return new Response('User not found', { status: 404 });
    }
  }),
];
