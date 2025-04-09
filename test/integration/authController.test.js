import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app.js'; // exporta tu app express desde app.js
import User from '../../models/User.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe('Integration Testing - Auth Controller', () => {

  test('Registro de Usuario Exitoso', async () => {
    const response = await request(app)
      .post('/api/v0/users/create')
      .send({
        name: 'Juan Perez',
        email: 'juan@example.com',
        password: 'secure123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name', 'Juan Perez');
    expect(response.body).toHaveProperty('email', 'juan@example.com');
    expect(response.body).not.toHaveProperty('token'); // Asegúrate de que no se devuelva el token aquí
  });

  test('Falla al registrar usuario ya existente', async () => {
    await User.create({
      name: 'Juan Perez',
      email: 'juan@example.com',
      password: 'hashedPassword123',
    });

    const response = await request(app)
      .post('/api/v0/users/create') // ✅ Ruta corregida
      .send({
        name: 'Juan Perez',
        email: 'juan@example.com',
        password: 'secure123',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/duplicate key/i);
  });

  test('Login Exitoso', async () => {
    const newUser = await User.create({
      name: 'Luis Gomez',
      email: 'luis@example.com',
      password: 'mypassword',
    });

    const response = await request(app)
      .post('/api/v0/login') // ✅ Ruta corregida
      .send({
        email: 'luis@example.com',
        password: 'mypassword',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.email).toBe('luis@example.com');
  });

  test('Login Fallido - Contraseña Incorrecta', async () => {
    await User.create({
      name: 'Luis Gomez',
      email: 'luis@example.com',
      password: 'mypassword',
    });

    const response = await request(app)
      .post('/api/v0/login') // ✅ Ruta corregida
      .send({
        email: 'luis@example.com',
        password: 'wrongpassword',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });

});
