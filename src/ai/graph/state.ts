export interface ParsedLogEntry {
  timestamp: string;        
  level: "INFO" | "WARN" | "ERROR" | "DEBUG" | "UNKNOWN";
  service: string;
  message: string;
  code?: string;
  context?: Record<string, any>;
}

export type IncidentType =
  | "PAYMENT_FAILURE"
  | "DATABASE_ERROR"
  | "NETWORK_TIMEOUT"
  | "AUTHENTICATION_FAILURE"
  | "INVENTORY_ISSUE"
  | "MULTI_SERVICE_FAILURE"
  | "UNKNOWN";
  
export interface IncidentState {
    rawLogs: string;
    severity: 'low' | 'medium' | 'high';
    recommendedFixes: string[];
    systemInfo?: string;
    parsedLogs?: ParsedLogEntry[];
    incidentType?: IncidentType[];
    rootCause?: string;
    confidenceScore?: string;
    classificationReasoning: string;
    incidentReport?: {
        summary: string;
        actionItems: string[];
        status?: "pending" | "reviewed" | "resolved";
        timestamp: string;
    },
    similarIncidents?:  Array<{
        id: string;
        summary: string;
        resolution: string;
    }>; 
}