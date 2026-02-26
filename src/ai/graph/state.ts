export interface ParsedLogEntry {
  timestamp: string;        
  level: "INFO" | "WARN" | "ERROR" | "DEBUG" | "UNKNOWN";
  service: string;
  message: string;
  code?: string;
  context?: Record<string, any>;
}

export type RecommendedFix = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};

export type IncidentType =
  | "PAYMENT_FAILURE"
  | "DATABASE_ERROR"
  | "NETWORK_TIMEOUT"
  | "AUTHENTICATION_FAILURE"
  | "INVENTORY_ISSUE"
  | "MULTI_SERVICE_FAILURE"
  | "UNKNOWN";
  
export interface IncidentState {
    rawLogs: string; //completed
    severity: 'low' | 'medium' | 'high'; //completed
    recommendedFixes: RecommendedFix[]; 
    systemInfo?: string;
    parsedLogs?: ParsedLogEntry[]; //completed
    incidentType?: IncidentType[]; //completed
    rootCause?: string; //completed
    confidenceScore?: string; //completed
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