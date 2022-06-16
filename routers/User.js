import express from "express";
import { getAllUser, getUserById, createNewUser, updateUser, deleteUser, checkUser } from "../controllers/User.js"

const router = express.Router();

router.get('/', getAllUser);
router.get('/userId=:userID', getUserById);
router.post('/', createNewUser);
router.put('/userId=:userID', updateUser);
router.delete('/userId=:userID', deleteUser);
router.post('/sign-in', checkUser);


export default router;