const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: Wheat Flour
 *               description:
 *                 type: string
 *                 example: High-quality wheat flour
 *               price:
 *                 type: number
 *                 example: 250
 *               stock:
 *                 type: integer
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: Grains
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', createProduct);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /product/update:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 example: 64a1e9a22bcfed43be24d321
 *               name:
 *                 type: string
 *                 example: Updated Product Name
 *               price:
 *                 type: number
 *                 example: 300
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Update failed
 */
router.put('/update', updateProduct);

/**
 * @swagger
 * /product/delete:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *                 example: 64a1e9a22bcfed43be24d321
 *     responses:
 *       200:
 *         description: Product deleted
 *       400:
 *         description: Delete failed
 */
router.delete('/delete', deleteProduct);

module.exports = router;
