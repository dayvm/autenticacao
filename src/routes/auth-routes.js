 import express from 'express'
 import { login, refresh, signup} from '../controllers/auth.controller.js'

 const router = express.Router();

 router.post('/login', login)

 router.post('/refresh', refresh)

 router.post('/signup', signup)

 export default router;