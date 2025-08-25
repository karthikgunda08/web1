// src/__tests__/payment.test.js
import request from 'supertest';
import { app } from '../server.js';
import { createTestUser, clearTestData, getAuthHeader } from './utils/testSetup.js';
import User from '../models/User.js';

describe('Payment Endpoints', () => {
    let testUser;
    let authToken;

    beforeEach(async () => {
        await clearTestData();
        const result = await createTestUser();
        testUser = result.user;
        authToken = result.token;
    });

    describe('POST /api/payments/create-credit-order', () => {
        it('should create a credit purchase order', async () => {
            const orderData = {
                credits: 100
            };

            const res = await request(app)
                .post('/api/payments/create-credit-order')
                .set(getAuthHeader(authToken))
                .send(orderData);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('orderId');
            expect(res.body).toHaveProperty('amount');
            expect(res.body.amount).toBe(orderData.credits * 10); // Assuming 10 rupees per credit
        });

        it('should not create order with invalid credit amount', async () => {
            const res = await request(app)
                .post('/api/payments/create-credit-order')
                .set(getAuthHeader(authToken))
                .send({ credits: -50 });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('POST /api/payments/verify-credit-payment', () => {
        it('should verify successful payment and add credits', async () => {
            const initialCredits = testUser.credits;
            const creditsPurchased = 100;

            // Simulate Razorpay webhook payload
            const mockPayload = {
                payload: {
                    payment: {
                        entity: {
                            notes: {
                                userId: testUser._id.toString(),
                                credits: creditsPurchased
                            }
                        }
                    }
                }
            };

            const res = await request(app)
                .post('/api/payments/verify-credit-payment')
                .send(mockPayload)
                .set('x-razorpay-signature', 'valid-signature'); // You'll need to mock signature verification

            expect(res.statusCode).toBe(200);

            // Verify credits were added
            const updatedUser = await User.findById(testUser._id);
            expect(updatedUser.credits).toBe(initialCredits + creditsPurchased);
        });

        it('should handle invalid payment verification', async () => {
            const res = await request(app)
                .post('/api/payments/verify-credit-payment')
                .send({})
                .set('x-razorpay-signature', 'invalid-signature');

            expect(res.statusCode).toBe(400);
        });
    });

    describe('GET /api/payments/credit-history', () => {
        it('should get user payment history', async () => {
            const res = await request(app)
                .get('/api/payments/credit-history')
                .set(getAuthHeader(authToken));

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });
    });
});
