import { GraphNode } from "@langchain/langgraph";
import { IncidentState, ParsedLogEntry } from "../graph/state";
import { IncidentStateAnnotation } from "../graph/incident.graph";

export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | "UNKNOWN";

function normalizeLevel(level: string): LogLevel {
  const allowedLevels = ["INFO", "WARN", "ERROR", "DEBUG"];

  if (allowedLevels.includes(level)) {
    return level as LogLevel;
  }

  return "UNKNOWN";
}

const parseLogs = (rawLogs: string): ParsedLogEntry[] => {
  const lines = rawLogs.split("\n").filter(Boolean);

  const logPattern = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+(\w+)\s+(\w+):\s+(.*)$/;

  return lines.map((line) => {
    const trimmedLine = line.trim(); 
      const match = trimmedLine.match(logPattern);
      if (!match) {
          return {
              timestamp: "",
              level: "UNKNOWN",
              service: "UNKNOWN",
              message: line
          };
      }

      const [, timestamp, level, service, message] = match;
      const normalizeLevelVal: LogLevel = normalizeLevel(level)

      return {
          timestamp,
          level: normalizeLevelVal,
          service,
          message
      };
  });
}

export const parseLogsNode: GraphNode<typeof IncidentStateAnnotation> = (state: IncidentState) => {
    const parsedLogs = parseLogs(state.rawLogs);

  return {
    ...state,
    parsedLogs,
  };
}