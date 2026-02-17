import { Router } from 'express';
import { getIncident } from './incident.controller';

const router = Router();

router.get('/', getIncident)

export default router;