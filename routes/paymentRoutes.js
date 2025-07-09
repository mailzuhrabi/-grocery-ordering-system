const express = require('express');
const router = express.Router();
const { makePayment } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment handling
 */

/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Make a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - order_id
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 999.99
 *               order_id:
 *                 type: string
 *                 example: 64cc92a4f1be3f25dbb31a12
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment completed
 *       400:
 *         description: Payment failed or invalid input
 *       401:
 *         description: Unauthorized (JWT required)
 */
router.post('/', auth, makePayment);

module.exports = router;
