import express, { Router } from 'express'
import protect from '../middleware/authMiddleware.js'
import Admin from '../middleware/adminMidleware.js'
import upload from '../utils/multer.js'


import { getproduct, CreateProduct, GetProductById, updateProduct, deleteProduct } from '../controllers/ProductController.js'

const router = Router()

router.route('/').get(getproduct).post(protect,Admin,upload.single('images'), CreateProduct)
router.route('/:id').get(GetProductById).put(protect,Admin,upload.single('images'), updateProduct).delete(protect,Admin,deleteProduct)

export default router