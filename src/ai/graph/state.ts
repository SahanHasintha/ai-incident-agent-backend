export interface ParsedLogEntry {
  timestamp: string;        
  level: "INFO" | "WARN" | "ERROR" | "DEBUG" | "UNKNOWN";
  service: string;
  message: string;
  code?: string;
  context?: Record<string, any>;
}

export interface IncidentState {
    rawLogs: string;
    severity: 'low' | 'medium' | 'high';
    recommendedFixes: string[];
    systemInfo?: string;
    parsedLogs?: ParsedLogEntry[];
    incidentType?: string;
    rootCause?: string;
    confidenceScore?: string;
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