const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  viewCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: View user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart data with items and total
 */
router.get('/', auth, viewCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add item to user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - quantity
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 686ddd99b8dec9f1538fef50
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item added successfully
 *                 cartItem:
 *                   type: object
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */
router.post('/add', auth, addToCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     summary: Update quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item_id
 *               - quantity
 *             properties:
 *               item_id:
 *                 type: string
 *                 example: 686ddd99b8dec9f1538fef50
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Quantity updated
 *       400:
 *         description: Invalid input
 */
router.put('/update', auth, updateCartItem);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     summary: Remove cart for current user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart deleted
 *       500:
 *         description: Server error
 */
router.delete('/remove', auth, removeCartItem);

module.exports = router;
