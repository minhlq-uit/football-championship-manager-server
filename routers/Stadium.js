import express from 'express';
import { getAllStadium, getStadiumById, createNewStadium, updateStadium, deleteStadium } from '../controllers/Stadium.js';

const router = express.Router();

router.get('/', getAllStadium);
router.get('/:stadiumId', getStadiumById);
router.post('/', createNewStadium);
router.put('/stadiumId=:StadiumId', updateStadium);
router.delete('/stadiumId=:StadiumId', deleteStadium);

export default router;