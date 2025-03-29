import express from 'express';
import { createUser } from '../controllers/userController.js';
import { getAllUser } from '../controllers/userController.js';
import { deleteUser } from '../controllers/userController.js';
const router = express.Router();

router.route('/users/create').post(createUser);
router.route('/users/').get(getAllUser);
router.route('/users/:email').delete(deleteUser);
export default router;