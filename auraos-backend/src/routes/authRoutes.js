
// src/routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { registerValidation } from '../middleware/validation/authValidation.js';
import { handleValidation } from '../middleware/validation/handleValidation.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: User's password (min 6 characters)
 *               phoneNumber:
 *                 type: string
 *                 description: Optional phone number
 *               whatsappOptIn:
 *                 type: boolean
 *                 description: Opt-in for WhatsApp notifications
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT access token
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.post('/register', registerValidation, handleValidation, authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.get('/me', authMiddleware, authController.getProfile);

// Routes for user profile management
router.put('/me', authMiddleware, authController.updateProfile);
router.post('/me/change-password', authMiddleware, authController.changePassword);

// Password Reset Routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Route for user dashboard analytics
router.get('/me/analytics', authMiddleware, authController.getUserAnalytics);

// NEW: Route for API Key Management
router.post('/me/api-key', authMiddleware, authController.generateApiKey);

// NEW: Routes for workspace management
router.get('/me/workspaces', authMiddleware, authController.getWorkspaces);
router.post('/me/workspaces', authMiddleware, authController.saveWorkspace);
router.delete('/me/workspaces/:workspaceId', authMiddleware, authController.deleteWorkspace);


export default router;
