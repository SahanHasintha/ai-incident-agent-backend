interface ParsedLogEntry {
  timestamp: string;        
  level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  service: string;
  message: string;
  code?: string;
  context?: Record<string, any>;
}

export interface IncidentState {
    rawLogs: String;
    systemInfo?: String;
    parsedLogs?: ParsedLogEntry[];
    incidentType?: String;
    severity: 'low' | 'medium' | 'high';
    rootCause?: String;
    confidenceScore?: String;
    recommendedFixes: String[];
    incidentReport?: {
        summary: string;
        actionItems: string[];
        status?: "pending" | "reviewed" | "resolved";
        timestamp: string;
    }
}