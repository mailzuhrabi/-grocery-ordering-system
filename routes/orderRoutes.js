const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createOrder, getOrders, getOrderDetails } = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management (create, view, cancel orders)
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request (e.g., empty cart)
 *       500:
 *         description: Server error
 */
router.post('/', auth, createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders of the logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders returned
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', auth, getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get details of a specific order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details returned
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, getOrderDetails);

module.exports = router;
