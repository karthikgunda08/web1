// src/__tests__/auth.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

describe('Auth Endpoints', () => {
    describe('POST /api/auth/register', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.email).toBe('test@example.com');
        });

        it('should not create a user with existing email', async () => {
            // Create initial user
            await User.create({
                email: 'existing@example.com',
                passwordHash: 'hashedpassword',
            });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'existing@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(409);
            expect(res.body).toHaveProperty('message', 'User with this email already exists.');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Create a test user before each test
            const hashedPassword = await bcrypt.hash('password123', 10);
            await User.create({
                email: 'test@example.com',
                passwordHash: hashedPassword,
            });
        });

        it('should login with correct credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.email).toBe('test@example.com');
        });

        it('should not login with incorrect password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword',
                });

            expect(res.statusCode).toBe(401);
            expect(res.body).toHaveProperty('message', 'Invalid credentials. Password incorrect.');
        });
    });

    describe('GET /api/auth/me', () => {
        let token;
        let user;

        beforeEach(async () => {
            // Create a test user and generate token
            user = await User.create({
                email: 'test@example.com',
                passwordHash: 'hashedpassword',
            });
            token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        });

        it('should get user profile with valid token', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.email).toBe('test@example.com');
            expect(res.body).not.toHaveProperty('passwordHash');
        });

        it('should not get profile without token', async () => {
            const res = await request(app)
                .get('/api/auth/me');

            expect(res.statusCode).toBe(401);
        });
    });
});
