import express from 'express';
import {getAllParameters, createNewParameter, getParameterById, updateParameter,deleteParameter} from '../controllers/Parameter.js';

const router = express.Router();

router.get('/', getAllParameters);
router.get('/parameterId=:parameterId', getParameterById);
router.post('/create', createNewParameter);
router.put('/update/parameterId=:parameterId', updateParameter);
router.delete('/delete/parameterId=:parameterId', deleteParameter);

export default router;