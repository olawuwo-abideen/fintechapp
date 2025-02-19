import express, { Request, Response } from 'express';
import UserController from '../controllers/userController';
import { Auth, validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/userValidator';
import { container } from 'tsyringe';

const router = express.Router();
const userController = container.resolve(UserController);

/**
 * @swagger
 * tags:
 *   name: Users
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User signup
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               firstname: "John"
 *               lastname: "Doe"
 *               username: johndoe
 *               email: johndoe@example.com
 *               password: StrongPass123!
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (Validation error)
 */
router.post('/auth/signup', validator(ValidationSchema.registerSchema), (req: Request, res: Response) => {
  return userController.register(req, res);
});
   
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: johndoe@example.com
 *               password: StrongPass123!
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized - Incorrect credentials
 */
router.post('/auth/login', validator(ValidationSchema.loginSchema), (req: Request, res: Response) => {
  return userController.login(req, res);
});

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             example:
 *               email: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       400:
 *         description: Invalid email
 */
router.post('/auth/forgot-password', validator(ValidationSchema.forgotPasswordSchema), (req: Request, res: Response) => {
  return userController.forgotPassword(req, res);
});

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               code: "eyJhbGciOiJIUzI1NiIs..."
 *               email: "johndoe@example.com"
 *               password: "NewStrongPass123!"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or weak password
 */
router.post('/auth/reset-password', validator(ValidationSchema.resetPasswordSchema), (req: Request, res: Response) => {
  return userController.resetPassword(req, res);
});

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', Auth(), (req: Request, res: Response) => {
  return userController.getProfile(req, res);
});

export default router;
