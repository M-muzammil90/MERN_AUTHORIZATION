import express, { Router } from 'express'
import protect from '../middleware/authMiddleware.js'
import Admin from '../middleware/adminMidleware.js'


import { adminGetOrder, CreateOrder, GetOrderById, UpdateOrderStatus } from '../controllers/ProductController.js'

const router = Router()

router.route('/').get(protect, Admin, adminGetOrder).post(protect, CreateOrder)
router.route('/myorders').get(protect, GetOrderById)
router.route('/:id/status').put(protect,Admin, UpdateOrderStatus)

export default router