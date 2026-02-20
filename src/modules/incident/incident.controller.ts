import { Request, Response } from 'express';
import { parseLogsNode } from '../../ai/nodes/parseLogs.node'
import incidentGraph from '../../ai/graph/incident.graph';

export const getIncident = async (_req: Request, _res: Response) => {
    const rawData = '2026-02-17 14:35:22 DEBUG PaymentService: Payment failed for userId=123456789, orderId=456';

    const raw = await incidentGraph.invoke({
        rawLogs: rawData
    });
    console.log("XXXXXXXX");
    console.log(raw);

    return _res.status(200).json({
        message: 'success'
    })
}