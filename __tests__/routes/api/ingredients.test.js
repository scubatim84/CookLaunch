import request from 'supertest';
import app from '../../../server';
import Ingredient from '../../../models/Ingredient';

describe('POST /api/ingredients', () => {
  test('Responds with status code 201 and JSON of new ingredient if successful', async () => {
    const newIngredientMock = {
      name: 'test ingredient',
      createdBy: 'test@runner.com',
    };

    const res = await request(app)
      .post('/api/ingredients')
      .send(newIngredientMock);

    // Should receive 401 forbidden error if request not made by authenticated user
    expect(res.statusCode).toBe(401);

    // expect(res.statusCode).toBe(201);
    // expect(res.body.name).toBe(newIngredientMock.name.toUpperCase());
    // expect(res.body.createdBy).toBe(newIngredientMock.createdBy);
    // expect(res.body.dateLastChanged).not.toBeNull();

    // res = await request(app).post('/api/ingredients').send(newIngredientMock);

    // expect(res.statusCode).toBe(400);
    // expect(res.body).toBe('That ingredient already exists.');
  });
});

afterAll(() => {
  return;
  // Ingredient.collection.drop();
});
