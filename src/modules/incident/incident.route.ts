import { Router } from 'express';
import { getIncident } from './incident.controller';
import { logUploadMiddleware } from '../../middlewares/log-upload.middleware';

const router = Router();

router.post('/', logUploadMiddleware, getIncident)

export default router;