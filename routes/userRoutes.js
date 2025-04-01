import express from 'express';
import { createUser } from '../controllers/userController.js';
import { getAllUser } from '../controllers/userController.js';
import { deleteUser } from '../controllers/userController.js';
import { updateUser } from '../controllers/userController.js';
import { getPost } from '../controllers/userController.js';
import { createPost } from '../controllers/userController.js';
const router = express.Router();

router.route('/users/create').post(createUser);
router.route('/users/').get(getAllUser);
router.route('/users/:email').delete(deleteUser);
router.route('/users/update/:email').patch(updateUser);

router.route('/posts').get(getPost);
router.route('/posts/create').post(createPost);
export default router;

