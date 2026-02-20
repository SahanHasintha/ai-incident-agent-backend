export interface ParsedLogEntry {
  timestamp: string;        
  level: "INFO" | "WARN" | "ERROR" | "DEBUG" | "UNKNOWN";
  service: string;
  message: string;
  code?: string;
  context?: Record<string, any>;
}

export interface IncidentState {
    rawLogs: String;
    severity: 'low' | 'medium' | 'high';
    recommendedFixes: String[];
    systemInfo?: String;
    parsedLogs?: ParsedLogEntry[];
    incidentType?: String;
    rootCause?: String;
    confidenceScore?: String;
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