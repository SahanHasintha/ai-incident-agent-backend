import { Request, Response } from 'express';
import { parseLogsNode } from '../../ai/nodes/parseLogs.node'
import incidentGraph from '../../ai/graph/incident.graph';

export const getIncident = async (_req: Request, _res: Response) => {
    // const rawData = `2026-02-17 14:30:12 INFO AuthService: User login successful for userId=1001
    //     2026-02-17 14:31:05 WARN PaymentService: Payment processing delay detected for orderId=5012
    //     2026-02-17 14:32:44 ERROR PaymentService: Payment failed for userId=1002, orderId=5013
    //     2026-02-17 14:33:10 DEBUG InventoryService: Checking stock levels for productId=3001
    //     2026-02-17 14:34:02 ERROR DatabaseService: Connection timeout while accessing Orders table
    //     2026-02-17 14:35:18 INFO NotificationService: Email sent successfully to userId=1003
    //     2026-02-17 14:36:27 WARN AuthService: Multiple failed login attempts detected for userId=1004
    //     2026-02-17 14:37:41 ERROR PaymentService: Refund processing failed for orderId=5014
    //     2026-02-17 14:38:55 DEBUG PaymentService: Retry mechanism triggered for orderId=5013
    //     2026-02-17 14:39:20 INFO ReportingService: Daily sales report generated successfully`;
    console.log("Server called")
    const rawData = (_req as any).rawData as string;
    const raw = await incidentGraph.invoke({
        rawLogs: rawData
    });

    console.log(raw);

    return _res.status(200).json({
        message: 'success',
        data: {
            incidentType: raw?.incidentType,
            rootCause: raw?.rootCause,
            confidenceScore: raw?.confidenceScore,
            classificationReasoning: raw?.classificationReasoning
        }
    })
}