import express, { Router } from 'express'
import  {Register,Login,GetALLuser}  from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'
import Admin from '../middleware/adminMidleware.js'

const router = Router()

router.post('/register',Register)
router.post('/login',Login)
router.get('/users',protect,Admin,GetALLuser)

export default router